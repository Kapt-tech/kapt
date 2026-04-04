"use client";

import React, { createContext, useContext, useState } from 'react';
import { OTPModal } from '@/components/OTPModal';
import { SelfieCapture } from '@/components/SelfieCapture';

interface AuthContextType {
  openAuth: () => void;
  closeAuth: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isOTPOpen, setIsOTPOpen] = useState(false);
  const [isSelfieCaptureOpen, setIsSelfieCaptureOpen] = useState(false);

  const handleAuthSuccess = (token: string) => {
    // Only access localStorage on client side
    if (typeof window !== 'undefined') {
      localStorage.setItem('kapt_token', token);
    }
    setIsOTPOpen(false);
    setIsSelfieCaptureOpen(true);
  };

  return (
    <AuthContext.Provider value={{ 
      openAuth: () => setIsOTPOpen(true), 
      closeAuth: () => { setIsOTPOpen(false); setIsSelfieCaptureOpen(false); } 
    }}>
      {children}
      <OTPModal 
        isOpen={isOTPOpen} 
        onClose={() => setIsOTPOpen(false)} 
        onSuccess={handleAuthSuccess} 
      />
      <SelfieCapture 
        isOpen={isSelfieCaptureOpen} 
        onClose={() => setIsSelfieCaptureOpen(false)} 
        onSuccess={() => setIsSelfieCaptureOpen(false)} 
      />
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
