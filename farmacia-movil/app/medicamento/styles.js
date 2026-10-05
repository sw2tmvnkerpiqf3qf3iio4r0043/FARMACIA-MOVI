import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F3F4F6' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#059669' },
  loadingText: { marginTop: 16, color: '#FFFFFF', fontSize: 16, fontWeight: '600' },
  list: { padding: 12, paddingBottom: 40 },

  header: { 
    backgroundColor: '#059669', 
    padding: 20, 
    paddingTop: 50, 
    paddingBottom: 20,
    borderBottomLeftRadius: 24, 
    borderBottomRightRadius: 24, 
    elevation: 5 
  },
  headerTop: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    marginBottom: 16 
  },
  headerTitle: { fontSize: 24, fontWeight: 'bold', color: '#FFFFFF' },
  headerSubtitle: { fontSize: 14, color: 'rgba(255,255,255,0.9)', marginTop: 4 },
  carritoBtn: { backgroundColor: 'rgba(255,255,255,0.2)', padding: 10, borderRadius: 12 },

  searchContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    alignItems: 'center',
    paddingHorizontal: 14,
    height: 48,
    elevation: 3
  },
  searchInput: { flex: 1, height: '100%', fontSize: 15, color: '#1F2937', marginLeft: 10 },

  categoriasContainer: { paddingVertical: 16, paddingHorizontal: 12 },
  categoriaBtn: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 24,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    marginRight: 10,
    elevation: 1
  },
  categoriaBtnActiva: { backgroundColor: '#059669', borderColor: '#059669' },
  categoriaText: { fontSize: 13, fontWeight: '600', color: '#4B5563' },
  categoriaTextActiva: { color: '#FFFFFF' },

  card: { 
    backgroundColor: '#FFFFFF', 
    borderRadius: 16, 
    marginBottom: 16, 
    overflow: 'hidden', 
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  imageSection: { height: 160, backgroundColor: '#F9FAFB', position: 'relative' },
  productImage: { width: '100%', height: '100%' },
  imageFallbackContainer: { width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center' },
  imageFallback: { fontSize: 60, opacity: 0.5 },
  
  badgeOferta: { position: 'absolute', top: 12, left: 12, backgroundColor: '#EF4444', paddingHorizontal: 10, paddingVertical: 6, borderRadius: 8, elevation: 2 },
  badgeOfertaText: { color: '#FFFFFF', fontSize: 11, fontWeight: 'bold' },
  badgeReceta: { position: 'absolute', top: 12, right: 12, backgroundColor: '#F59E0B', width: 36, height: 36, borderRadius: 18, justifyContent: 'center', alignItems: 'center', borderWidth: 2, borderColor: '#FFFFFF', elevation: 2 },
  
  infoSection: { padding: 16 },
  nombre: { fontSize: 16, fontWeight: 'bold', color: '#111827', marginBottom: 4 },
  generico: { fontSize: 13, color: '#6B7280', fontStyle: 'italic', marginBottom: 12 },
  tagsContainer: { flexDirection: 'row', gap: 8, marginBottom: 12 },
  tag: { backgroundColor: '#F3F4F6', paddingHorizontal: 10, paddingVertical: 6, borderRadius: 8 },
  tagText: { fontSize: 12, color: '#4B5563', fontWeight: '600' },
  
  priceRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  precioContainer: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  precioOriginal: { fontSize: 13, color: '#9CA3AF', textDecorationLine: 'line-through' },
  precio: { fontSize: 18, fontWeight: 'bold', color: '#059669' },
  stockBadge: { paddingHorizontal: 10, paddingVertical: 6, borderRadius: 8, alignItems: 'center' },
  stockText: { fontSize: 11, fontWeight: '700' },

  btnAgregar: { backgroundColor: '#059669', paddingVertical: 14, alignItems: 'center', borderTopWidth: 1, borderTopColor: '#F3F4F6' },
  btnReceta: { backgroundColor: '#D97706' },
  btnDisabled: { backgroundColor: '#9CA3AF' },
  btnText: { color: '#FFFFFF', fontSize: 15, fontWeight: 'bold' },

  emptyContainer: { alignItems: 'center', marginTop: 60, padding: 20 },
  emptyIcon: { fontSize: 60, marginBottom: 16 },
  emptyText: { fontSize: 18, color: '#6B7280', fontWeight: '600', marginBottom: 8 },
  emptySubtext: { fontSize: 14, color: '#9CA3AF', textAlign: 'center' },

  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center', padding: 20 },
  modalContent: { backgroundColor: '#FFFFFF', borderRadius: 20, padding: 24, width: '100%', maxWidth: 400, elevation: 10 },
  modalIcon: { fontSize: 50, textAlign: 'center', marginBottom: 16 },
  modalTitle: { fontSize: 20, fontWeight: 'bold', color: '#111827', textAlign: 'center', marginBottom: 12 },
  modalText: { fontSize: 15, color: '#4B5563', textAlign: 'center', lineHeight: 22, marginBottom: 24 },
  modalBold: { fontWeight: 'bold', color: '#111827' },
  
  btnModalPrimario: { backgroundColor: '#059669', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: 14, borderRadius: 12, marginBottom: 12 },
  btnModalPrimarioText: { color: '#FFFFFF', fontSize: 15, fontWeight: 'bold' },
  btnModalSecundario: { backgroundColor: '#F3F4F6', paddingVertical: 14, borderRadius: 12, alignItems: 'center' },
  btnModalSecundarioText: { color: '#4B5563', fontSize: 15, fontWeight: '600' },

    modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end'
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    maxHeight: '90%',
    padding: 24
  },
  modalCloseBtn: {
    position: 'absolute',
    top: 16,
    right: 16,
    zIndex: 10,
    backgroundColor: '#F3F4F6',
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center'
  },
  modalImageContainer: {
    height: 200,
    backgroundColor: '#F9FAFB',
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 20
  },
  modalImage: {
    width: '100%',
    height: '100%'
  },
  modalImageFallback: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 8
  },
  modalGenerico: {
    fontSize: 16,
    color: '#6B7280',
    fontStyle: 'italic',
    marginBottom: 20
  },
  modalInfoGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 20
  },
  modalInfoItem: {
    flex: 1,
    minWidth: '45%',
    backgroundColor: '#F9FAFB',
    padding: 12,
    borderRadius: 12
  },
  modalInfoLabel: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 4
  },
  modalInfoValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827'
  },
  modalDescripcionContainer: {
    backgroundColor: '#F9FAFB',
    padding: 16,
    borderRadius: 12,
    marginBottom: 20
  },
  modalDescripcionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 8
  },
  modalDescripcionText: {
    fontSize: 14,
    color: '#4B5563',
    lineHeight: 20
  },
  modalPrecioContainer: {
    backgroundColor: '#F0FDF4',
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: '#059669'
  },
  modalPrecioLabel: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 8
  },
  modalPrecioOriginal: {
    fontSize: 16,
    color: '#9CA3AF',
    textDecorationLine: 'line-through'
  },
  modalPrecioFinal: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#059669'
  },
  modalDescuentoBadge: {
    backgroundColor: '#EF4444',
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    marginTop: 8,
    alignSelf: 'flex-start'
  },
  modalBtnAgregar: {
    backgroundColor: '#059669',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center'
  },
  modalBtnDisabled: {
    backgroundColor: '#9CA3AF'
  },
  modalBtnText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold'
  },

    modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end'
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    maxHeight: '90%',
    padding: 24
  },
  modalCloseBtn: {
    position: 'absolute',
    top: 16,
    right: 16,
    zIndex: 10,
    backgroundColor: '#F3F4F6',
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center'
  },
  modalImageContainer: {
    height: 220,
    backgroundColor: '#F9FAFB',
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 20
  },
  modalImage: {
    width: '100%',
    height: '100%'
  },
  modalImageFallback: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 6
  },
  modalGenerico: {
    fontSize: 16,
    color: '#6B7280',
    fontStyle: 'italic',
    marginBottom: 4
  },
  modalMarca: {
    fontSize: 14,
    color: '#3B82F6',
    fontWeight: '600',
    marginBottom: 16
  },
  modalInfoRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16
  },
  modalInfoBox: {
    flex: 1,
    backgroundColor: '#F9FAFB',
    padding: 12,
    borderRadius: 12
  },
  modalInfoLabel: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 4
  },
  modalInfoValue: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#111827'
  },
  modalRecetaAlert: {
    flexDirection: 'row',
    backgroundColor: '#FEF3C7',
    padding: 14,
    borderRadius: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#FDE68A',
    alignItems: 'center',
    gap: 12
  },
  modalRecetaIcon: {
    fontSize: 24
  },
  modalRecetaTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#92400E',
    marginBottom: 2
  },
  modalRecetaText: {
    fontSize: 12,
    color: '#A16207'
  },
  modalDescripcionContainer: {
    backgroundColor: '#F9FAFB',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16
  },
  modalDescripcionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 12
  },
  modalDescripcionText: {
    fontSize: 14,
    color: '#4B5563',
    lineHeight: 20
  },
  seccionContainer: {
    marginBottom: 12
  },
  seccionTitulo: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#059669',
    marginBottom: 4
  },
  seccionTexto: {
    fontSize: 14,
    color: '#4B5563',
    lineHeight: 20
  },
  modalPrecioContainer: {
    backgroundColor: '#F0FDF4',
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: '#059669'
  },
  modalPrecioLabel: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '600'
  },
  cantidadControl: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#D1D5DB'
  },
  cantidadBtn: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center'
  },
  cantidadBtnText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#059669'
  },
  cantidadNumero: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#111827',
    paddingHorizontal: 12
  },
  modalPrecioOriginal: {
    fontSize: 16,
    color: '#9CA3AF',
    textDecorationLine: 'line-through',
    marginTop: 8
  },
  modalPrecioFinal: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#059669'
  },
  modalDescuentoBadge: {
    backgroundColor: '#EF4444',
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    marginTop: 8,
    alignSelf: 'flex-start'
  },
  modalBtnAgregar: {
    backgroundColor: '#059669',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 20
  },
  modalBtnDisabled: {
    backgroundColor: '#9CA3AF'
  },
  modalBtnText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold'
  },

  recetaModalContent: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    maxHeight: '85%',
    padding: 24
  },
  recetaTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#111827',
    textAlign: 'center',
    marginBottom: 8,
    marginTop: 10
  },
  recetaSubtitle: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 20
  },
  recetaInfoBox: {
    backgroundColor: '#EFF6FF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#BFDBFE'
  },
  recetaInfoTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1E40AF',
    marginBottom: 8
  },
  recetaInfoText: {
    fontSize: 13,
    color: '#1E3A8A',
    lineHeight: 20
  },
  recetaButtonsContainer: {
    gap: 12
  },
  recetaBtnCamara: {
    flexDirection: 'row',
    backgroundColor: '#059669',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10
  },
  recetaBtnGaleria: {
    flexDirection: 'row',
    backgroundColor: '#3B82F6',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10
  },
  recetaBtnIcon: {
    fontSize: 20
  },
  recetaBtnText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold'
  },
  recetaPreviewLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 10
  },
  recetaPreviewContainer: {
    height: 200,
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 16,
    position: 'relative'
  },
  recetaPreviewImage: {
    width: '100%',
    height: '100%'
  },
  recetaRemoveBtn: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: '#EF4444',
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center'
  },
  recetaRemoveText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold'
  },
  recetaConfirmBtn: {
    backgroundColor: '#059669',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center'
  },
  recetaConfirmText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold'
  },
    recetaModalContent: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    maxHeight: '92%',
    padding: 24
  },
  recetaHeader: {
    alignItems: 'center',
    marginBottom: 24,
    marginTop: 10
  },
  recetaIconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#F0FDF4',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    borderWidth: 3,
    borderColor: '#059669'
  },
  recetaTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 8
  },
  recetaSubtitle: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 20,
    paddingHorizontal: 20
  },
  recetaInfoBox: {
    backgroundColor: '#EFF6FF',
    padding: 20,
    borderRadius: 16,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#BFDBFE'
  },
  recetaInfoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1E40AF',
    marginBottom: 16
  },
  recetaPasosContainer: {
    gap: 12
  },
  recetaPaso: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12
  },
  recetaPasoNumero: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#1E40AF',
    justifyContent: 'center',
    alignItems: 'center'
  },
  recetaPasoNumeroText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold'
  },
  recetaPasoText: {
    flex: 1,
    fontSize: 14,
    color: '#1E3A8A',
    lineHeight: 20
  },
  recetaOpcionesTitulo: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#374151',
    marginBottom: 16
  },
  recetaBtnCamara: {
    flexDirection: 'row',
    backgroundColor: '#059669',
    padding: 18,
    borderRadius: 16,
    alignItems: 'center',
    gap: 14,
    marginBottom: 12,
    elevation: 3,
    shadowColor: '#059669',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4
  },
  recetaBtnGaleria: {
    flexDirection: 'row',
    backgroundColor: '#3B82F6',
    padding: 18,
    borderRadius: 16,
    alignItems: 'center',
    gap: 14,
    marginBottom: 12,
    elevation: 3,
    shadowColor: '#3B82F6',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4
  },
  recetaBtnIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center'
  },
  recetaBtnText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold'
  },
  recetaBtnSubtext: {
    color: 'rgba(255,255,255,0.85)',
    fontSize: 12,
    marginTop: 2
  },
  recetaPreviewContainer: {
    height: 320,
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 16,
    position: 'relative',
    backgroundColor: '#F3F4F6',
    borderWidth: 2,
    borderColor: '#059669'
  },
  recetaPreviewImage: {
    width: '100%',
    height: '100%'
  },
  recetaRemoveBtn: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: '#EF4444',
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4
  },
  recetaRemoveText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold'
  },
  recetaConsejos: {
    backgroundColor: '#FEF3C7',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#FDE68A'
  },
  recetaConsejosTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#92400E',
    marginBottom: 8
  },
  recetaConsejosText: {
    fontSize: 13,
    color: '#A16207',
    lineHeight: 20,
    marginBottom: 2
  },
  recetaConfirmBtn: {
    backgroundColor: '#059669',
    paddingVertical: 18,
    borderRadius: 16,
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#059669',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 6
  },
  recetaConfirmText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold'
  },
    recetaModalContent: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    maxHeight: '95%',
    padding: 24
  },
  recetaHeaderContainer: {
    alignItems: 'center',
    marginBottom: 24,
    marginTop: 10
  },
  recetaBadgeTop: {
    backgroundColor: '#EF4444',
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 20,
    marginBottom: 20
  },
  recetaBadgeText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: 'bold',
    letterSpacing: 1
  },
  recetaIconWrapper: {
    position: 'relative',
    marginBottom: 16
  },
  recetaIconBg: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#F0FDF4',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 4,
    borderColor: '#059669'
  },
  recetaIconDecor1: {
    position: 'absolute',
    top: -10,
    right: -10,
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#FDE68A',
    opacity: 0.6
  },
  recetaIconDecor2: {
    position: 'absolute',
    bottom: -5,
    left: -15,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#BFDBFE',
    opacity: 0.6
  },
  recetaTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 8
  },
  recetaSubtitle: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 20,
    paddingHorizontal: 20
  },
  recetaProductCard: {
    backgroundColor: '#F9FAFB',
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E7EB'
  },
  recetaProductInfo: {
    flex: 1
  },
  recetaProductLabel: {
    fontSize: 11,
    color: '#6B7280',
    marginBottom: 4
  },
  recetaProductName: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 2
  },
  recetaProductGeneric: {
    fontSize: 12,
    color: '#6B7280',
    fontStyle: 'italic'
  },
  recetaProductPrice: {
    alignItems: 'flex-end'
  },
  recetaPriceLabel: {
    fontSize: 11,
    color: '#6B7280',
    marginBottom: 4
  },
  recetaPriceValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#059669'
  },
  recetaStepsContainer: {
    marginBottom: 24
  },
  recetaStepsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 16
  },
  recetaStep: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12
  },
  recetaStepIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#EFF6FF',
    justifyContent: 'center',
    alignItems: 'center'
  },
  recetaStepIconText: {
    fontSize: 22
  },
  recetaStepContent: {
    flex: 1,
    paddingTop: 4
  },
  recetaStepTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 2
  },
  recetaStepDesc: {
    fontSize: 12,
    color: '#6B7280',
    lineHeight: 18
  },
  recetaStepConnector: {
    width: 2,
    height: 20,
    backgroundColor: '#E5E7EB',
    marginLeft: 21,
    marginVertical: 4
  },
  recetaUploadTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 16
  },
  recetaBtnCamara: {
    flexDirection: 'row',
    backgroundColor: '#059669',
    padding: 16,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
    elevation: 3
  },
  recetaBtnGaleria: {
    flexDirection: 'row',
    backgroundColor: '#3B82F6',
    padding: 16,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
    elevation: 3
  },
  recetaBtnLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    gap: 12
  },
  recetaBtnIconCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center'
  },
  recetaBtnTextContainer: {
    flex: 1
  },
  recetaBtnTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 2
  },
  recetaBtnDesc: {
    color: 'rgba(255,255,255,0.85)',
    fontSize: 12
  },
  recetaBtnArrow: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: 'bold'
  },
  recetaSuccessHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 16
  },
  recetaSuccessIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#D1FAE5',
    justifyContent: 'center',
    alignItems: 'center'
  },
  recetaSuccessTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#059669'
  },
  recetaPreviewContainer: {
    height: 280,
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 16,
    position: 'relative',
    backgroundColor: '#F3F4F6',
    borderWidth: 2,
    borderColor: '#059669'
  },
  recetaPreviewImage: {
    width: '100%',
    height: '100%'
  },
  recetaPreviewBadge: {
    position: 'absolute',
    top: 12,
    left: 12,
    backgroundColor: '#059669',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8
  },
  recetaPreviewBadgeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: 'bold'
  },
  recetaRemoveBtn: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: '#EF4444',
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4
  },
  recetaRemoveText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold'
  },
  recetaTipsBox: {
    backgroundColor: '#FEF3C7',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#FDE68A'
  },
  recetaTipsTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#92400E',
    marginBottom: 10
  },
  recetaTip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 6
  },
  recetaTipIcon: {
    color: '#059669',
    fontSize: 14,
    fontWeight: 'bold'
  },
  recetaTipText: {
    fontSize: 13,
    color: '#78350F'
  },
  recetaConfirmBtn: {
    backgroundColor: '#059669',
    paddingVertical: 18,
    borderRadius: 16,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
    elevation: 4
  },
  recetaConfirmIcon: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold'
  },
  recetaConfirmText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold'
  }
});
