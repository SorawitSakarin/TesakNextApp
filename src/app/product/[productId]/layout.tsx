import { Fragment } from 'react';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Fragment>
      <main
        className='bg-primary min-h-screen w-screen flex flex-col items-center overflow-x-hidden'
        data-theme='tesak'
      >
        {children}
      </main>
    </Fragment>
  );
}
