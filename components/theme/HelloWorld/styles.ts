import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const cn = (...inputs: (string | undefined | null | boolean)[]) => {
  return twMerge(clsx(inputs));
};

export const helloWorldStyles = {
  container: 'p-6 rounded-3xl bg-white border border-slate-100/80 shadow-md items-center justify-center',
  title: 'text-h3 font-heading-semibold text-primary-500 mb-1.5 text-center uppercase tracking-wider',
  subtitle: 'text-body-sm font-body text-slate-400 mb-5 text-center leading-relaxed max-w-[280px]',
  badgeContainer: 'flex-row flex-wrap justify-center gap-2 mb-5',
  badge: 'px-4 py-2 rounded-full border border-slate-100 bg-slate-50/50 active:bg-slate-100/80 flex-row items-center justify-center shadow-sm',
  badgeActive: 'border-primary-300 bg-primary-50/50 shadow-sm shadow-primary-200/20',
  badgeText: 'text-body-sm font-body text-slate-600',
  badgeTextActive: 'text-primary-600 font-body-semibold',
  interactiveCard: 'w-full bg-slate-50/30 rounded-2xl p-5 border border-slate-100/60 items-center justify-center',
  translationText: 'text-h3 font-heading-semibold text-slate-800 mb-0.5 text-center',
  translationLabel: 'text-body-sm font-body text-slate-400 text-center uppercase tracking-wider text-[11px]',
};
