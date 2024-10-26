'use client';

import Box from '@mui/material/Box';
import { ReactElement } from 'react';

interface Props {
  children: ReactElement;
}

const AuthWrapper = ({ children }: Props) => (
  <Box className='flex flex-row h-screen w-screen'>
    <Box className='h-full bg-login-img'></Box>
    {children}
  </Box>
);

export default AuthWrapper;
