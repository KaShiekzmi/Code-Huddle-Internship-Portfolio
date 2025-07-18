import '../styles/globals.css';
import { Inter } from 'next/font/google';
import SessionWrapper from '@/components/SessionWrapper';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'NextBook - Simple Book Review App',
  description:
    'Discover, review, and share your favorite books with NextBook - a simple and intuitive book review platform.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className={inter.className}>
        <SessionWrapper>
          <Header />
          {children}
          <Footer />
        </SessionWrapper>
      </body>
    </html>
  );
}
