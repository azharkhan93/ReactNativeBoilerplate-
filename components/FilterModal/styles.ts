import { StyleSheet } from 'react-native';

export const filterModalStyles = {
  container: 'pt-2 pb-6 px-1',
  sectionTitle: 'text-sm font-bold text-slate-700 uppercase tracking-wider mb-3 ml-1',
  categoryScrollContent: StyleSheet.create({
    content: {
      gap: 10,
      paddingVertical: 4,
    },
  }).content,
  chipBase: 'px-4 py-2.5 rounded-2xl flex-row items-center border',
  chipSelected: 'bg-primary-500 border-primary-500 shadow-sm shadow-primary-500/30',
  chipDefault: 'bg-slate-50 border-slate-200',
  chipTextSelected: 'text-white font-body-bold text-xs',
  chipTextDefault: 'text-slate-700 font-body-medium text-xs',
  checkIcon: 'mr-1.5',
  gridContainer: 'flex-row flex-wrap gap-2.5',
  sortList: 'space-y-2',
  sortOption: 'flex-row items-center justify-between p-3.5 rounded-2xl border',
  sortOptionSelected: 'bg-primary-50 border-primary-300',
  sortOptionDefault: 'bg-white border-slate-200',
  sortOptionContent: 'flex-row items-center gap-3',
  sortIconWrapper: 'p-2 rounded-xl bg-slate-100',
  sortIconWrapperSelected: 'p-2 rounded-xl bg-primary-100',
  actionsRow: 'flex-row items-center gap-3 mt-8 pt-4 border-t border-slate-100',
  resetButton: 'flex-1',
  applyButton: 'flex-[2]',
};
