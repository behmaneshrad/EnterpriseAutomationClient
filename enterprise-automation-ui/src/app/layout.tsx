import "./globals.css";


export const metadata = {
  title: "Enterprise Automation UI",
  description: "enterprise automation hub.",
},

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fa">
      <body>
        {children}
      </body>
    </html>
  );
}