import ClientQueryProvider from "./provider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ClientQueryProvider>
          {children}
        </ClientQueryProvider>
        
      </body>
    </html>
  );
}
