import "./globals.css"; // This MUST be the first import
import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { AuthProvider } from "@/context/AuthContext";
import { JetBrains_Mono } from 'next/font/google';

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Kapt | Coberturas",
  description: "Plataforma Kapt",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        <script src="https://mcp.figma.com/mcp/html-to-design/capture.js" async></script>
      </head>
      <body className={`antialiased bg-asphaltBlack text-white font-mono ${jetbrainsMono.variable}`} suppressHydrationWarning>
        <AuthProvider>
          <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-1">
              {children}
            </main>
            <Footer />
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
