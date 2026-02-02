import type { Metadata } from "next";
import { Manrope, Space_Grotesk, Space_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/components/Auth/AuthProvider";
import { Header } from "@/components/ui/Header";
import { QuickLinksMenu } from "@/components/ui/QuickLinksMenu";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
});

const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-space-mono",
});

export const metadata: Metadata = {
  title: "Sputnik - Bloques de escalada",
  description: "Mapa interactivo de bloques del rocódromo Sputnik",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="h-full">
      <body className={`${manrope.variable} ${spaceGrotesk.variable} ${spaceMono.variable} font-body h-full bg-[var(--bg-primary)] text-[var(--text-primary)]`}>
        <AuthProvider>
          <Header />
          <main className="h-full">{children}</main>
          <QuickLinksMenu />
        </AuthProvider>
      </body>
    </html>
  );
}
