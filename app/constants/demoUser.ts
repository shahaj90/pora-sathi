export interface DemoUser {
  name: string;
  email: string;
  password: string;
  grades: string[];
}

/** Demo account shown on the login screen. Replace with API auth once backend lands. */
export const DEMO_USER: DemoUser = {
  name: 'Demo Student',
  email: 'demo@porasathi.com',
  password: 'demo1234',
  grades: ['Class 10'],
};
