export interface User {
  id?: number;
  name: string;
  email: string;
  location: string;
  photo?: string;
  password: string;
}

export interface LoginPayoad {
  email: string;
  password: string;
}

export interface LoginResponse {
  user: User;
  token: string;
}

export interface UserState extends LoginResponse {}
