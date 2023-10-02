import { Item } from 'components/input/filter-select';
export type EmojiItem = Item & { emoji: string };

export const postKinds = [
  { value: 'research', label: 'Výzkum' },
  { value: 'essay', label: 'Esej' },
  { value: 'collection', label: 'Kolekce' },
  { value: 'review', label: 'Recenze' },
  { value: 'reflection', label: 'Reflexe' },
  { value: 'tutorial', label: 'Návod' },
  { value: 'interview', label: 'Rozhovor' },
  { value: 'infographics', label: 'Infografika' },
  { value: 'creative', label: 'Kreativní psaní' },
];

export const profilations: EmojiItem[] = [
  { value: 'design', label: 'Design', emoji: '🎨' },
  { value: 'analytics', label: 'Analytika', emoji: '📊' },
  { value: 'edtech', label: 'EdTech', emoji: '👩‍🏫' },
  { value: 'librarianship', label: 'Knihovnictví', emoji: '📚' },
];

export const languages: EmojiItem[] = [
  { value: 'cs', label: 'Čeština', emoji: '🇨🇿' },
  { value: 'sk', label: 'Slovenština', emoji: '🇸🇰' },
  { value: 'en', label: 'Angličtina', emoji: '🇬🇧' },
  { value: 'de', label: 'Němčina', emoji: '🇩🇪' },
  { value: 'jp', label: 'Japonština', emoji: '🇯🇵' },
];
