/*import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StatusBar,
  TextInput,
  TouchableOpacity,
  Alert,
  RefreshControl
} from 'react-native';
import { apiClient } from '../../../api/apiClient';
import { styles } from './styles';

export default function CategoriasScreen() {
  const [categorias, setCategorias] = useState([]);
  const [categoriasFiltradas, setCategoriasFiltradas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [busqueda, setBusqueda] = useState('');

  const getIconoCategoria = (nombre) => {
    const lower = (nombre || '').toLowerCase();
    if (lower.includes('analgésico') || lower.includes('analgesico')) return '💊';
    if (lower.includes('antibiótico') || lower.includes('antibiotico')) return '💉';
    if (lower.includes('gastrointestinal')) return '🫁';
    if (lower.includes('antiinflamatorio')) return '🩹';
    if (lower.includes('antigripal')) return '🤧';
    if (lower.includes('cardiovascular')) return '❤️';
    if (lower.includes('vitamina')) return '🍊';
    if (lower.includes('dermocosmética') || lower.includes('dermocosmetica')) return '🧴';
    if (lower.includes('higiene')) return '🧼';
    if (lower.includes('bebé') || lower.includes('bebe')) return '';
    return '📦';
  };

  const getColorCategoria = (tipo) => {
    const lower = (tipo || '').toLowerCase();
    if (lower === 'medicamento') return '#4CAF50';
    if (lower === 'parafarmacia') return '#2196F3';
    if (lower === 'dermocosmetica') return '#E91E63';
    if (lower === 'higiene') return '#9C27B0';
    return '#FF9800';
  };

  const fetchCategorias = async () => {
    try {
      const response = await apiClient.get('/categoria');
      const catsConIconos = response.data.map(c => ({
        ...c,
        icono: getIconoCategoria(c.nombre),
        color: getColorCategoria(c.tipo_categoria || c.tipoCategoria)
      }));
      setCategorias(catsConIconos);
      setCategoriasFiltradas(catsConIconos);
    } catch (error) {
      console.error('❌ Error:', error.message);
      Alert.alert('Error', 'No se pudo cargar las categorías');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchCategorias();
  }, []);

  useEffect(() => {
    if (busqueda.trim() === '') {
      setCategoriasFiltradas(categorias);
    } else {
      const busquedaLower = busqueda.toLowerCase();
      const filtradas = categorias.filter(c =>
        (c.nombre || '').toLowerCase().includes(busquedaLower) ||
        (c.descripcion || '').toLowerCase().includes(busquedaLower)
      );
      setCategoriasFiltradas(filtradas);
    }
  }, [busqueda, categorias]);

  const onRefresh = () => {
    setRefreshing(true);
    fetchCategorias();
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <StatusBar barStyle="light-content" backgroundColor="#2196F3" />
        <ActivityIndicator size="large" color="#FFFFFF" />
        <Text style={styles.loadingText}>Cargando categorías...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#2196F3" />

      
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <View>
            <Text style={styles.headerTitle}>📂 Categorías</Text>
            <Text style={styles.headerSubtitle}>
              {categoriasFiltradas.length} categoría(s) disponible(s)
            </Text>
          </View>
          <TouchableOpacity style={styles.refreshBtn} onPress={onRefresh}>
            <Text style={{ fontSize: 24 }}>🔄</Text>
          </TouchableOpacity>
        </View>

       
        <View style={styles.searchContainer}>
          <Text style={{ fontSize: 18 }}>🔍</Text>
          <TextInput
            style={styles.searchInput}
            placeholder="Buscar categoría..."
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
      </View>

      
      <FlatList
        data={categoriasFiltradas}
        keyExtractor={(item) => item.id_categoria?.toString() || Math.random().toString()}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.card} activeOpacity={0.9}>
            
            <View style={[styles.iconContainer, { backgroundColor: item.color + '20' }]}>
              <Text style={styles.icon}>{item.icono}</Text>
            </View>

            <View style={styles.infoSection}>
              <Text style={styles.nombre} numberOfLines={1}>
                {item.nombre || 'Sin nombre'}
              </Text>
              <Text style={styles.descripcion} numberOfLines={2}>
                {item.descripcion || 'Sin descripción'}
              </Text>

              <View style={styles.tagsContainer}>
                <View style={[styles.tag, { backgroundColor: item.color + '20' }]}>
                  <Text style={[styles.tagText, { color: item.color }]}>
                    {item.tipo_categoria || item.tipoCategoria || 'General'}
                  </Text>
                </View>
                <View style={styles.tag}>
                  <Text style={styles.tagText}>
                    {item.tipo_enfermedad || item.tipoEnfermedad || 'General'}
                  </Text>
                </View>
              </View>
            </View>

           
            <View style={styles.arrowContainer}>
              <Text style={styles.arrow}>→</Text>
            </View>
          </TouchableOpacity>
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={['#2196F3']} />
        }
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyIcon}>📂</Text>
            <Text style={styles.emptyText}>No se encontraron categorías</Text>
            <Text style={styles.emptySubtext}>Intenta con otra búsqueda</Text>
          </View>
        }
      />
    </View>
  );
}*/