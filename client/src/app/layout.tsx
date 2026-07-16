import { Metadata } from 'next';
import { Quicksand, Playfair_Display } from 'next/font/google';
import { AuthProvider } from '@/contexts/AuthContext';
import './globals.css';

const quicksand = Quicksand({
  subsets: ['latin'],
  variable: '--font-quicksand',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700'],
});

const playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://kumfora.com'),
  title: {
    default: 'Kumfora - Comfortable Period Care for Girls',
    template: '%s | Kumfora',
  },
  description: 'Discover Kumfora\'s premium period pads designed for girls. Ultra-soft, leak-proof, and eco-friendly. Free shipping on orders over ₹499.',
  keywords: ['period pads', 'girls hygiene', 'sanitary pads', 'period care', 'menstrual products'],
  authors: [{ name: 'Kumfora' }],
  creator: 'Kumfora',
  publisher: 'Kumfora',
  robots: 'index, follow',
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://kumfora.com',
    siteName: 'Kumfora',
    title: 'Kumfora - Comfortable Period Care for Girls',
    description: 'Discover Kumfora\'s premium period pads designed for girls. Ultra-soft, leak-proof, and eco-friendly.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Kumfora Period Care',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Kumfora - Comfortable Period Care for Girls',
    description: 'Discover Kumfora\'s premium period pads designed for girls.',
    images: ['/og-image.jpg'],
  },
  verification: {
    google: 'google-site-verification-code',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en-IN" className={`${quicksand.variable} ${playfairDisplay.variable}`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="font-sans text-kumfora-charcoal bg-kumfora-cream antialiased">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
