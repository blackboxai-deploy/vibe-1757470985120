import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Happy Birthday! 🎉",
  description: "A beautiful birthday celebration website with animations and interactive elements",
  keywords: "birthday, celebration, party, wishes, happy birthday",
  authors: [{ name: "Birthday Celebration" }],
  openGraph: {
    title: "Happy Birthday! 🎉",
    description: "Join us in celebrating this special day!",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400;500;600;700&family=Poppins:wght@300;400;500;600;700&display=swap"
          rel="preload"
          as="style"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400;500;600;700&family=Poppins:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={`${inter.className} antialiased bg-gradient-to-br from-pink-100 via-purple-50 to-indigo-100 min-h-screen overflow-x-hidden`}>
        <div className="relative">
          {children}
        </div>
      </body>
    </html>
  );
}