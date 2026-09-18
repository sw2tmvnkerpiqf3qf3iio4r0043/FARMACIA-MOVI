import React, { useEffect, useState } from 'react';
import { 
  View, 
  Text, 
  FlatList, 
  StyleSheet, 
  TouchableOpacity,
  RefreshControl,
  ActivityIndicator,
  StatusBar,
  Image,
  Alert,
  Modal,
  TextInput,
  ScrollView
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';

const API_URL = 'http://192.168.0.106:3000/api/medicamento';

const MEDICINE_IMAGES = {
  'paracetamol': require('../../assets/images/paracetamol.jpg'),
  'ibuprofeno': require('../../assets/images/ibuprofeno.png'),
  'amoxicilina': require('../../assets/images/amoxicilina.jpg'),
  'omeprazol': require('../../assets/images/omeprazol.jpg')
};

export default function ProductosScreen() {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [carrito, setCarrito] = useState([]);
  
  // Modal receta
  const [modalReceta, setModalReceta] = useState(false);
  const [productoReceta, setProductoReceta] = useState(null);
  const [fotoReceta, setFotoReceta] = useState(null);
  const [notasReceta, setNotasReceta] = useState('');
  const [solicitudesReceta, setSolicitudesReceta] = useState([]);

  const fetchProductos = async () => {
    try {
      const response = await axios.get(API_URL);
      setProductos(response.data);
    } catch (error) {
      console.error('❌ Error:', error.message);
      Alert.alert('Error', 'No se pudo conectar con el servidor');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchProductos();
    requestCameraPermission();
  }, []);

  const requestCameraPermission = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permiso requerido', 'Necesitamos acceso a la cámara para verificar recetas médicas');
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    fetchProductos();
  };

  const getImagenUrl = (nombreComercial, imagenURL) => {
    if (imagenURL && typeof imagenURL === 'string' && imagenURL.trim() !== '' && !imagenURL.includes('flaticon')) {
      return { uri: imagenURL };
    }
    const nombre = (nombreComercial || '').toLowerCase();
    if (nombre.includes('paracetamol')) return MEDICINE_IMAGES.paracetamol;
    if (nombre.includes('ibuprofeno')) return MEDICINE_IMAGES.ibuprofeno;
    if (nombre.includes('amoxicilina')) return MEDICINE_IMAGES.amoxicilina;
    if (nombre.includes('omeprazol')) return MEDICINE_IMAGES.omeprazol;
    
    // Fallback seguro a una imagen que SÍ existe
    return MEDICINE_IMAGES.paracetamol; 
  };

  const getStockInfo = (stock) => {
    if (stock <= 0) return { color: '#6B7280', bgColor: '#F3F4F6', label: 'Agotado', emoji: '🚫', disabled: true };
    if (stock <= 5) return { color: '#DC2626', bgColor: '#FEE2E2', label: 'Crítico', emoji: '🔴', disabled: false };
    if (stock <= 15) return { color: '#D97706', bgColor: '#FEF3C7', label: 'Bajo', emoji: '🟠', disabled: false };
    return { color: '#059669', bgColor: '#D1FAE5', label: 'Disponible', emoji: '🟢', disabled: false };
  };

  const tomarFotoReceta = async () => {
    try {
      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.8,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        setFotoReceta(result.assets[0].uri);
      }
    } catch (error) {
      console.error('Error al tomar foto:', error);
      Alert.alert('Error', 'No se pudo acceder a la cámara');
    }
  };

  const agregarAlCarrito = (productoFromList) => {
    const idProducto = productoFromList.idMedicamento || productoFromList.id_medicamento;
    const productoActual = productos.find(p => (p.idMedicamento || p.id_medicamento) === idProducto) || productoFromList;

    const stockActual = productoActual.stock || 0;
    const stockInfo = getStockInfo(stockActual);
    
    if (stockInfo.disabled) {
      Alert.alert('🚫 Agotado', 'Este producto ya no está disponible');
      return;
    }

    const requiereReceta = productoActual.requiereReceta === 1 || productoActual.requiere_receta === 1;
    if (requiereReceta) {
      setProductoReceta(productoActual);
      setFotoReceta(null);
      setNotasReceta('');
      setModalReceta(true);
      return;
    }

    procesarAgregado(productoActual);
  };

  const procesarAgregado = (productoActual) => {
    const idProducto = productoActual.idMedicamento || productoActual.id_medicamento;
    const stockActual = productoActual.stock || 0;
    
    if (stockActual <= 0) {
      Alert.alert('🚫 Agotado', 'No hay más unidades disponibles');
      return;
    }

    setCarrito(prevCarrito => {
      const existe = prevCarrito.find(item => 
        (item.idMedicamento || item.id_medicamento) === idProducto
      );

      if (existe) {
        if (existe.cantidad >= stockActual) {
          setTimeout(() => {
            Alert.alert('⚠️ Stock Limitado', `Solo hay ${stockActual} unidades disponibles`);
          }, 100);
          return prevCarrito;
        }
        return prevCarrito.map(item => {
          const idItem = item.idMedicamento || item.id_medicamento;
          if (idItem === idProducto) {
            return { ...item, cantidad: item.cantidad + 1 };
          }
          return item;
        });
      } else {
        return [...prevCarrito, { ...productoActual, cantidad: 1, id: idProducto }];
      }
    });
    
    setProductos(prevProductos => {
      return prevProductos.map(p => {
        const idP = p.idMedicamento || p.id_medicamento;
        if (idP === idProducto) {
          const nuevoStock = Math.max(0, p.stock - 1); 
          return { ...p, stock: nuevoStock }; 
        }
        return { ...p }; 
      });
    });
    
    const nombre = productoActual.nombreComercial || productoActual.nombre_comercial;
    const stockRestante = stockActual - 1;
    
    setTimeout(() => {
      if (stockRestante <= 0) {
        Alert.alert('✅ Agregado', `${nombre}\n\n⚠️ ¡Última unidad!\nProducto AGOTADO`);
      } else {
        Alert.alert('✅ Agregado', `${nombre}\n\nStock restante: ${stockRestante} unidad(es)`);
      }
    }, 150);
  };

  const enviarSolicitudReceta = () => {
    if (!fotoReceta) {
      Alert.alert('📸 Foto requerida', 'Debes tomar una foto de tu receta médica');
      return;
    }

    const nuevaSolicitud = {
      id: Date.now(),
      producto: productoReceta,
      fotoReceta: fotoReceta,
      notas: notasReceta.trim(),
      fecha: new Date().toISOString(),
      estado: 'Pendiente de aprobación'
    };

    setSolicitudesReceta(prev => [...prev, nuevaSolicitud]);
    setModalReceta(false);
    
    const nombre = productoReceta.nombreComercial || productoReceta.nombre_comercial;
    Alert.alert(
      '📝 Solicitud Enviada',
      `${nombre}\n\n✅ Foto de receta adjunta\n⏳ Un farmacéutico la revisará\n📱 Te notificaremos cuando esté aprobada`,
      [{ text: 'Entendido' }]
    );
  };

  const renderItem = ({ item }) => {
    const nombreComercial = item.nombreComercial || item.nombre_comercial || 'Sin nombre';
    const nombreGenerico = item.nombreGenerico || item.nombre_generico || '';
    const presentacion = item.presentacion || 'N/A';
    const tipoProducto = item.tipoProducto || item.tipo_producto || 'General';
    const precioVenta = parseFloat(item.precioVenta || item.precio_venta || 0);
    const stock = parseInt(item.stock || 0);
    const stockInfo = getStockInfo(stock);
    const requiereReceta = item.requiereReceta === 1 || item.requiere_receta === 1;
    const imagenUrl = getImagenUrl(nombreComercial, item.imagen);

    return (
      <View style={styles.card}>
        <View style={styles.imageSection}>
          <Image source={imagenUrl} style={styles.productImage} resizeMode="cover" />
          <View style={styles.imageOverlay} pointerEvents="none">
            <Text style={styles.imageFallback}>💊</Text>
          </View>
          {requiereReceta && (
            <View style={styles.badgeReceta}>
              <Text style={styles.badgeText}>📝</Text>
            </View>
          )}
        </View>

        <View style={styles.infoSection}>
          <Text style={styles.nombre} numberOfLines={2}>{nombreComercial}</Text>
          {nombreGenerico ? <Text style={styles.generico}>{nombreGenerico}</Text> : null}
          
          <View style={styles.tagsContainer}>
            <View style={styles.tag}><Text style={styles.tagText}>📦 {presentacion}</Text></View>
            <View style={styles.tag}><Text style={styles.tagText}>🏷️ {tipoProducto}</Text></View>
          </View>

          <View style={styles.priceRow}>
            <View>
              <Text style={styles.priceLabel}>Precio</Text>
              <Text style={styles.precio}>S/ {precioVenta.toFixed(2)}</Text>
            </View>
            <View style={[styles.stockBadge, { backgroundColor: stockInfo.bgColor }]}>
              <Text style={[styles.stockText, { color: stockInfo.color }]}>
                {stockInfo.emoji} {stockInfo.label}
              </Text>
              <Text style={[styles.stockCount, { color: stockInfo.color }]}>
                {stock > 0 ? `${stock} unid.` : ''}
              </Text>
            </View>
          </View>
        </View>

        <TouchableOpacity 
          style={[
            styles.btnAgregar, 
            stockInfo.disabled && styles.btnDisabled,
            requiereReceta && !stockInfo.disabled && styles.btnReceta
          ]}
          onPress={() => agregarAlCarrito(item)}
          disabled={stockInfo.disabled}
          activeOpacity={0.85}
        >
          <Text style={styles.btnText}>
            {stockInfo.disabled ? '🚫 Agotado' : requiereReceta ? '📸 Requiere Receta' : '🛒 Agregar al Carrito'}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <StatusBar barStyle="light-content" backgroundColor="#059669" />
        <ActivityIndicator size="large" color="#FFFFFF" />
        <Text style={styles.loadingText}>Cargando productos...</Text>
      </View>
    );
  }

  const totalCarrito = carrito.reduce((sum, item) => sum + item.cantidad, 0);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#059669" />
      
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>💊 Productos</Text>
          <Text style={styles.headerSubtitle}>{productos.length} productos disponibles</Text>
        </View>
        
        {totalCarrito > 0 && (
          <View style={styles.carritoContainer}>
            <View style={styles.carritoBadge}>
              <Text style={styles.carritoIcon}>🛒</Text>
              <View style={styles.badgeNumero}>
                <Text style={styles.badgeNumeroText}>{totalCarrito}</Text>
              </View>
            </View>
            <Text style={styles.carritoLabel}>Carrito</Text>
          </View>
        )}
        
        {solicitudesReceta.length > 0 && (
          <TouchableOpacity 
            style={styles.recetasButton}
            onPress={() => Alert.alert('📝 Recetas Pendientes', `${solicitudesReceta.length} solicitud(es) en revisión`)}
          >
            <Text style={styles.recetasIcon}>📋</Text>
            <View style={styles.recetasBadge}>
              <Text style={styles.recetasNumero}>{solicitudesReceta.length}</Text>
            </View>
          </TouchableOpacity>
        )}
      </View>

      {/* FLATLIST CON extraData Y SPREAD PARA FORZAR RE-RENDERIZADO */}
      <FlatList
        data={[...productos]} 
        extraData={{ productos, carrito }}
        renderItem={renderItem}
        keyExtractor={(item) => (item.idMedicamento || item.id_medicamento)?.toString() || Math.random().toString()}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={['#059669']} />}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
      />

      {/* MODAL RECETA CON CÁMARA */}
      <Modal visible={modalReceta} transparent={true} animationType="slide" onRequestClose={() => setModalReceta(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <ScrollView showsVerticalScrollIndicator={false}>
              <Text style={styles.modalIcon}>📝</Text>
              <Text style={styles.modalTitle}>Receta Médica Requerida</Text>
              <Text style={styles.modalText}>
                <Text style={styles.modalBold}>{productoReceta?.nombreComercial || productoReceta?.nombre_comercial}</Text> requiere receta médica válida.
              </Text>
              <Text style={styles.modalInfo}>🔒 Toma una foto clara de tu receta. Un farmacéutico la validará antes de procesar.</Text>
              
              <TouchableOpacity style={styles.btnCamera} onPress={tomarFotoReceta}>
                <Text style={styles.btnCameraIcon}>📸</Text>
                <Text style={styles.btnCameraText}>Tomar foto de receta</Text>
              </TouchableOpacity>

              {fotoReceta && (
                <View style={styles.previewContainer}>
                  <Image source={{ uri: fotoReceta }} style={styles.previewImage} resizeMode="cover" />
                  <TouchableOpacity style={styles.btnRemovePhoto} onPress={() => setFotoReceta(null)}>
                    <Text style={styles.btnRemovePhotoText}>✕</Text>
                  </TouchableOpacity>
                </View>
              )}

              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Notas adicionales (opcional)</Text>
                <TextInput
                  style={[styles.input, styles.inputMultiline]}
                  placeholder="Información sobre alergias, dosis, etc."
                  value={notasReceta}
                  onChangeText={setNotasReceta}
                  multiline
                  numberOfLines={3}
                  textAlignVertical="top"
                  placeholderTextColor="#9CA3AF"
                />
              </View>

              <View style={styles.modalButtons}>
                <TouchableOpacity style={styles.btnCancelar} onPress={() => setModalReceta(false)}>
                  <Text style={styles.btnCancelarText}>Cancelar</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={[styles.btnConfirmar, !fotoReceta && styles.btnConfirmarDisabled]}
                  onPress={enviarSolicitudReceta}
                  disabled={!fotoReceta}
                >
                  <Text style={styles.btnConfirmarText}>Enviar Solicitud</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#F3F4F6' 
  },
  center: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
    backgroundColor: '#059669' 
  },
  loadingText: { 
    marginTop: 16, 
    color: '#FFFFFF', 
    fontSize: 16, fontWeight: '500' },
  list: { padding: 12 },
  
  header: { 
    backgroundColor: '#059669', 
    padding: 20, 
    paddingTop: 50, 
    paddingBottom: 25, 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    borderBottomLeftRadius: 24, 
    borderBottomRightRadius: 24, 
    elevation: 8 
  },
  headerContent: { flex: 1 },
  headerTitle: { 
    fontSize: 28, 
    fontWeight: 'bold', 
    color: '#FFFFFF' 
  },
  headerSubtitle: { 
    fontSize: 14, 
    color: 'rgba(255,255,255,0.9)', 
    marginTop: 4 
  },
  
  carritoContainer: { 
    alignItems: 'center', 
    marginRight: 12 
  },
  carritoBadge: { 
    position: 'relative', 
    backgroundColor: 'rgba(255,255,255,0.2)', 
    padding: 10, 
    borderRadius: 12, 
    marginBottom: 4 
  },
  carritoIcon: { fontSize: 28 },
  badgeNumero: { 
    position: 'absolute', 
    top: -8, 
    right: -8, 
    backgroundColor: '#EF4444',
    borderRadius: 12, 
    minWidth: 24, 
    height: 24, 
    justifyContent: 'center', 
    alignItems: 'center', 
    borderWidth: 2, 
    borderColor: '#FFFFFF', 
    paddingHorizontal: 6 
  },
  badgeNumeroText: { 
    color: '#FFFFFF', 
    fontSize: 12, 
    fontWeight: 'bold' 
  },
  carritoLabel: { 
    color: '#FFFFFF', 
    fontSize: 12, 
    fontWeight: '600' 
  },
  
  recetasButton: { 
    position: 'relative', 
    padding: 8 
  },
  recetasIcon: { 
    fontSize: 24 
  },
  recetasBadge: { 
    position: 'absolute', 
    top: -5, right: -5, 
    backgroundColor: '#F59E0B', 
    borderRadius: 10, 
    minWidth: 20, 
    height: 20, 
    justifyContent: 'center', 
    alignItems: 'center', 
    borderWidth: 2, 
    borderColor: '#FFFFFF' 
  },
  recetasNumero: { 
    color: '#FFFFFF', 
    fontSize: 11, 
    fontWeight: 'bold', 
    paddingHorizontal: 4 
  },
  
  card: { 
    backgroundColor: '#FFFFFF', 
    borderRadius: 20, 
    marginBottom: 16, 
    overflow: 'hidden', 
    elevation: 6, 
    borderWidth: 1, 
    borderColor: '#E5E7EB' 
  },
  imageSection: { 
    height: 160, 
    backgroundColor: '#F9FAFB', 
    position: 'relative' 
  },
  productImage: { 
    width: '100%', 
    height: '100%' 
  },
  imageOverlay: { 
    position: 'absolute', 
    top: 0, 
    left: 0, 
    right: 0, 
    bottom: 0, 
    justifyContent: 'center', 
    alignItems: 'center', 
    backgroundColor: 'transparent' 
  },
  imageFallback: { 
    fontSize: 80, 
    opacity: 0.3 
  },
  badgeReceta: { 
    position: 'absolute', 
    top: 12, 
    right: 12, 
    backgroundColor: '#F59E0B', 
    width: 36, height: 36, 
    borderRadius: 18, 
    justifyContent: 'center', 
    alignItems: 'center', 
    borderWidth: 3, 
    borderColor: '#FFFFFF', 
    elevation: 5 
  },
  badgeText: { 
    fontSize: 18 
  },
  
  infoSection: { 
    padding: 16 
  },
  nombre: { 
    fontSize: 18, 
    fontWeight: 'bold', 
    color: '#111827', 
    marginBottom: 4 
  },
  generico: { 
    fontSize: 13, 
    color: '#6B7280', 
    fontStyle: 'italic', 
    marginBottom: 12 
  },
  tagsContainer: { 
    flexDirection: 'row', 
    gap: 8, 
    marginBottom: 16, 
    flexWrap: 'wrap' 
  },
  tag: { 
    backgroundColor: '#F3F4F6', 
    paddingHorizontal: 12, 
    paddingVertical: 6, 
    borderRadius: 8 },
  tagText: { 
    fontSize: 12, 
    color: '#4B5563', 
    fontWeight: '600' 
  },
  priceRow: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center' 
  },
  priceLabel: { 
    fontSize: 12, 
    color: '#6B7280', 
    fontWeight: '600', 
    marginBottom: 4 
  },
  precio: { 
    fontSize: 26, 
    fontWeight: 'bold', 
    color: '#059669' 
  },
  stockBadge: { 
    paddingHorizontal: 12, 
    paddingVertical: 8, 
    borderRadius: 10, 
    alignItems: 'center', 
    minWidth: 100 
  },
  stockText: { 
    fontSize: 12, 
    fontWeight: '700' 
  },
  stockCount: { 
    fontSize: 11, 
    fontWeight: '600',
     marginTop: 2 
    },
  
  btnAgregar: { 
    backgroundColor: '#059669', 
    paddingVertical: 16, 
    alignItems: 'center', borderTopWidth: 1, 
    borderTopColor: '#F3F4F6' 
  },
  btnReceta: { 
    backgroundColor: '#D97706' 
  },
  btnDisabled: { 
    backgroundColor: '#9CA3AF' 
  },
  btnText: { 
    color: '#FFFFFF', 
    fontSize: 16, 
    fontWeight: 'bold' 
  },
  
  modalOverlay: { 
    flex: 1, 
    backgroundColor: 'rgba(0,0,0,0.5)', 
    justifyContent: 'center', 
    alignItems: 'center', 
    padding: 20 
  },
  modalContent: { 
    backgroundColor: '#FFFFFF', 
    borderRadius: 20, 
    padding: 24, 
    width: '100%',
     maxWidth: 400, 
     elevation: 10, 
     maxHeight: '90%' 
    },
  modalIcon: { 
    fontSize: 60,
     textAlign: 'center', 
     marginBottom: 16 
    },
  modalTitle: {
     fontSize: 22, 
     fontWeight: 'bold', 
     color: '#111827', 
     textAlign: 'center',
     marginBottom: 12 
    },
  modalText: { 
    fontSize: 15, 
    color: '#4B5563', 
    textAlign: 'center', 
    lineHeight: 22, 
    marginBottom: 12 
  },
  modalInfo: { 
    fontSize: 13,
    color: '#059669',
    textAlign: 'center', 
    backgroundColor: '#D1FAE5', 
    padding: 12, 
    borderRadius: 8, 
    marginBottom: 20, 
    fontWeight: '500' 
  },
  modalBold: { 
    fontWeight: 'bold', 
    color: '#111827' 
  },
  
  btnCamera: { 
    backgroundColor: '#059669', 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'center', 
    paddingVertical: 16, 
    borderRadius: 12, 
    marginBottom: 16, 
    borderWidth: 2, 
    borderColor: '#059669', 
    borderStyle: 'dashed' 
  },
  btnCameraIcon: { 
    fontSize: 24, 
    marginRight: 10
  },
  btnCameraText: { 
    color: '#FFFFFF', 
    fontSize: 16, 
    fontWeight: 'bold' 
  },
  
  previewContainer: { 
    position: 'relative', 
    marginBottom: 16, 
    borderRadius: 12, 
    overflow: 'hidden', 
    borderWidth: 2, 
    borderColor: '#059669' 
  },
  previewImage: { 
    width: '100%', 
    height: 200 
  },
  btnRemovePhoto: { 
    position: 'absolute', 
    top: 8, right: 8, 
    backgroundColor: '#EF4444', 
    width: 32, height: 32, 
    borderRadius: 16, 
    justifyContent: 'center', 
    alignItems: 'center', 
    elevation: 5 
  },
  btnRemovePhotoText: { 
    color: '#FFFFFF', 
    fontSize: 18, 
    fontWeight: 'bold' 
  },
  
  inputContainer: { 
    marginBottom: 16 
  },
  inputLabel: { 
    fontSize: 14, 
    fontWeight: '600', 
    color: '#374151', 
    marginBottom: 8 
  },
  input: { 
    backgroundColor: '#F9FAFB', 
    borderWidth: 1, 
    borderColor: '#D1D5DB', 
    borderRadius: 12, 
    paddingHorizontal: 14, 
    paddingVertical: 12, 
    fontSize: 15, 
    color: '#111827' 
  },
  inputMultiline: { 
    minHeight: 80, 
    paddingTop: 12 
  },
  
  modalButtons: { 
    flexDirection: 'row', 
    gap: 12, 
    marginTop: 8, 
    marginBottom: 8 
  },
  btnCancelar: { 
    flex: 1, 
    paddingVertical: 14, 
    backgroundColor: '#F3F4F6', 
    borderRadius: 12, 
    alignItems: 'center' },
  btnCancelarText: { 
    color: '#4B5563', 
    fontSize: 15, 
    fontWeight: '600' 
  },
  btnConfirmar: { 
    flex: 1, 
    paddingVertical: 14, 
    backgroundColor: '#059669', 
    borderRadius: 12, 
    alignItems: 'center' },
  btnConfirmarDisabled: { 
    backgroundColor: '#9CA3AF' 
  },
  btnConfirmarText: { 
    color: '#FFFFFF', 
    fontSize: 15, 
    fontWeight: 'bold' 
  },
});