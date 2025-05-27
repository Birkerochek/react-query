import Links from "./Links/Links";
import ClientQueryProvider from "./provider";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ClientQueryProvider>
          <Links/>
          {children}
          <ReactQueryDevtools initialIsOpen={false} />
        </ClientQueryProvider>
        
      </body>
    </html>
  );
}
