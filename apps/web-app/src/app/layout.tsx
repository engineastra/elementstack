import SizeProvider from '@web-app/contexts/SizeProvider';
import './global.css';
import FullPreviewProvider from '@web-app/contexts/FullPreviewProvider';

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
      <body className="bg-backgroundAccent md:max-h-[100vh]">
        <SizeProvider>
          <FullPreviewProvider>
            <div id="app" className='flex flex-0 w-full px-1 justify-center'>{children}</div>
            <div id="modal" className="fixed top-0 left-0 z-10"></div>
          </FullPreviewProvider>
        </SizeProvider>
      </body>
    </html>
  );
}
