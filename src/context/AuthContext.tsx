import React, { createContext, useContext, useState, useEffect } from 'react';
import type { AuthContextType, User } from '../types';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is stored in localStorage and token exists
    const storedUser = localStorage.getItem('tamsu_user');
    const token = localStorage.getItem('token');
    if (storedUser && token) {
      try {
        const userData = JSON.parse(storedUser);
        if (userData && userData.fullName) {
          setUser(userData);
        }
      } catch (error) {
        console.error('Error parsing stored user data:', error);
        localStorage.removeItem('tamsu_user');
        localStorage.removeItem('token');
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (usernameOrEmail: string, password: string): Promise<{ success: boolean; error?: string }> => {
    try {
      const response = await fetch('https://mine.orbitmap.cloud/api/v1/authentication', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          usernameOrEmail,
          password,
        }),
      });

      const result = await response.json();

      if (response.ok && result.status === 200) {
        // Save token to localStorage
        localStorage.setItem('token', result.data.token);

        // Create user object with only fullName for context
        const userData = {
          fullName: result.data.fullName,
          role: result.data.role
        };

        setUser(userData);
        localStorage.setItem('tamsu_user', JSON.stringify(userData));

        return { success: true };
      } else {
        return { success: false, error: 'Tài khoản hoặc mật khẩu không chính xác' };
      }
    } catch (error) {
      return { success: false, error: 'Có lỗi xảy ra, vui lòng thử lại' };
    }
  }; const register = async (userData: Omit<User, 'id' | 'createdAt' | 'role'>): Promise<{ success: boolean; data?: User; error?: string }> => {
    try {
      const response = await fetch('https://mine.orbitmap.cloud/api/v1/accounts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      const result = await response.json();

      if (response.ok && result.status === 201) {
        const userWithoutPassword = { ...result.data };
        delete userWithoutPassword.password;

        setUser(userWithoutPassword);
        localStorage.setItem('tamsu_user', JSON.stringify(userWithoutPassword));

        return { success: true, data: userWithoutPassword };
      } else {
        return { success: false, error: result.message || 'Đăng ký thất bại' };
      }
    } catch (error) {
      return { success: false, error: 'Có lỗi xảy ra, vui lòng thử lại' };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('tamsu_user');
    localStorage.removeItem('token');
  };

  const value = {
    user,
    login,
    register,
    logout,
    isAuthenticated: !!user,
    isLoading
  }; return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};