// ... existing imports ...
import { Notifications } from '@mantine/notifications';
import { MantineProvider, ColorSchemeScript,  } from '@mantine/core';
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
              },
              Card: {
                styles: {
                  root: { transition: 'transform 0.2s' },
                }
              }
            }
          }}
        >
          <Notifications position="top-right" />
          {children}
        </MantineProvider>
      </body>
    </html>
  );
}