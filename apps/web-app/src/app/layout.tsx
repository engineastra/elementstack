import { Oxanium } from 'next/font/google';
import Header from '../components/Header';
import './global.css';
import { oxanium } from '../constants/Common';

export const metadata = {
  title: 'Element Stack',
  description: 'Most versatile frontend applications',
  icons: {
    icon: '/Logo.svg', // Path relative to public/ root
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-backgroundAccent">
        <div className={`flex flex-col min-h-[100vh] p-5 ${oxanium.variable}`}>
          <Header />
          {children}
        </div>
        <div id="modal" className="fixed top-0 left-0"></div>
      </body>
    </html>
  );
}
