'use client';

import AuthWrapper from '@/app/(auth)/login/auth-wrapper';
import LoginComponent from '@/app/(auth)/login/components/login';

const LoginPage = () => {
  return (
    <AuthWrapper>
      <LoginComponent />
    </AuthWrapper>
  );
};

export default LoginPage;
