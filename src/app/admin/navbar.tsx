'use client';
import { logout } from '@/utils/auth';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { usePathname } from 'next/navigation';

const queryClient = new QueryClient();

export default function NavBarAdmin() {
  const { data: session } = useSession();
  const accessToken = session?.user?.accessToken;
  localStorage.setItem('accessToken', JSON.stringify(accessToken));
  const pathname = usePathname();

  if (!accessToken) {
    const urlParam = pathname;
    logout(urlParam);
  }
  return (
    <QueryClientProvider client={queryClient}>
      <div className='navbar bg-primary text-[#e6f4ea] shadow-lg'>
        <div className='flex-1'>
          <a className='btn btn-ghost text-xl'>Tesak Admin</a>
        </div>
        <div className='flex-none gap-2'>
          <div className='dropdown dropdown-end'>
            <div
              tabIndex={0}
              role='button'
              className='btn btn-ghost btn-circle avatar'
            >
              <button className='btn btn-circle btn-sm'>SS</button>
            </div>
            <ul
              tabIndex={0}
              className='menu menu-sm dropdown-content bg-primary rounded-box z-[1] mt-3 w-52 p-2 shadow'
            >
              <li>
                <a onClick={() => logout(pathname)}>Logout</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </QueryClientProvider>
  );
}
