'use client';
import CloseIcon from '@mui/icons-material/Close';
import PersonOutline from '@mui/icons-material/PersonOutline';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useRouter } from 'next/navigation';

import TesakLogo from '@/app/product/[productId]/components/TesakLogo';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import Divider from '@mui/material/Divider';
import FormControlLabel from '@mui/material/FormControlLabel';
import Grid from '@mui/material/Grid2';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import useTheme from '@mui/material/styles/useTheme';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';
import { signIn } from 'next-auth/react';
import React, { FormEvent, useState } from 'react';

export default function LoginComponent() {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('md'));
  const [collapsed, setCollapsed] = useState(false);
  const [showPassword, setShowPassword] = React.useState(false);
  const router = useRouter();

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault();
  };

  async function handleLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const username = formData.get('username');
    const password = formData.get('password');
    const auth = await signIn('login', {
      redirect: false,
      username: username,
      password: password,
    });

    if (auth?.status === 200) {
      setCollapsed(false);
      router.push('/admin');
    } else {
      setCollapsed(true);
    }
  }
  return (
    <Box className='h-full w-full'>
      <Box
        className='main-login'
        sx={{
          justifyContent: 'center',
          alignItems: 'center',
          padding: '0px 16px',
          minHeight: '500px',
          overflowY: 'scroll',
          height: 'calc(100vh - 400px)',
          marginTop: '16px',
        }}
      >
        <Box className='login-box'>
          {matches ? (
            <Box className='w-[160px] h-[160px]'></Box>
          ) : (
            <Box className='w-[80px] h-[80px]'></Box>
          )}
          <TesakLogo width='80px' />
          <Typography
            sx={{
              fontSize: '24px',
              color: '#344054',
              fontWeight: '700',
              margin: '0px',
              lineHeight: '48px',
            }}
          >
            Tesak Kaset Intelligece
          </Typography>
          <Typography
            sx={{
              fontSize: '18px',
              color: '#667085',
              fontWeight: '400',
              margin: '0px',
              marginBottom: '16px',
            }}
          >
            ยินดีต้อนรับ
          </Typography>
          {collapsed && (
            <Alert
              sx={{
                textAlign: 'left',
                borderRadius: '0px',
                border: '0px',
                borderLeft: '4px solid #C2281D',
                padding: '8px',
                margin: '16px 0px',
                background: '#F8E5E5',
              }}
              variant='filled'
              icon={
                <CloseIcon
                  sx={{
                    borderRadius: '50%',
                    border: '1px solid #C2281D',
                    background: '#C2281D',
                  }}
                />
              }
            >
              <Box sx={{ color: '#C2281D', fontWeight: 600 }}>
                ชื่อผู้ใช้งานหรือรหัสผ่านไม่ถูกต้อง
              </Box>
              <Box sx={{ color: '#344054' }}>
                กรุณาตรวจสอบรายละเอียด และระบุอีกครั้ง
              </Box>
            </Alert>
          )}
          <form onSubmit={handleLogin}>
            <Typography sx={{ textAlign: 'left', color: '#344054' }}>
              ชื่อผู้ใช้
            </Typography>
            <TextField
              fullWidth
              size='small'
              name='username'
              type='email'
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position='start'>
                      <PersonOutline sx={{ color: '#344054' }} />
                    </InputAdornment>
                  ),
                },
              }}
              placeholder='ระบุชื่อผู้ใช้งาน'
            />
            <Typography
              sx={{ textAlign: 'left', marginTop: '8px', color: '#344054' }}
            >
              รหัสผ่าน
            </Typography>
            <TextField
              size='small'
              fullWidth
              name='password'
              placeholder='ระบุรหัสผ่าน'
              id='filled-adornment-password'
              type={showPassword ? 'text' : 'password'}
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position='end'>
                      <IconButton
                        aria-label='toggle password visibility'
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        onMouseUp={handleMouseUpPassword}
                        edge='end'
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                },
              }}
            />
            <Box className='flex' sx={{ justifyContent: 'space-between' }}>
              <FormControlLabel
                control={<Checkbox defaultChecked />}
                label='จำรหัสผ่าน'
                sx={{ color: '#344054' }}
              />
              <Typography
                sx={{
                  fontSize: '16px',
                  color: '#0A6EE1',
                  alignSelf: 'center',
                }}
              >
                ลืมรหัสผ่าน ?
              </Typography>
            </Box>
            <Button
              sx={{
                width: '100%',
                background: '#074E9F',
                color: '#ffffff',
                fontSize: '18px',
                height: '48px',
              }}
              type='submit'
            >
              เข้าสู่ระบบ
            </Button>
          </form>
        </Box>
      </Box>
      {!matches ? (
        <Box
          sx={{
            position: 'fixed',
            bottom: 0,
            width: '100%',
            padding: '8px 8px',
            background: '#ffffff',
            zIndex: '999',
          }}
        >
          <Divider sx={{ margin: '8px' }} />
          <Grid container sx={{ marginBottom: '8px' }}>
            <Grid
              size={{ xs: 12 }}
              sx={{ textAlign: 'center', color: '#667085' }}
            >
              เวอร์ชั่น 1.00
            </Grid>
            <Grid
              size={{ xs: 12 }}
              sx={{ textAlign: 'center', color: '#667085' }}
            >
              สงวนลิขสิทธิ์ © YYYY โดย บริษัท Tesakkaset
            </Grid>
          </Grid>
        </Box>
      ) : (
        <Box
          sx={{
            position: 'fixed',
            bottom: 0,
            width: '50%',
            padding: '8px 8px',
            background: '#ffffff',
            zIndex: '999',
          }}
        >
          <Divider sx={{ margin: '8px' }} />
          <Grid
            container
            sx={{ marginBottom: '16px', justifyContent: 'space-between' }}
          >
            <Grid size={{ md: 4 }} sx={{ textAlign: 'left', color: '#667085' }}>
              เวอร์ชั่น 1.00
            </Grid>
            <Grid
              size={{ md: 8 }}
              sx={{ textAlign: 'right', color: '#667085' }}
            >
              สงวนลิขสิทธิ์ © YYYY โดย บริษัท Tesakkaset
            </Grid>
          </Grid>
        </Box>
      )}
    </Box>
  );
}
