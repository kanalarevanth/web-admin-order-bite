export interface Restaurant {
  id?: string;
  name?: string;
  updatedAt?: string;
}

export interface User {
  id?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  updatedAt?: string;
  restaurant?: Restaurant;
}

export interface AuthContextType {
  user: User;
  setUser: (user: User) => void;
  setToken: (token: string) => void;
  token: string;
  isAuthenticated: boolean;
}

export interface MenuItem {
  id?: string;
  name: string;
  description?: string;
  price: number;
  category: string;
  availability?: boolean;
  type: string;
  image?: File;
}

export interface IRestaurant {
  name: string;
  address: string;
}
