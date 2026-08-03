export const analysisResultStyles = {
  container: 'w-full gap-4',

  // Header Title Row
  headerRow: 'flex-row items-center justify-between pb-3 border-b border-slate-200/80',
  titleCol: 'gap-0.5',
  titleText: 'text-slate-900 font-heading-bold text-lg',
  vehicleSubtext: 'text-slate-500 font-body-medium text-xs',

  // Overall Condition Score Badge
  scoreBox: 'items-end gap-0.5',
  scoreValue: 'text-2xl font-heading-bold text-blue-600',
  scoreLabel: 'text-slate-400 text-[10px] uppercase font-mono tracking-wider',

  // Conditions Section
  sectionLabel: 'text-slate-700 font-heading-semibold text-xs uppercase tracking-wider mt-1 mb-2',
  conditionsList: 'gap-2 mb-2',
  conditionItem: 'p-3.5 rounded-2xl bg-blue-50/40 border border-blue-100/60 gap-1 shadow-sm',
  conditionRow: 'flex-row items-center justify-between',
  conditionName: 'text-slate-900 font-heading-semibold text-sm',
  conditionBadgeSevere: 'px-2 py-0.5 rounded-md bg-rose-100 border border-rose-200',
  conditionBadgeModerate: 'px-2 py-0.5 rounded-md bg-amber-100 border border-amber-200',
  badgeTextSevere: 'text-rose-800 text-[10px] font-mono font-medium uppercase',
  badgeTextModerate: 'text-amber-800 text-[10px] font-mono font-medium uppercase',
  conditionSummary: 'text-slate-600 font-body-regular text-xs',

  // Recommendation Card Box
  recommendationBox:
    'p-4 rounded-2xl bg-blue-50/80 border border-blue-200/80 gap-2.5 my-1 shadow-sm',
  recHeaderRow: 'flex-row items-center gap-2',
  recTitle: 'text-blue-900 font-heading-semibold text-base',
  recReason: 'text-slate-700 font-body-regular text-xs leading-relaxed',
  priceRow: 'flex-row items-baseline gap-2 pt-1',
  discountPrice: 'text-xl font-heading-bold text-blue-600',
  originalPrice: 'text-sm font-body-regular text-slate-400 line-through',

  // Action Buttons - Equal 50/50 Width Alignment
  actionsRow: 'flex-row items-center gap-3 pt-3 pb-2 w-full',
  rescanButton:
    'flex-1 py-3.5 px-4 rounded-2xl bg-slate-100 border border-slate-200 items-center justify-center active:bg-slate-200',
  rescanText: 'text-slate-700 font-heading-semibold text-sm',
  bookButtonWrapper: 'flex-1',
};
