import "./globals.css";
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen ">
        {children}
      </body>
    </html>
  );
}
