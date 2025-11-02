import type { Metadata } from 'next';
import { Montserrat_Alternates } from 'next/font/google';
import './globals.css';
import Providers from './providers';
import { Header, Footer } from '@/features/layout';
import { ClientModalHandler } from '@/features/contact-modal';

const montserrat = Montserrat_Alternates({
  variable: '--font-montserrat',
  subsets: ['latin'],
  weight: ['400', '500', '600'],
});

export const metadata: Metadata = {
  title: 'Megastom | Клініка для твоїх зубів',
  description: 'Megastom | Клініка для твоїх зубів',
  keywords: [
    'megastom',
    'клініка',
    'зуби',
    'терапевт',
    'стоматолог',
    'терапевт-стоматолог',
    'терапевт-стоматолог-клініка',
    'терапевт-стоматолог-клініка-megastom',
  ],
  authors: [{ name: 'Megastom', url: 'https://megastom.com' }],
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: './favicon.ico',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${montserrat.variable} antialiased`}>
        <Providers>
          <div className="flex min-h-screen flex-col">
            <Header />
            <main className="grow">{children}</main>
            <Footer />
            <ClientModalHandler />
          </div>
        </Providers>
      </body>
    </html>
  );
}
