export const vehicleScanStyles = {
  modalContainer: 'flex-1 bg-[#F1F6FD] justify-between',
  safeArea: 'flex-1 justify-between',

  // Top Bar Controls
  headerRow:
    'flex-row items-center justify-between px-5 pt-3 pb-3 bg-white/90 border-b border-blue-100/60 shadow-sm z-30',
  closeButton:
    'w-10 h-10 rounded-full bg-blue-50 border border-blue-100 items-center justify-center',
  torchButton:
    'w-10 h-10 rounded-full bg-blue-50 border border-blue-100 items-center justify-center',
  torchButtonActive:
    'w-10 h-10 rounded-full bg-amber-500 items-center justify-center shadow-md shadow-amber-500/30',

  // Scanner View Body
  scannerBody: 'flex-1 items-center justify-center relative px-5',

  // Low Light / Retake Toast Warning
  warningToast:
    'absolute top-16 left-5 right-5 z-40 flex-row items-center gap-3 p-3.5 bg-amber-50 border border-amber-200 rounded-2xl shadow-md',
  warningTextCol: 'flex-1 gap-0.5',
  warningTitle: 'text-amber-800 font-heading-semibold text-xs uppercase tracking-wider',
  warningSubtitle: 'text-amber-700 font-body-medium text-xs',

  // Step Progress Pill Bar
  stepBar: 'flex-row items-center justify-center gap-2 mb-6 z-30',
  stepPill: 'h-1.5 rounded-full bg-blue-200/60 w-10',
  stepPillActive: 'h-1.5 rounded-full bg-blue-600 w-14',
  stepPillCompleted: 'h-1.5 rounded-full bg-emerald-500 w-10',

  // Bottom Sheet Container
  resultsSheetContainer:
    'w-full max-h-[88%] bg-white border border-blue-100/80 rounded-3xl p-5 shadow-2xl z-50 my-auto',
};
