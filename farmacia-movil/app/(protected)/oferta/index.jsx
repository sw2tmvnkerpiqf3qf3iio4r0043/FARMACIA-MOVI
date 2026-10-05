import React, { useEffect, useState } from 'react';
import { useRouter } from 'expo-router';
import { View, Text, FlatList, StatusBar, ActivityIndicator, TouchableOpacity, Image, Alert } from 'react-native';
import axios from 'axios';
import { styles } from './styles';

const API = 'http://192.168.0.106:3000/api';

export default function OfertasScreen() {
  const router = useRouter();
  const [productos, setProductos] = useState([]);
  const [nombreOferta, setNombreOferta] = useState('Ofertas Especiales');
  const [porcentajeOferta, setPorcentajeOferta] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    cargarDatosReales();
  }, []);

  const cargarDatosReales = async () => {
    try {
      setLoading(true);
      
      // 1. Obtener todos los medicamentos de la base de datos
      const resMed = await axios.get(API + '/medicamento');
      const medicamentos = resMed.data;

      let descuentoRealBD = 0;
      let nombreOfertaBD = 'Ofertas Especiales';

      // 2. Intentar obtener la oferta activa REAL de tu base de datos
      try {
        const resOfe = await axios.get(API + '/oferta');
        // Ajusta esta condición según cómo guardes el "activo" en tu BD (1, true, '1')
        const ofertasActivas = resOfe.data.filter(o => 
          o.activo === 1 || o.activo === true || o.activo === '1'
        );

        if (ofertasActivas.length > 0) {
          const oferta = ofertasActivas[0];
          descuentoRealBD = parseFloat(
            oferta.porcentaje_descuento || oferta.porcentajeDescuento || oferta.descuento || 0
          );
          nombreOfertaBD = oferta.nombre || oferta.nombre_oferta || 'Oferta Especial';
        }
      } catch (error) {
        console.log('⚠️ No se encontró tabla de ofertas, se usará el descuento individual del producto si existe.');
      }

      // 3. Procesar los productos con el descuento REAL de la base de datos
      const listaReal = medicamentos.map(p => {
        const precio = parseFloat(p.precioVenta || p.precio_venta || 0);
        
        // Si el producto tiene su propio descuento, úsalo. Si no, usa el de la oferta general.
        const descuentoAplicar = p.descuento > 0 ? p.descuento : descuentoRealBD;
        const precioOferta = precio * (1 - descuentoAplicar / 100);

        return {
          ...p,
          precioOriginal: precio,
          precioOferta: precioOferta,
          descuento: descuentoAplicar
        };
      });

      // Filtrar solo los que tienen descuento (opcional, si quieres mostrar TODOS con el descuento de la oferta, quita este filtro)
      // const productosEnOferta = listaReal.filter(p => p.descuento > 0);
      
      setNombreOferta(nombreOfertaBD);
      setPorcentajeOferta(descuentoRealBD);
      setProductos(listaReal); // Muestra todos aplicando el descuento real de la BD
      
    } catch (e) {
      console.error('❌ Error cargando datos reales:', e);
      Alert.alert('Error', 'No se pudo conectar con la base de datos. Verifica que el backend esté activo.');
    } finally {
      setLoading(false);
    }
  };

  const getImg = (img) => {
    if (!img) return null;
    let url = img.replace('localhost:3000', '192.168.0.106:3000').replace('localhost:5173', '192.168.0.106:3000');
    return { uri: url };
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#FFF" />
        <Text style={{ color: '#FFF', marginTop: 10 }}>Cargando datos reales...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#059669" />

      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={{ color: '#FFF', fontSize: 16 }}>← Volver</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>🏷️ {nombreOferta}</Text>
        <Text style={{ color: 'rgba(255,255,255,0.9)', marginTop: 4 }}>
          {porcentajeOferta > 0 ? `${porcentajeOferta}% OFF en productos seleccionados` : 'Precios especiales'}
        </Text>
      </View>

      {porcentajeOferta > 0 && (
        <View style={styles.banner}>
          <View style={styles.bannerCircle}>
            <Text style={{ color: '#FFF', fontSize: 20, fontWeight: 'bold' }}>-{porcentajeOferta}%</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.bannerTitle}>¡Descuento de la base de datos aplicado!</Text>
            <Text style={styles.bannerSubtitle}>Precios actualizados en tiempo real</Text>
          </View>
        </View>
      )}

      <FlatList
        data={productos} // Aquí van los productos con precios REALES de tu BD
        keyExtractor={(item) => String(item.idMedicamento || item.id_medicamento || Math.random())}
        numColumns={2}
        contentContainerStyle={{ padding: 12 }}
        renderItem={({ item }) => {
          const img = getImg(item.imagen);
          const stock = parseInt(item.stock || 0);
          
          // Solo mostramos la tarjeta con estilo de oferta si tiene descuento
          if (item.descuento <= 0) return null; 

          return (
            <TouchableOpacity style={styles.card} activeOpacity={0.9}>
              <View style={styles.imageBox}>
                {img ? (
                  <Image source={img} style={styles.image} resizeMode="cover" />
                ) : (
                  <View style={styles.imagePlaceholder}>
                    <Text style={{ fontSize: 50 }}>💊</Text>
                  </View>
                )}
                <View style={styles.badgeDiscount}>
                  <Text style={styles.badgeDiscountText}>-{item.descuento}%</Text>
                </View>
              </View>
              <View style={styles.infoBox}>
                <Text style={styles.name} numberOfLines={2}>
                  {item.nombreComercial || item.nombre_comercial}
                </Text>
                <Text style={styles.oldPrice}>Bs. {item.precioOriginal.toFixed(2)}</Text>
                <Text style={styles.newPrice}>Bs. {item.precioOferta.toFixed(2)}</Text>
                <Text style={[styles.stock, { color: stock > 0 ? '#059669' : '#9CA3AF' }]}>
                  {stock > 0 ? `✓ Stock: ${stock}` : '✗ Agotado'}
                </Text>
              </View>
            </TouchableOpacity>
          );
        }}
        ListEmptyComponent={
          <View style={{ alignItems: 'center', padding: 40 }}>
            <Text style={{ fontSize: 50 }}>📭</Text>
            <Text style={{ fontSize: 16, color: '#6B7280', marginTop: 10, textAlign: 'center' }}>
              No hay productos en oferta en este momento.
            </Text>
          </View>
        }
      />
    </View>
  );
}