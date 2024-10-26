'use client';
import AuthWrapper from '@/app/(auth)/login/auth-wrapper';
import LoginComponent from '@/app/(auth)/login/components/login';
import { signOut } from 'next-auth/react';
import { useEffect } from 'react';

const LoginPage = () => {
  useEffect(() => {
    signOut({ redirect: false });
    localStorage.removeItem('accessToken');
    localStorage.removeItem('nextauth.message');
  }, []);
  return (
    <AuthWrapper>
      <LoginComponent />
    </AuthWrapper>
  );
};

export default LoginPage;
