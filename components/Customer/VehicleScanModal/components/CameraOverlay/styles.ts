export const cameraOverlayStyles = {
  container: 'w-full flex-1 items-center justify-center relative',

  // Target reticle box
  reticleBox:
    'w-72 h-72 border-2 border-blue-500/80 rounded-3xl relative items-center justify-center overflow-hidden bg-white/60 shadow-lg shadow-blue-500/10 border-dashed',

  // Corner indicators
  cornerTL:
    'absolute top-0 left-0 w-7 h-7 border-t-4 border-l-4 border-blue-600 rounded-tl-2xl z-20',
  cornerTR:
    'absolute top-0 right-0 w-7 h-7 border-t-4 border-r-4 border-blue-600 rounded-tr-2xl z-20',
  cornerBL:
    'absolute bottom-0 left-0 w-7 h-7 border-b-4 border-l-4 border-blue-600 rounded-bl-2xl z-20',
  cornerBR:
    'absolute bottom-0 right-0 w-7 h-7 border-b-4 border-r-4 border-blue-600 rounded-br-2xl z-20',

  // Tech HUD Grid Lines inside reticle
  hudGridCrosshairH: 'absolute w-full h-[1px] bg-blue-400/30 top-1/2 z-10',
  hudGridCrosshairV: 'absolute h-full w-[1px] bg-blue-400/30 left-1/2 z-10',

  // YOLO detection status badge
  yoloBadge:
    'absolute top-3 px-3 py-1 bg-emerald-50 border border-emerald-300 rounded-full flex-row items-center gap-1.5 shadow-sm z-30',
  yoloText: 'text-emerald-700 text-xs font-mono font-semibold',

  // Scanning laser beam & glowing tail sweep
  laserContainer: 'absolute left-0 right-0 z-20',
  laserBeam:
    'w-full h-1 bg-blue-600 shadow-lg shadow-blue-500 rounded-full border-t border-blue-400',
  laserGlowTail:
    'w-full h-10 bg-gradient-to-b from-blue-500/25 to-transparent -mt-10',

  // HUD Telemetry bottom badge inside reticle
  hudTelemetryBadge:
    'absolute bottom-3 px-2.5 py-1 bg-blue-900/90 rounded-md flex-row items-center gap-1.5 z-30 border border-blue-400/40',
  hudTelemetryText: 'text-blue-200 text-[10px] font-mono tracking-widest uppercase',

  // Guidance card bottom
  guidanceBox:
    'mt-5 px-6 py-3.5 bg-white border border-blue-100/80 rounded-2xl items-center gap-1 max-w-[320px] shadow-sm',
  guidanceTitle: 'text-slate-900 font-heading-semibold text-sm text-center',
  guidanceSubtitle: 'text-slate-500 font-body-regular text-xs text-center',

  // Permission Warning Banner
  permissionBox:
    'mt-4 px-4 py-3 bg-amber-50 border border-amber-200/80 rounded-2xl items-center gap-1 max-w-[320px]',
  permissionTitle: 'text-amber-800 font-heading-semibold text-xs text-center',
  permissionSubtitle: 'text-amber-700 font-body-regular text-[11px] text-center',

  // Triggers Row
  triggersRow: 'mt-6 flex-row items-center gap-5',
  galleryButton:
    'w-12 h-12 rounded-full bg-white border border-blue-100/80 items-center justify-center shadow-sm active:scale-95 transition-transform',
  captureButtonOuter:
    'w-20 h-20 rounded-full border-4 border-blue-200/90 items-center justify-center active:scale-95 transition-transform shadow-md shadow-blue-500/10',
  captureButtonInner:
    'w-14 h-14 rounded-full bg-blue-600 items-center justify-center shadow-lg shadow-blue-500/30',
};
