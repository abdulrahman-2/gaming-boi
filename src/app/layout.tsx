import { Poppins } from "next/font/google";
import type { Metadata } from "next";
import "./globals.css";
import Notifications from "@/components/Notifications";
import QueryProvider from "@/lib/QueryProvider";

const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Gaming Boi",
  description: "A place for all your gaming needs",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.className} dark antialiased`}>
        <QueryProvider>
          {children}
          <Notifications />
        </QueryProvider>
      </body>
    </html>
  );
}
