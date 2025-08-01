import "./globals.css";
import AuthProvider from "@/components/SessionProvider";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fa">
      <body>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}