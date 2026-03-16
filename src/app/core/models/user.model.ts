export interface User {
  id: string;
  email: string;
  name: string;
  photoUrl?: string;
  role: 'admin' | 'user';
  createdAt?: Date;
}

export interface AuthResponse {
  user: User;
  token: string;
  refreshToken: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}
