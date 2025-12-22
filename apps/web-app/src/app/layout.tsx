import SizeProvider from '@web-app/contexts/SizeProvider';
import './global.css';

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
        <SizeProvider>
          {children}
          <div id="modal" className="fixed top-0 left-0 z-10"></div>
        </SizeProvider>
      </body>
    </html>
  );
}
