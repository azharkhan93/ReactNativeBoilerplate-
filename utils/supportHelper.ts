import { FAQ } from '@/data/mockSupport';


export const filterFaqs = (faqs: FAQ[], search: string = '', category: string = 'All') => {
  const query = search.toLowerCase();
  return faqs.filter(f => 
    (f.question.toLowerCase().includes(query) || f.answer.toLowerCase().includes(query)) &&
    (category === 'All' || f.category === category)
  );
};
