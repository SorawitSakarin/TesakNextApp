import type { Metadata } from 'next';
import { PublicEnvScript } from 'next-runtime-env';
import { Roboto_Flex } from 'next/font/google';
import './globals.css';

const RobotoFlex = Roboto_Flex({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Tesak product',
  description: 'High quality agriculture product to your hand',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <head>
        <PublicEnvScript />
      </head>
      <body className={RobotoFlex.className}>{children}</body>
    </html>
  );
}
