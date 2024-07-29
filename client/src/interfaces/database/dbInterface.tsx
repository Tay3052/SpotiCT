export interface User {
  id: string;
  username: string;
  email: string;
  password?: string;
  age: number;
  createdAt: Date;
}
