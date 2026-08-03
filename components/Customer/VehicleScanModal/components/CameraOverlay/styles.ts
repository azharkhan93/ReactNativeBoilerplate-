export const cameraOverlayStyles = {
  container: 'w-full flex-1 items-center justify-center relative',

  // Target reticle box
  reticleBox:
    'w-72 h-72 border-2 border-blue-400/80 rounded-3xl relative items-center justify-center overflow-hidden bg-blue-500/5',

  // Corner indicators
  cornerTL: 'absolute top-0 left-0 w-6 h-6 border-t-4 border-l-4 border-blue-500 rounded-tl-xl',
  cornerTR: 'absolute top-0 right-0 w-6 h-6 border-t-4 border-r-4 border-blue-500 rounded-tr-xl',
  cornerBL: 'absolute bottom-0 left-0 w-6 h-6 border-b-4 border-l-4 border-blue-500 rounded-bl-xl',
  cornerBR: 'absolute bottom-0 right-0 w-6 h-6 border-b-4 border-r-4 border-blue-500 rounded-br-xl',

  // YOLO detection status badge
  yoloBadge:
    'absolute top-4 px-3 py-1 bg-emerald-950/80 border border-emerald-500/50 rounded-full flex-row items-center gap-1.5',
  yoloText: 'text-emerald-400 text-xs font-mono font-medium',

  // Scanning laser beam
  laserBeam: 'w-full h-1 bg-blue-400 shadow-lg shadow-blue-400',

  // Guidance card bottom
  guidanceBox: 'mt-8 px-6 py-3.5 bg-slate-900/90 border border-slate-800 rounded-2xl items-center gap-1 max-w-[320px]',
  guidanceTitle: 'text-white font-heading-semibold text-sm text-center',
  guidanceSubtitle: 'text-slate-400 font-body-regular text-xs text-center',

  // Capture Button Trigger
  captureButtonOuter:
    'mt-6 w-20 h-20 rounded-full border-4 border-white/80 items-center justify-center active:scale-95 transition-transform',
  captureButtonInner: 'w-14 h-14 rounded-full bg-blue-600 items-center justify-center shadow-lg shadow-blue-500/40',
};
