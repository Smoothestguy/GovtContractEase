import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface User {
  id: string;
  email: string;
  isEmailVerified?: boolean;
  twoFactorEnabled?: boolean;
  profile?: {
    fullName?: string;
    phoneNumber?: string;
    companyName?: string;
    position?: string;
    industry?: string;
    contractTypes?: string[];
  };
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  signInWithApple: () => Promise<void>;
  updateProfile: (profile: User['profile']) => Promise<void>;
  verifyEmail: (code: string) => Promise<void>;
  resendVerificationCode: (email: string) => Promise<void>;
  setupTwoFactor: (code: string) => Promise<void>;
  skipTwoFactor: () => Promise<void>;
  verifyTwoFactor: (code: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    try {
      const userString = await AsyncStorage.getItem('user');
      if (userString) {
        setUser(JSON.parse(userString));
      }
    } catch (error) {
      console.error('Error loading user:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const verifyEmail = async (code: string) => {
    try {
      // TODO: Implement actual email verification
      if (code === '000000') {
        const updatedUser = {
          ...user!,
          isEmailVerified: true,
        };
        await AsyncStorage.setItem('user', JSON.stringify(updatedUser));
        setUser(updatedUser);
      } else {
        throw new Error('Invalid code');
      }
    } catch (error) {
      console.error('Error verifying email:', error);
      throw error;
    }
  };

  const resendVerificationCode = async (email: string) => {
    try {
      // TODO: Implement actual code resend
      await new Promise(resolve => setTimeout(resolve, 1000));
    } catch (error) {
      console.error('Error resending code:', error);
      throw error;
    }
  };

  const setupTwoFactor = async (code: string) => {
    try {
      // TODO: Implement actual 2FA setup
      if (code === '000000') {
        const updatedUser = {
          ...user!,
          twoFactorEnabled: true,
        };
        await AsyncStorage.setItem('user', JSON.stringify(updatedUser));
        setUser(updatedUser);
      } else {
        throw new Error('Invalid code');
      }
    } catch (error) {
      console.error('Error setting up 2FA:', error);
      throw error;
    }
  };

  const skipTwoFactor = async () => {
    try {
      const updatedUser = {
        ...user!,
        twoFactorEnabled: false,
      };
      await AsyncStorage.setItem('user', JSON.stringify(updatedUser));
      setUser(updatedUser);
    } catch (error) {
      console.error('Error skipping 2FA:', error);
      throw error;
    }
  };

  const verifyTwoFactor = async (code: string) => {
    try {
      // TODO: Implement actual 2FA verification
      if (code !== '000000') {
        throw new Error('Invalid code');
      }
    } catch (error) {
      console.error('Error verifying 2FA:', error);
      throw error;
    }
  };

  // ... rest of the existing methods ...

  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        isLoading,
        signIn,
        signUp,
        signOut,
        resetPassword,
        signInWithGoogle,
        signInWithApple,
        updateProfile,
        verifyEmail,
        resendVerificationCode,
        setupTwoFactor,
        skipTwoFactor,
        verifyTwoFactor,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};