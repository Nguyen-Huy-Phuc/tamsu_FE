export interface User {
  id: string;
  username: string;
  email: string;
  phone: string;
  password: string;
  createdAt: string;
}

export interface ConsultationPackage {
  id: string;
  name: string;
  price: number;
  duration: number; // in minutes
  description: string;
  features: string[];
  type: 'basic' | 'advanced';
}

export interface Feedback {
  id: string;
  userId: string;
  userName: string;
  packageId: string;
  rating: number; // 1-5
  comment: string;
  createdAt: string;
}

export interface Purchase {
  id: string;
  userId: string;
  packageId: string;
  status: 'pending' | 'completed' | 'cancelled';
  createdAt: string;
  zaloLink?: string;
}

export interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => Promise<boolean>;
  register: (userData: Omit<User, 'id' | 'createdAt'>) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
}