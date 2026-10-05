import React from 'react';
import { useRouter } from 'expo-router';
import { View, Text, TouchableOpacity, StatusBar, ScrollView, Image, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export default function Index() {
  const router = useRouter();

  const menuItems = [
    {
      id: 1,
      icon: '💊',
      title: 'Productos',
      description: 'Catálogo completo de medicamentos',
      color: '#059669',
      image: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=600&h=400&fit=crop',
      route: '/medicamento'
    },
    {
      id: 2,
      icon: '🏷️',
      title: 'Ofertas',
      description: 'Descuentos y promociones especiales',
      color: '#059669', // <--- AHORA ES VERDE
      image: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=600&h=400&fit=crop',
      route: '/oferta'
    }
  ];

  return (
    <View style={{ flex: 1, backgroundColor: '#F8FAFC' }}>
      <StatusBar barStyle="light-content" backgroundColor="#059669" />

      {/* HEADER CON LOGO CREATIVO */}
      <View style={{
        backgroundColor: '#059669',
        paddingTop: 60,
        paddingBottom: 40,
        paddingHorizontal: 24,
        borderBottomLeftRadius: 32,
        borderBottomRightRadius: 32,
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Círculos decorativos de fondo */}
        <View style={{
          position: 'absolute',
          top: -50,
          right: -50,
          width: 200,
          height: 200,
          borderRadius: 100,
          backgroundColor: 'rgba(255,255,255,0.08)'
        }} />
        <View style={{
          position: 'absolute',
          bottom: -80,
          left: -40,
          width: 180,
          height: 180,
          borderRadius: 90,
          backgroundColor: 'rgba(255,255,255,0.05)'
        }} />
        <View style={{
          position: 'absolute',
          top: 80,
          right: 80,
          width: 60,
          height: 60,
          borderRadius: 30,
          backgroundColor: 'rgba(255,255,255,0.06)'
        }} />

        {/* LOGO CREATIVO */}
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
          {/* Logo: Cruz médica estilizada dentro de círculo */}
          <View style={{
            width: 56,
            height: 56,
            borderRadius: 16,
            backgroundColor: '#FFFFFF',
            justifyContent: 'center',
            alignItems: 'center',
            marginRight: 14,
            elevation: 4,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.2,
            shadowRadius: 4
          }}>
            {/* Cruz médica con diseño moderno */}
            <View style={{ position: 'relative', width: 28, height: 28 }}>
              {/* Parte vertical de la cruz */}
              <View style={{
                position: 'absolute',
                left: 10,
                top: 0,
                width: 8,
                height: 28,
                backgroundColor: '#059669',
                borderRadius: 3
              }} />
              {/* Parte horizontal de la cruz */}
              <View style={{
                position: 'absolute',
                top: 10,
                left: 0,
                width: 28,
                height: 8,
                backgroundColor: '#059669',
                borderRadius: 3
              }} />
            </View>
          </View>

          {/* Título MainFarma */}
          <View>
            <Text style={{
              fontSize: 32,
              fontWeight: '900',
              color: '#FFFFFF',
              letterSpacing: 1,
              fontFamily: 'System'
            }}>
              Main<Text style={{ color: '#FDE68A' }}>Farma</Text>
            </Text>
            <Text style={{
              fontSize: 13,
              color: 'rgba(255,255,255,0.85)',
              letterSpacing: 2,
              fontWeight: '500',
              marginTop: 2
            }}>
              TU FARMACIA DE CONFIANZA
            </Text>
          </View>
        </View>

        {/* Mensaje de bienvenida */}
        <View style={{ marginTop: 20 }}>
          <Text style={{
            fontSize: 20,
            fontWeight: '600',
            color: '#FFFFFF'
          }}>
            ¡Hola! 👋
          </Text>
          <Text style={{
            fontSize: 14,
            color: 'rgba(255,255,255,0.9)',
            marginTop: 4
          }}>
            ¿Qué necesitas hoy?
          </Text>
        </View>
      </View>

      {/* CONTENIDO PRINCIPAL */}
      <ScrollView contentContainerStyle={{ padding: 20, paddingBottom: 40 }}>
        {/* Sección de acceso rápido */}
        <Text style={{
          fontSize: 18,
          fontWeight: 'bold',
          color: '#111827',
          marginBottom: 16,
          marginTop: 8
        }}>
          Acceso rápido
        </Text>

        {menuItems.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: 24,
              marginBottom: 16,
              overflow: 'hidden',
              elevation: 4,
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 3 },
              shadowOpacity: 0.1,
              shadowRadius: 6
            }}
            onPress={() => router.push(item.route)}
            activeOpacity={0.9}
          >
            {/* Imagen con overlay */}
            <View style={{ height: 160, position: 'relative' }}>
              <Image
                source={{ uri: item.image }}
                style={{ width: '100%', height: '100%' }}
                resizeMode="cover"
              />
              <View style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: 'rgba(0,0,0,0.35)'
              }} />

              {/* Badge con ícono */}
              <View style={{
                position: 'absolute',
                top: 16,
                left: 16,
                backgroundColor: '#FFFFFF',
                paddingHorizontal: 14,
                paddingVertical: 8,
                borderRadius: 20,
                flexDirection: 'row',
                alignItems: 'center',
                gap: 6,
                elevation: 3
              }}>
                <Text style={{ fontSize: 18 }}>{item.icon}</Text>
                <Text style={{
                  fontSize: 13,
                  fontWeight: 'bold',
                  color: item.color
                }}>
                  {item.title.toUpperCase()}
                </Text>
              </View>

              {/* Título sobre la imagen */}
              <View style={{
                position: 'absolute',
                bottom: 16,
                left: 16,
                right: 16
              }}>
                <Text style={{
                  fontSize: 26,
                  fontWeight: 'bold',
                  color: '#FFFFFF',
                  marginBottom: 4
                }}>
                  {item.title}
                </Text>
                <Text style={{
                  fontSize: 13,
                  color: 'rgba(255,255,255,0.95)'
                }}>
                  {item.description}
                </Text>
              </View>
            </View>

            {/* Footer de la tarjeta */}
            <View style={{
              padding: 14,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                <View style={{
                  width: 10,
                  height: 10,
                  borderRadius: 5,
                  backgroundColor: item.color
                }} />
                <Text style={{
                  fontSize: 13,
                  color: '#6B7280',
                  fontWeight: '500'
                }}>
                  Toca para explorar
                </Text>
              </View>
              <View style={{
                width: 32,
                height: 32,
                borderRadius: 16,
                backgroundColor: item.color + '15',
                justifyContent: 'center',
                alignItems: 'center'
              }}>
                <Text style={{
                  fontSize: 16,
                  color: item.color,
                  fontWeight: 'bold'
                }}>
                  →
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}

        {/* Tarjeta informativa */}
        <View style={{
          backgroundColor: '#FFFFFF',
          borderRadius: 20,
          padding: 20,
          marginTop: 8,
          elevation: 2,
          borderLeftWidth: 4,
          borderLeftColor: '#059669'
        }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
            <View style={{
              width: 40,
              height: 40,
              borderRadius: 12,
              backgroundColor: '#F0FDF4',
              justifyContent: 'center',
              alignItems: 'center',
              marginRight: 12
            }}>
              <Text style={{ fontSize: 20 }}>✨</Text>
            </View>
            <View>
              <Text style={{
                fontSize: 16,
                fontWeight: 'bold',
                color: '#111827'
              }}>
                ¿Por qué MainFarma?
              </Text>
              <Text style={{
                fontSize: 12,
                color: '#6B7280'
              }}>
                Tu salud es nuestra prioridad
              </Text>
            </View>
          </View>

          <View style={{ gap: 10 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
              <Text style={{ color: '#059669', fontSize: 16, fontWeight: 'bold' }}>✓</Text>
              <Text style={{ fontSize: 13, color: '#4B5563' }}>Productos 100% originales y certificados</Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
              <Text style={{ color: '#059669', fontSize: 16, fontWeight: 'bold' }}>✓</Text>
              <Text style={{ fontSize: 13, color: '#4B5563' }}>Atención farmacéutica profesional</Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
              <Text style={{ color: '#059669', fontSize: 16, fontWeight: 'bold' }}>✓</Text>
              <Text style={{ fontSize: 13, color: '#4B5563' }}>Ofertas y descuentos exclusivos</Text>
            </View>
          </View>
        </View>

        {/* Footer */}
        <View style={{
          alignItems: 'center',
          marginTop: 24,
          paddingBottom: 10
        }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
            <View style={{
              width: 20,
              height: 20,
              borderRadius: 6,
              backgroundColor: '#059669',
              justifyContent: 'center',
              alignItems: 'center'
            }}>
              <View style={{ position: 'relative', width: 10, height: 10 }}>
                <View style={{
                  position: 'absolute',
                  left: 4,
                  top: 0,
                  width: 2,
                  height: 10,
                  backgroundColor: '#FFFFFF',
                  borderRadius: 1
                }} />
                <View style={{
                  position: 'absolute',
                  top: 4,
                  left: 0,
                  width: 10,
                  height: 2,
                  backgroundColor: '#FFFFFF',
                  borderRadius: 1
                }} />
              </View>
            </View>
            <Text style={{
              fontSize: 12,
              color: '#9CA3AF',
              fontWeight: '600'
            }}>
              MainFarma v1.0
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}