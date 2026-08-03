export const vehicleScanStyles = {
  modalContainer: 'flex-1 bg-black/95 justify-between',
  safeArea: 'flex-1 justify-between',

  // Top Bar Controls
  headerRow: 'flex-row items-center justify-between px-5 pt-3 pb-2 z-30',
  closeButton: 'w-10 h-10 rounded-full bg-slate-800/80 items-center justify-center border border-slate-700/60',
  torchButton: 'w-10 h-10 rounded-full bg-slate-800/80 items-center justify-center border border-slate-700/60',
  torchButtonActive: 'w-10 h-10 rounded-full bg-amber-500 items-center justify-center shadow-lg shadow-amber-500/30',

  // Scanner View Body
  scannerBody: 'flex-1 items-center justify-center relative px-6',

  // Low Light / Retake Toast Warning
  warningToast:
    'absolute top-4 left-6 right-6 z-40 flex-row items-center gap-3 p-3.5 bg-amber-950/90 border border-amber-500/50 rounded-2xl shadow-lg shadow-amber-950/50',
  warningTextCol: 'flex-1 gap-0.5',
  warningTitle: 'text-amber-300 font-heading-semibold text-xs uppercase tracking-wider',
  warningSubtitle: 'text-amber-100 font-body-medium text-xs',

  // Step Progress Pill Bar
  stepBar: 'flex-row items-center justify-center gap-2 mb-6 z-30',
  stepPill: 'h-1.5 rounded-full bg-slate-700/60 w-10',
  stepPillActive: 'h-1.5 rounded-full bg-blue-500 w-14',
  stepPillCompleted: 'h-1.5 rounded-full bg-emerald-500 w-10',

  // Bottom Sheet Container
  resultsSheetContainer:
    'w-full max-h-[85%] bg-slate-900 border-t border-slate-800 rounded-t-3xl p-5 shadow-2xl z-50',
};
