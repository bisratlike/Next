import { MantineProvider, ColorSchemeScript } from '@mantine/core';
import '@mantine/core/styles.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Pinky Users',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <ColorSchemeScript defaultColorScheme="light" />
      </head>
      <body className="antialiased">
        <MantineProvider
          defaultColorScheme="light"
          theme={{
            primaryColor: 'pink',
            components: {
              Badge: {
                styles: {
                  root: { backgroundColor: '#fbcfe8' },
                  label: { color: '#9d174d' }
                }
              }
            }
          }}
        >
          {children}
        </MantineProvider>
      </body>
    </html>
  );
}