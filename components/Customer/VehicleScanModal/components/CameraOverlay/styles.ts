export const cameraOverlayStyles = {
  container: 'w-full flex-1 items-center justify-center relative',

  // Target reticle box
  reticleBox:
    'w-72 h-72 border-2 border-blue-500 rounded-3xl relative items-center justify-center overflow-hidden bg-white/70 shadow-sm border-dashed',

  // Corner indicators
  cornerTL: 'absolute top-0 left-0 w-6 h-6 border-t-4 border-l-4 border-blue-600 rounded-tl-xl',
  cornerTR: 'absolute top-0 right-0 w-6 h-6 border-t-4 border-r-4 border-blue-600 rounded-tr-xl',
  cornerBL: 'absolute bottom-0 left-0 w-6 h-6 border-b-4 border-l-4 border-blue-600 rounded-bl-xl',
  cornerBR: 'absolute bottom-0 right-0 w-6 h-6 border-b-4 border-r-4 border-blue-600 rounded-br-xl',

  // YOLO detection status badge
  yoloBadge:
    'absolute top-4 px-3 py-1 bg-emerald-50 border border-emerald-200 rounded-full flex-row items-center gap-1.5 shadow-sm',
  yoloText: 'text-emerald-700 text-xs font-mono font-semibold',

  // Scanning laser beam
  laserBeam: 'w-full h-1 bg-blue-500 shadow-md shadow-blue-500/50',

  // Guidance card bottom
  guidanceBox:
    'mt-6 px-6 py-3.5 bg-white border border-blue-100/80 rounded-2xl items-center gap-1 max-w-[320px] shadow-sm',
  guidanceTitle: 'text-slate-900 font-heading-semibold text-sm text-center',
  guidanceSubtitle: 'text-slate-500 font-body-regular text-xs text-center',

  // Permission Warning Banner
  permissionBox:
    'mt-4 px-4 py-3 bg-amber-50 border border-amber-200/80 rounded-2xl items-center gap-1 max-w-[320px]',
  permissionTitle: 'text-amber-800 font-heading-semibold text-xs text-center',
  permissionSubtitle: 'text-amber-700 font-body-regular text-[11px] text-center',

  // Triggers Row
  triggersRow: 'mt-6 flex-row items-center gap-4',
  galleryButton:
    'w-12 h-12 rounded-full bg-white border border-blue-100/80 items-center justify-center shadow-sm',
  captureButtonOuter:
    'w-20 h-20 rounded-full border-4 border-blue-200 items-center justify-center active:scale-95 transition-transform',
  captureButtonInner:
    'w-14 h-14 rounded-full bg-blue-600 items-center justify-center shadow-lg shadow-blue-500/30',
};
