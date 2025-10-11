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
  duration: string; // API returns string like "20 phút"
  description: string;
  createdAt: string | null;
  lastModifiedAt: string | null;
  // Computed fields for UI
  features?: string[]; // Parsed from description
  type?: 'basic' | 'advanced'; // Determined from name
  // API response includes reviews
  reviews?: Review[];
}

export interface Review {
  id: string;
  rating: number; // 1-5
  comment: string;
  createdAt: string;
  lastModifiedAt: string | null;
  user: {
    id: string;
    username: string;
    fullName: string;
  };
}

export interface ReviewSubmission {
  rating: number;
  comment: string;
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