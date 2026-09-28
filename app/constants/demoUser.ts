export interface DemoUser {
  name: string;
  email: string;
  password: string;
  grades: string[];
  avatar?: string;
  phone?: string;
  teacher?: string;
}

/** Demo account shown on the login screen. Replace with API auth once backend lands. */
export const DEMO_USER: DemoUser = {
  name: 'Demo Student',
  email: 'demo@porasathi.com',
  password: 'demo1234',
  grades: ['Class 10'],
  avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&h=200&fit=crop',
  phone: '01712-345678',
  teacher: 'Kamal Sir',
};
