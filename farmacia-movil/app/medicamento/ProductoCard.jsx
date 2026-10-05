import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, Modal, ScrollView, Alert, ActivityIndicator } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { styles } from './styles';

export default function ProductoCard({ item, onAgregar }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [recetaVisible, setRecetaVisible] = useState(false);
  const [fotoReceta, setFotoReceta] = useState(null);
  const [cargandoImagen, setCargandoImagen] = useState(false);

  const nombre = item.nombreComercial || item.nombre_comercial || 'Sin nombre';
  const generico = item.nombreGenerico || item.nombre_generico || '';
  const marca = item.marca || item.Marca || '';
  const presentacion = item.presentacion || item.Presentacion || 'N/A';
  const precio = parseFloat(item.precioVenta || item.precio_venta || 0);
  const stock = parseInt(item.stock || 0);
  const requiereReceta = item.requiereReceta === 1 || item.requiereReceta === true || item.requiere_receta === 1;
  const descripcion = item.descripcion || item.Descripcion || '';

  const tieneOferta = item.enOferta === true || (item.descuento && item.descuento > 0);
  const descuento = item.descuento || 0;
  const precioConDescuento = precio * (1 - descuento / 100);

  let stockColor = '#059669';
  let stockBg = '#D1FAE5';
  let stockLabel = 'Disponible';
  let disabled = false;

  if (stock <= 0) {
    stockColor = '#6B7280';
    stockBg = '#F3F4F6';
    stockLabel = 'Agotado';
    disabled = true;
  } else if (stock <= 5) {
    stockColor = '#DC2626';
    stockBg = '#FEE2E2';
    stockLabel = 'Últimas unidades';
  } else if (stock <= 15) {
    stockColor = '#D97706';
    stockBg = '#FEF3C7';
    stockLabel = 'Stock bajo';
  }

  const getImagenUrl = (imagen) => {
    if (!imagen || typeof imagen !== 'string' || imagen.trim() === '') return null;
    if (imagen.includes('flaticon')) return null;
    let url = imagen;
    if (url.includes('localhost:3000')) url = url.replace('localhost:3000', '192.168.0.106:3000');
    if (url.includes('localhost:5173')) url = url.replace('localhost:5173', '192.168.0.106:3000');
    return { uri: url };
  };

  const imagenSource = getImagenUrl(item.imagen);

  const parsearDescripcion = (texto) => {
    if (!texto) return null;
    const secciones = [];
    const lineas = texto.split('\n');
    let seccionActual = { titulo: 'Descripción', contenido: '' };
    
    const titulosPosibles = [
      'Descripción:', 'Descripcion:', 'USO:', 'Uso:', 'Uso recomendado:',
      'BENEFICIOS:', 'Beneficios:', 'MODO DE USO:', 'Modo de uso:',
      'COMPOSICIÓN:', 'Composición:', 'INDICACIONES:', 'Indicaciones:',
      'CONTRAINDICACIONES:', 'Contraindicaciones:', 'PRECAUCIONES:',
      'Precauciones:', 'COMENTARIOS:', 'Comentarios adicionales:'
    ];

    lineas.forEach(linea => {
      const lineaTrim = linea.trim();
      const esTitulo = titulosPosibles.some(t => lineaTrim.toLowerCase().startsWith(t.toLowerCase()));
      if (esTitulo && seccionActual.contenido.trim() !== '') {
        secciones.push({ ...seccionActual });
        seccionActual = { titulo: lineaTrim, contenido: '' };
      } else {
        seccionActual.contenido += (seccionActual.contenido ? '\n' : '') + linea;
      }
    });

    if (seccionActual.contenido.trim() !== '') secciones.push(seccionActual);
    return secciones.length > 0 ? secciones : [{ titulo: 'Descripción', contenido: texto }];
  };

  const seccionesDescripcion = parsearDescripcion(descripcion);
  const descripcionLarga = seccionesDescripcion && seccionesDescripcion.length > 1;

  const solicitarPermisos = async () => {
    const { status: camaraStatus } = await ImagePicker.requestCameraPermissionsAsync();
    const { status: galeriaStatus } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (camaraStatus !== 'granted' || galeriaStatus !== 'granted') {
      Alert.alert('Permisos necesarios', 'Necesitamos acceso a la cámara y galería para subir la receta médica');
      return false;
    }
    return true;
  };

  const tomarFotoReceta = async () => {
    const permisos = await solicitarPermisos();
    if (!permisos) return;

    setCargandoImagen(true);
    try {
      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [3, 4],
        quality: 1,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        setFotoReceta(result.assets[0].uri);
      }
    } catch (error) {
      Alert.alert('Error', 'No se pudo acceder a la cámara');
    } finally {
      setCargandoImagen(false);
    }
  };

  const seleccionarRecetaGaleria = async () => {
    const permisos = await solicitarPermisos();
    if (!permisos) return;

    setCargandoImagen(true);
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [3, 4],
        quality: 1,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        setFotoReceta(result.assets[0].uri);
      }
    } catch (error) {
      Alert.alert('Error', 'No se pudo seleccionar la imagen');
    } finally {
      setCargandoImagen(false);
    }
  };

  const confirmarConReceta = () => {
    if (!fotoReceta) {
      Alert.alert('Receta requerida', 'Debes subir una foto de tu receta médica');
      return;
    }
    Alert.alert(
      'Receta enviada',
      `Un farmacéutico revisará tu receta para:\n\n${nombre}\n\nTe notificaremos cuando esté aprobada.`,
      [{ 
        text: 'Entendido', 
        onPress: () => { 
          setRecetaVisible(false); 
          setModalVisible(false);
          setFotoReceta(null);
        } 
      }]
    );
  };

  const handleAgregar = () => {
    if (requiereReceta) {
      setFotoReceta(null);
      setRecetaVisible(true);
    } else {
      onAgregar(item);
      setModalVisible(false);
    }
  };

  return (
    <View style={styles.card}>
      <View style={styles.imageSection}>
        {imagenSource ? (
          <Image source={imagenSource} style={styles.productImage} resizeMode="cover" />
        ) : (
          <View style={styles.imageFallbackContainer}>
            <Text style={styles.imageFallback}>💊</Text>
          </View>
        )}

        {tieneOferta && (
          <View style={styles.badgeOferta}>
            <Text style={styles.badgeOfertaText}>-{descuento}%</Text>
          </View>
        )}

        {requiereReceta && (
          <View style={styles.badgeReceta}>
            <Text style={{ fontSize: 14 }}>📝</Text>
          </View>
        )}
      </View>

      <View style={styles.infoSection}>
        <Text style={styles.nombre} numberOfLines={2}>{nombre}</Text>
        {generico ? <Text style={styles.generico}>{generico}</Text> : null}

        <View style={styles.priceRow}>
          {tieneOferta ? (
            <>
              <Text style={styles.precioOriginal}>Bs. {precio.toFixed(2)}</Text>
              <Text style={styles.precio}>Bs. {precioConDescuento.toFixed(2)}</Text>
            </>
          ) : (
            <Text style={styles.precio}>Bs. {precio.toFixed(2)}</Text>
          )}

          <View style={[styles.stockBadge, { backgroundColor: stockBg }]}>
            <Text style={[styles.stockText, { color: stockColor }]}>
              {stockLabel}
            </Text>
          </View>
        </View>

        <View style={{ flexDirection: 'row', gap: 8, marginTop: 12 }}>
          <TouchableOpacity
            style={[styles.btnAgregar, { flex: 1 }]}
            onPress={handleAgregar}
            disabled={disabled}
          >
            <Text style={styles.btnText}>
              {disabled ? 'Agotado' : requiereReceta ? 'Con receta' : 'Agregar'}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ backgroundColor: '#3B82F6', paddingHorizontal: 16, paddingVertical: 14, borderRadius: 12 }}
            onPress={() => setModalVisible(true)}
          >
            <Text style={{ color: '#FFFFFF', fontSize: 14, fontWeight: 'bold' }}>Ver más</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* MODAL DE DETALLES */}
      <Modal visible={modalVisible} animationType="slide" transparent={true} onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <ScrollView showsVerticalScrollIndicator={false}>
              <TouchableOpacity style={styles.modalCloseBtn} onPress={() => setModalVisible(false)}>
                <Text style={{ fontSize: 20, color: '#6B7280' }}>✕</Text>
              </TouchableOpacity>

              <View style={styles.modalImageContainer}>
                {imagenSource ? (
                  <Image source={imagenSource} style={styles.modalImage} resizeMode="cover" />
                ) : (
                  <View style={styles.modalImageFallback}>
                    <Text style={{ fontSize: 80 }}>💊</Text>
                  </View>
                )}
              </View>

              <Text style={styles.modalTitle}>{nombre}</Text>
              {generico ? <Text style={styles.modalGenerico}>{generico}</Text> : null}
              {marca ? <Text style={styles.modalMarca}>Marca: {marca}</Text> : null}

              <View style={styles.modalInfoRow}>
                <View style={styles.modalInfoBox}>
                  <Text style={styles.modalInfoLabel}>Presentación</Text>
                  <Text style={styles.modalInfoValue}>{presentacion}</Text>
                </View>
                <View style={styles.modalInfoBox}>
                  <Text style={styles.modalInfoLabel}>Stock</Text>
                  <Text style={[styles.modalInfoValue, { color: stockColor }]}>{stock} unid.</Text>
                </View>
              </View>

              {requiereReceta && (
                <View style={styles.modalRecetaAlert}>
                  <Text style={styles.modalRecetaIcon}>📝</Text>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.modalRecetaTitle}>Requiere receta médica</Text>
                    <Text style={styles.modalRecetaText}>Necesitarás subir una foto de tu receta para completar la compra</Text>
                  </View>
                </View>
              )}

              <View style={styles.modalDescripcionContainer}>
                <Text style={styles.modalDescripcionTitle}>Información del producto</Text>
                {descripcionLarga ? (
                  seccionesDescripcion.map((seccion, index) => (
                    <View key={index} style={styles.seccionContainer}>
                      <Text style={styles.seccionTitulo}>{seccion.titulo}</Text>
                      <Text style={styles.seccionTexto}>{seccion.contenido}</Text>
                    </View>
                  ))
                ) : (
                  <Text style={styles.modalDescripcionText}>{descripcion || 'Sin descripción disponible'}</Text>
                )}
              </View>

              <View style={styles.modalPrecioContainer}>
                <Text style={styles.modalPrecioLabel}>Precio</Text>
                {tieneOferta ? (
                  <View style={{ marginTop: 8 }}>
                    <Text style={styles.modalPrecioOriginal}>Bs. {precio.toFixed(2)}</Text>
                    <Text style={styles.modalPrecioFinal}>Bs. {precioConDescuento.toFixed(2)}</Text>
                    <Text style={styles.modalDescuentoBadge}>-{descuento}% de descuento</Text>
                  </View>
                ) : (
                  <Text style={styles.modalPrecioFinal}>Bs. {precio.toFixed(2)}</Text>
                )}
              </View>

              <TouchableOpacity
                style={[styles.modalBtnAgregar, disabled && styles.modalBtnDisabled]}
                onPress={handleAgregar}
                disabled={disabled}
              >
                <Text style={styles.modalBtnText}>
                  {disabled ? 'Producto Agotado' : requiereReceta ? '📝 Subir receta y agregar' : 'Agregar al carrito'}
                </Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </View>
      </Modal>

      {/* MODAL DE RECETA */}
      <Modal visible={recetaVisible} animationType="slide" transparent={true} onRequestClose={() => setRecetaVisible(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.recetaModalContent}>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 20 }}>
              <TouchableOpacity
                style={styles.modalCloseBtn}
                onPress={() => { setRecetaVisible(false); setFotoReceta(null); }}
              >
                <Text style={{ fontSize: 20, color: '#6B7280' }}>✕</Text>
              </TouchableOpacity>

              <View style={styles.recetaHeaderContainer}>
                <View style={styles.recetaBadgeTop}>
                  <Text style={styles.recetaBadgeText}>REQUIERE RECETA</Text>
                </View>
                
                <View style={styles.recetaIconWrapper}>
                  <View style={styles.recetaIconBg}>
                    <Text style={{ fontSize: 50 }}>📋</Text>
                  </View>
                  <View style={styles.recetaIconDecor1} />
                  <View style={styles.recetaIconDecor2} />
                </View>

                <Text style={styles.recetaTitle}>Receta Médica</Text>
                <Text style={styles.recetaSubtitle}>Este medicamento requiere validación profesional</Text>
              </View>

              <View style={styles.recetaProductCard}>
                <View style={styles.recetaProductInfo}>
                  <Text style={styles.recetaProductLabel}>Producto:</Text>
                  <Text style={styles.recetaProductName}>{nombre}</Text>
                  {generico ? <Text style={styles.recetaProductGeneric}>{generico}</Text> : null}
                </View>
                <View style={styles.recetaProductPrice}>
                  <Text style={styles.recetaPriceLabel}>Precio:</Text>
                  <Text style={styles.recetaPriceValue}>Bs. {precio.toFixed(2)}</Text>
                </View>
              </View>

              <View style={styles.recetaStepsContainer}>
                <Text style={styles.recetaStepsTitle}>Proceso de validación</Text>
                
                <View style={styles.recetaStep}>
                  <View style={styles.recetaStepIcon}>
                    <Text style={styles.recetaStepIconText}>📸</Text>
                  </View>
                  <View style={styles.recetaStepContent}>
                    <Text style={styles.recetaStepTitle}>Sube tu receta</Text>
                    <Text style={styles.recetaStepDesc}>Toma una foto clara o selecciona de tu galería</Text>
                  </View>
                </View>

                <View style={styles.recetaStepConnector} />

                <View style={styles.recetaStep}>
                  <View style={styles.recetaStepIcon}>
                    <Text style={styles.recetaStepIconText}>👨‍️</Text>
                  </View>
                  <View style={styles.recetaStepContent}>
                    <Text style={styles.recetaStepTitle}>Validación profesional</Text>
                    <Text style={styles.recetaStepDesc}>Un farmacéutico revisará tu receta</Text>
                  </View>
                </View>

                <View style={styles.recetaStepConnector} />

                <View style={styles.recetaStep}>
                  <View style={styles.recetaStepIcon}>
                    <Text style={styles.recetaStepIconText}>✅</Text>
                  </View>
                  <View style={styles.recetaStepContent}>
                    <Text style={styles.recetaStepTitle}>Aprobación</Text>
                    <Text style={styles.recetaStepDesc}>Te notificaremos cuando esté lista</Text>
                  </View>
                </View>
              </View>

              {!fotoReceta ? (
                <View>
                  <Text style={styles.recetaUploadTitle}>Selecciona cómo subir tu receta:</Text>
                  
                  <TouchableOpacity 
                    style={styles.recetaBtnCamara} 
                    onPress={tomarFotoReceta}
                    disabled={cargandoImagen}
                  >
                    <View style={styles.recetaBtnLeft}>
                      <View style={styles.recetaBtnIconCircle}>
                        <Text style={{ fontSize: 28 }}>📷</Text>
                      </View>
                      <View style={styles.recetaBtnTextContainer}>
                        <Text style={styles.recetaBtnTitle}>Tomar foto</Text>
                        <Text style={styles.recetaBtnDesc}>Usa la cámara ahora</Text>
                      </View>
                    </View>
                    <Text style={styles.recetaBtnArrow}>→</Text>
                  </TouchableOpacity>

                  <TouchableOpacity 
                    style={styles.recetaBtnGaleria} 
                    onPress={seleccionarRecetaGaleria}
                    disabled={cargandoImagen}
                  >
                    <View style={styles.recetaBtnLeft}>
                      <View style={styles.recetaBtnIconCircle}>
                        <Text style={{ fontSize: 28 }}>🖼️</Text>
                      </View>
                      <View style={styles.recetaBtnTextContainer}>
                        <Text style={styles.recetaBtnTitle}>Desde galería</Text>
                        <Text style={styles.recetaBtnDesc}>Selecciona una foto existente</Text>
                      </View>
                    </View>
                    <Text style={styles.recetaBtnArrow}>→</Text>
                  </TouchableOpacity>
                </View>
              ) : (
                <View>
                  <View style={styles.recetaSuccessHeader}>
                    <View style={styles.recetaSuccessIcon}>
                      <Text style={{ fontSize: 32 }}>✓</Text>
                    </View>
                    <Text style={styles.recetaSuccessTitle}>Receta cargada</Text>
                  </View>
                  
                  <View style={styles.recetaPreviewContainer}>
                    <Image 
                      source={{ uri: fotoReceta }} 
                      style={styles.recetaPreviewImage} 
                      resizeMode="contain"
                    />
                    <TouchableOpacity
                      style={styles.recetaRemoveBtn}
                      onPress={() => setFotoReceta(null)}
                    >
                      <Text style={styles.recetaRemoveText}>✕</Text>
                    </TouchableOpacity>
                    <View style={styles.recetaPreviewBadge}>
                      <Text style={styles.recetaPreviewBadgeText}>VISTA PREVIA</Text>
                    </View>
                  </View>

                  <View style={styles.recetaTipsBox}>
                    <Text style={styles.recetaTipsTitle}>💡 Tips para una buena foto:</Text>
                    <View style={styles.recetaTip}>
                      <Text style={styles.recetaTipIcon}>✓</Text>
                      <Text style={styles.recetaTipText}>Buena iluminación natural</Text>
                    </View>
                    <View style={styles.recetaTip}>
                      <Text style={styles.recetaTipIcon}>✓</Text>
                      <Text style={styles.recetaTipText}>Toda la receta visible</Text>
                    </View>
                    <View style={styles.recetaTip}>
                      <Text style={styles.recetaTipIcon}>✓</Text>
                      <Text style={styles.recetaTipText}>Texto legible y enfocado</Text>
                    </View>
                  </View>

                  <TouchableOpacity 
                    style={styles.recetaConfirmBtn} 
                    onPress={confirmarConReceta}
                  >
                    <Text style={styles.recetaConfirmIcon}>✓</Text>
                    <Text style={styles.recetaConfirmText}>Confirmar y agregar al carrito</Text>
                  </TouchableOpacity>
                </View>
              )}
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
}