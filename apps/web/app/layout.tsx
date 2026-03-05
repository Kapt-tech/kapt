import "./globals.css"; // This MUST be the first import
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kapt / Eventos",
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
        {children}
      </body>
    </html>
  );
}