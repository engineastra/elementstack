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
      <body className="bg-backgroundAccent">{children}</body>
    </html>
  );
}
