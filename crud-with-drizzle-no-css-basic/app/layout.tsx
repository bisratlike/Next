import { MantineProvider } from '@mantine/core';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <MantineProvider  theme={{
    primaryColor: 'blue', // Use a valid color name or hex code
  }}>
          {children}
        </MantineProvider>
      </body>
    </html>
  );
}