import type { Metadata } from 'next';
import React from 'react';
import 'react-toastify/dist/ReactToastify.css';
import './globals.css';
import Container from '@/containers/Container';

export const metadata: Metadata = {
  title: 'The Good Thing',
  description: 'Perfect Picks For A Good Day',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body>
        <main>
          <Container>{children}</Container>
        </main>
      </body>
    </html>
  );
}
