export interface User {
  phone: string;
  name: string;
}

export interface Card {
  id?: number;
  name: string;
  bank?: string;
  userId?: string;
  number: string;
  expires: string;
}