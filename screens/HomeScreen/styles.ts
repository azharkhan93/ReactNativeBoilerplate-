import { StyleSheet } from 'react-native';

export const homeStyles = {
  container: 'flex-1 bg-[#F1F6FD]',
  scrollContainer: 'flex-1',
  categorySection: 'px-5 pt-6',
  categoryHeader: 'mb-4 font-bold text-slate-900',
  recentlyAddedSection: 'mt-4',
  newArrivalsSection: 'mt-4',
  flashSaleSection: 'mt-8',
  bestSellersSection: 'mt-4',
  categoryListContent: StyleSheet.create({
    content: {
      gap: 16,
      paddingRight: 20,
    },
  }).content,
};
