import React, { useEffect, useState } from 'react';
import { useRouter } from 'expo-router';
import {
  View, Text, FlatList, ActivityIndicator, StatusBar,
  TextInput, TouchableOpacity, Alert, RefreshControl
} from 'react-native';
import axios from 'axios';
import ProductoCard from './ProductoCard';
import { styles } from './styles';

const API_URL = 'http://192.168.0.106:3000/api';

export default function ProductosScreen() {
  const router = useRouter();
  const [productos, setProductos] = useState([]);
  const [productosFiltrados, setProductosFiltrados] = useState([]);
  const [categorias, setCategorias] = useState([{ id_categoria: 'todas', nombre: 'Todas' }]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [busqueda, setBusqueda] = useState('');
  const [categoriaActiva, setCategoriaActiva] = useState('todas');

  const fetchDatos = async () => {
    try {
      setLoading(true);
      const [resMed, resCat] = await Promise.all([
        axios.get(`${API_URL}/medicamento`, { timeout: 10000 }),
        axios.get(`${API_URL}/categoria`, { timeout: 10000 })
      ]);

      const cats = [{ id_categoria: 'todas', nombre: 'Todas' }, ...resCat.data];
      setCategorias(cats);
      setProductos(resMed.data);
      setProductosFiltrados(resMed.data);
    } catch (error) {
      console.error('Error:', error.message);
      Alert.alert('Error', 'No se pudo conectar con el servidor');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchDatos();
  }, []);

  useEffect(() => {
    let resultado = productos;

    if (categoriaActiva !== 'todas') {
      resultado = resultado.filter(p => String(p.idCategoria || p.id_categoria) === String(categoriaActiva));
    }

    if (busqueda.trim() !== '') {
      const busquedaLower = busqueda.toLowerCase();
      resultado = resultado.filter(p => {
        const nombreComercial = (p.nombreComercial || p.nombre_comercial || '').toLowerCase();
        const nombreGenerico = (p.nombreGenerico || p.nombre_generico || '').toLowerCase();
        return nombreComercial.includes(busquedaLower) || nombreGenerico.includes(busquedaLower);
      });
    }

    setProductosFiltrados(resultado);
  }, [busqueda, categoriaActiva, productos]);

  const onRefresh = () => {
    setRefreshing(true);
    fetchDatos();
  };

  const handleAgregar = (producto) => {
    Alert.alert('Agregado', `${producto.nombreComercial || producto.nombre_comercial} añadido al carrito`);
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

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#059669" />

      <View style={styles.header}>
        <View style={styles.headerTop}>
          <View style={{ flex: 1 }}>
            <Text style={styles.headerTitle}>Productos</Text>
            <Text style={styles.headerSubtitle}>{productosFiltrados.length} productos</Text>
          </View>
          <TouchableOpacity 
            style={{ backgroundColor: '#FFFFFF', paddingHorizontal: 16, paddingVertical: 8, borderRadius: 12, marginRight: 10 }}
            onPress={() => router.push('/categoria')}
          >
            <Text style={{ fontSize: 20 }}>📂</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.searchContainer}>
          <Text style={{ fontSize: 18 }}>🔍</Text>
          <TextInput
            style={styles.searchInput}
            placeholder="Buscar medicamento..."
            placeholderTextColor="#94A3B8"
            value={busqueda}
            onChangeText={setBusqueda}
          />
          {busqueda.length > 0 && (
            <TouchableOpacity onPress={() => setBusqueda('')}>
              <Text style={{ color: '#94A3B8', fontSize: 18, fontWeight: 'bold' }}>✕</Text>
            </TouchableOpacity>
          )}
        </View>

        <View style={{ marginTop: 16 }}>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={categorias}
            keyExtractor={(item) => String(item.id_categoria)}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={[
                  styles.categoriaBtn,
                  String(categoriaActiva) === String(item.id_categoria) && styles.categoriaBtnActiva
                ]}
                onPress={() => setCategoriaActiva(String(item.id_categoria))}
              >
                <Text style={[
                  styles.categoriaText,
                  String(categoriaActiva) === String(item.id_categoria) && styles.categoriaTextActiva
                ]}>
                  {item.nombre}
                </Text>
              </TouchableOpacity>
            )}
          />
        </View>
      </View>

      <FlatList
        data={productosFiltrados}
        keyExtractor={(item) => String(item.idMedicamento || item.id_medicamento || Math.random())}
        renderItem={({ item }) => <ProductoCard item={item} onAgregar={handleAgregar} />}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={['#059669']} />}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyIcon}>🔍</Text>
            <Text style={styles.emptyText}>No se encontraron productos</Text>
          </View>
        }
      />
    </View>
  );
}