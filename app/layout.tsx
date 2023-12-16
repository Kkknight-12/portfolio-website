import Navbar from "@/components/Navbar";
import { SettingContext } from "@/_context/SettingContext";
import MuiThemeProvider from "@/theme";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Mayank",
  description: "Mayank Sarasiya Portfolio",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <SettingContext>
        <MuiThemeProvider>
          <body className={inter.className}>
            <Navbar />
            {children}
          </body>
        </MuiThemeProvider>
      </SettingContext>
    </html>
  );
}