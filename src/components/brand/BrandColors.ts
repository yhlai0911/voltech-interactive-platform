export const BRAND = {
  primary: '#1B3A5C',
  accent: '#D4A843',
  bg: '#F8F7F4',
  text: '#1a1a1a',
  story: '#2D7D5E',
  danger: '#C0392B',
  neutral: '#6B7280',
} as const;

export const CHARACTERS = {
  drLin: { name: 'Dr. Lin', role: 'Professor', color: '#1B3A5C' },
  alex: { name: 'Alex Chen', role: 'Junior Analyst', color: '#2D7D5E' },
  kenji: { name: 'Kenji', role: 'Risk Manager', color: '#C0392B' },
  priya: { name: 'Priya', role: 'Data Scientist', color: '#8E44AD' },
  david: { name: 'David', role: 'Senior Officer', color: '#E67E22' },
  narrator: { name: 'Narrator', role: '', color: '#6B7280' },
} as const;

export type CharacterId = keyof typeof CHARACTERS;

// 角色名稱（用於課堂模式顯示）
export const CHARACTER_NAMES: Record<string, string> = {
  drLin: 'Dr. Lin',
  alex: 'Alex Chen',
  kenji: 'Kenji Tanaka',
  priya: 'Priya Sharma',
  david: 'David Park',
  narrator: 'Narrator',
};

// 角色職稱
export const CHARACTER_ROLES: Record<string, string> = {
  drLin: 'Professor',
  alex: 'Junior Analyst',
  kenji: 'Risk Manager',
  priya: 'Data Scientist',
  david: 'Senior Officer',
  narrator: '',
};

// 角色專屬色
export const CHARACTER_COLORS: Record<string, string> = {
  drLin: '#1B3A5C',
  alex: '#2D7D5E',
  kenji: '#C0392B',
  priya: '#8E44AD',
  david: '#E67E22',
  narrator: '#6B7280',
};
