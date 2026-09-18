import { useRouter } from 'expo-router';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  ScrollView, 
  StatusBar,
  Alert 
} from 'react-native';

export default function HomeScreen() {
  const router = useRouter();

  const menuItems = [
    { 
      id: 1, 
      icon: '💊', 
      title: 'Productos', 
      description: 'Gestión de medicamentos',
      route: '/medicamento', 
      color: '#2f462f' 
    },
    { 
      id: 2, 
      icon: '🏷️', 
      title: 'Ofertas', 
      description: 'Promociones y descuentos',
      route: null, 
      color: '#FF9800' 
    },/*
    { 
      id: 3, 
      icon: '💰', 
      title: 'Ventas', 
      description: 'Registro de ventas',
      route: null, 
      color: '#2196F3' 
    },
    { 
      id: 4, 
      icon: '📦', 
      title: 'Inventario', 
      description: 'Control de stock',
      route: null, 
      color: '#9C27B0' 
    },
    { 
      id: 5, 
      icon: '', 
      title: 'Clientes', 
      description: 'Gestión de clientes',
      route: null, 
      color: '#E91E63' 
    },
    { 
      id: 6, 
      icon: '📊', 
      title: 'Reportes', 
      description: 'Estadísticas y reportes',
      route: null, 
      color: '#00BCD4' 
    },*/
  ];

  const handleMenuPress = (item) => {
    if (item.route) {
      router.push(item.route);
    } else {
      Alert.alert(
        'Próximamente',
        `El módulo de ${item.title} estará disponible pronto.`
      );
    }
  };

  const handleLogout = () => {
    Alert.alert(
      'Cerrar Sesión',
      '¿Estás seguro que deseas salir?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { 
          text: 'Salir', 
          onPress: () => router.replace('/login') 
        }
      ]
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#4CAF50" />
      
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <View>
            <Text style={styles.welcomeText}>Bienvenido a MainFarma</Text>
            <Text style={styles.userName}>Usuario </Text>
          </View>
          <TouchableOpacity 
            style={styles.logoutButton}
            onPress={handleLogout}
          >
            <Text style={styles.logoutIcon}>🚪</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Contenido */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.sectionTitle}>Menú Principal</Text>
        
        <View style={styles.grid}>
          {menuItems.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={[styles.menuCard, { borderLeftColor: item.color }]}
              onPress={() => handleMenuPress(item)}
              activeOpacity={0.7}
            >
              <Text style={styles.menuIcon}>{item.icon}</Text>
              <Text style={styles.menuTitle}>{item.title}</Text>
              <Text style={styles.menuDescription}>{item.description}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Tarjeta de información */}
        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}> Farmacia App v1.0</Text>
          <Text style={styles.infoText}>
            Sistema de gestión para farmacias
          </Text>
          <Text style={styles.infoText}>
            Desarrollado con React Native + Expo
          </Text>
          <Text style={styles.infoText}>
            Práctica Móvil - Módulo II
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#4CAF50',
    paddingTop: 50,
    paddingBottom: 30,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  welcomeText: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.9)',
    marginBottom: 5,
  },
  userName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'white',
  },
  logoutButton: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    width: 45,
    height: 45,
    borderRadius: 22.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoutIcon: {
    fontSize: 22,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  menuCard: {
    width: '48%',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 12,
    marginBottom: 15,
    borderLeftWidth: 4,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  menuIcon: {
    fontSize: 35,
    marginBottom: 10,
  },
  menuTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  menuDescription: {
    fontSize: 12,
    color: '#666',
  },
  infoCard: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 12,
    marginTop: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginBottom: 10,
  },
  infoText: {
    fontSize: 13,
    color: '#666',
    marginBottom: 5,
  },
});