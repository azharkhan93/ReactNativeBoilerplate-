export const appSkeletonStyles = {
  // ─── Root ───────────────────────────────────────────────────────────────────
  root: 'flex-1 bg-[#EEF4FF]',

  // ─── Header — mirrors real TopBar padding exactly ────────────────────────────
  header: 'bg-white border-b border-[#D6E4FF] pt-12 pb-4 px-5',
  topRow: 'flex-row items-center justify-between mb-4',
  locationBox: 'flex-row items-center gap-3',
  locationIcon: 'w-9 h-9 rounded-2xl bg-[#DBEAFE] animate-pulse',
  locationTextCol: 'gap-2',
  locationLabel: 'w-24 h-3 rounded-full bg-[#BFDBFE] animate-pulse',
  locationTitle: 'w-40 h-4 rounded-full bg-[#93C5FD] animate-pulse',
  avatarCircle: 'w-10 h-10 rounded-full bg-[#DBEAFE] border border-[#BFDBFE] animate-pulse',
  searchRow: 'flex-row items-center gap-3',
  searchBar: 'flex-1 h-12 rounded-2xl bg-[#EEF4FF] border border-[#DBEAFE] animate-pulse',
  filterButton: 'w-12 h-12 rounded-2xl bg-[#DBEAFE] border border-[#BFDBFE] animate-pulse',

  // ─── Body — same px-5 as header ──────────────────────────────────────────────
  content: 'flex-1 px-5 pt-5 gap-6',

  // Hero banner — full width within px-5 container
  heroBanner: 'w-full h-44 rounded-3xl bg-[#DBEAFE] border border-[#BFDBFE] animate-pulse',

  // Section title
  sectionTitle: 'w-44 h-5 rounded-full bg-[#BFDBFE] animate-pulse mb-3',

  // Categories row — same horizontal extent as rest of body
  categoriesRow: 'flex-row items-center gap-3',
  categoryPill: 'flex-1 h-16 rounded-2xl bg-white border border-[#DBEAFE] shadow-sm animate-pulse',

  // Cards row
  cardRow: 'flex-row gap-4',
  cardItem: 'flex-1 rounded-3xl bg-white border border-[#DBEAFE] shadow-sm p-3.5 gap-3',
  cardImage: 'w-full h-24 rounded-2xl bg-[#DBEAFE] animate-pulse',
  cardTitle: 'w-3/4 h-4 rounded-full bg-[#BFDBFE] animate-pulse',
  cardSub: 'w-1/2 h-3 rounded-full bg-[#DBEAFE] animate-pulse',
};
