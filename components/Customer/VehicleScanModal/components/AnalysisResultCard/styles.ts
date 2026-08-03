export const analysisResultStyles = {
  container: 'w-full gap-4',

  // Header Title Row
  headerRow: 'flex-row items-center justify-between pb-3 border-b border-slate-800',
  titleCol: 'gap-0.5',
  titleText: 'text-white font-heading-semibold text-lg',
  vehicleSubtext: 'text-slate-400 font-body-medium text-xs',

  // Overall Condition Score Badge
  scoreBox: 'items-end gap-0.5',
  scoreValue: 'text-2xl font-heading-bold text-amber-400',
  scoreLabel: 'text-slate-400 text-[10px] uppercase font-mono tracking-wider',

  // Conditions Section
  sectionLabel: 'text-slate-300 font-heading-medium text-xs uppercase tracking-wider mt-1 mb-2',
  conditionsList: 'gap-2 mb-2',
  conditionItem: 'p-3 rounded-xl bg-slate-800/80 border border-slate-700/60 gap-1',
  conditionRow: 'flex-row items-center justify-between',
  conditionName: 'text-white font-heading-semibold text-sm',
  conditionBadgeSevere: 'px-2 py-0.5 rounded-md bg-rose-950/80 border border-rose-500/50',
  conditionBadgeModerate: 'px-2 py-0.5 rounded-md bg-amber-950/80 border border-amber-500/50',
  badgeTextSevere: 'text-rose-300 text-[10px] font-mono font-medium uppercase',
  badgeTextModerate: 'text-amber-300 text-[10px] font-mono font-medium uppercase',
  conditionSummary: 'text-slate-400 font-body-regular text-xs',

  // Recommendation Card Box
  recommendationBox:
    'p-4 rounded-2xl bg-blue-950/40 border border-blue-500/40 gap-2.5 my-1',
  recHeaderRow: 'flex-row items-center gap-2',
  recTitle: 'text-blue-300 font-heading-semibold text-base',
  recReason: 'text-slate-300 font-body-regular text-xs leading-relaxed',
  priceRow: 'flex-row items-baseline gap-2 pt-1',
  discountPrice: 'text-xl font-heading-bold text-white',
  originalPrice: 'text-sm font-body-regular text-slate-500 line-through',

  // Action Buttons
  actionsRow: 'flex-row items-center gap-3 pt-2',
  rescanButton:
    'py-3.5 px-4 rounded-2xl bg-slate-800 border border-slate-700 items-center justify-center',
  rescanText: 'text-slate-300 font-heading-medium text-sm',
};
