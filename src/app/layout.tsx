import type { Metadata } from "next";
import { Heebo } from "next/font/google";
import "./globals.css";

const heebo = Heebo({
  subsets: ["hebrew", "latin"],
  variable: "--font-heebo",
  display: "swap",
});

export const metadata: Metadata = {
  title: "ART-AI — פלטפורמת תיק עבודות לאמנות AI",
  description: "פלטפורמת תיק עבודות לאומנית AI ואדריכלית — גלריות דיגיטליות עתידניות",
  openGraph: {
    title: "ART-AI",
    description: "AI Art & Architecture Portfolio Platform",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="he" dir="rtl" className={heebo.variable}>
      <body className="font-heebo bg-bg text-foreground antialiased min-h-screen">
        {children}
      </body>
    </html>
  );
}
