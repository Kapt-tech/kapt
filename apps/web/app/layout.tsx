import "./globals.css"; // This MUST be the first import
import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { AuthProvider } from "@/context/AuthContext";

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
      <body className="antialiased bg-black text-white" suppressHydrationWarning>
        <AuthProvider>
          <Header />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}