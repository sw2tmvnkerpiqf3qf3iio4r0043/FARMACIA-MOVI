import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F3F4F6' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#059669' },

  header: {
    backgroundColor: '#059669',
    padding: 20,
    paddingTop: 50,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24
  },
  headerTitle: { fontSize: 28, fontWeight: 'bold', color: '#FFFFFF', marginTop: 8 },

  banner: {
    backgroundColor: '#D1FAE5',
    margin: 16,
    padding: 20,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#059669',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16
  },
  bannerCircle: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#059669',
    justifyContent: 'center',
    alignItems: 'center'
  },
  bannerTitle: { fontSize: 18, fontWeight: 'bold', color: '#065F46', marginBottom: 4 },
  bannerSubtitle: { fontSize: 14, color: '#047857' },

  card: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    margin: 6,
    overflow: 'hidden',
    elevation: 3
  },
  imageBox: { height: 120, backgroundColor: '#F9FAFB', position: 'relative' },
  image: { width: '100%', height: '100%' },
  imagePlaceholder: { flex: 1, justifyContent: 'center', alignItems: 'center' },

  badgeDiscount: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: '#059669',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8
  },
  badgeDiscountText: { color: '#FFFFFF', fontSize: 11, fontWeight: 'bold' },

  infoBox: { padding: 12 },
  name: { fontSize: 14, fontWeight: 'bold', color: '#111827', marginBottom: 8, lineHeight: 18 },
  oldPrice: { fontSize: 12, color: '#9CA3AF', textDecorationLine: 'line-through', marginBottom: 2 },
  newPrice: { fontSize: 18, fontWeight: 'bold', color: '#059669', marginBottom: 6 },
  stock: { fontSize: 11, fontWeight: '600' }
});

export default styles;