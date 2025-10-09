export interface User {
  id?: string;
  username?: string;
  email?: string;
  fullName: string;
  birthday?: string;
  gender?: 'Male' | 'Female';
  password?: string;
  role?: string;
  createdAt?: string;
}

export interface Blog {
  id: string;
  title: string;
  shortDescription: string;
  content: string | null;
  imageUrl: string;
  createdAt: string;
  lastModifiedAt: string | null;
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
  login: (usernameOrEmail: string, password: string) => Promise<{ success: boolean; error?: string }>;
  register: (userData: Omit<User, 'id' | 'createdAt' | 'role'>) => Promise<{ success: boolean; data?: User; error?: string }>;
  logout: () => void;
  isAuthenticated: boolean;
  isLoading: boolean;
}