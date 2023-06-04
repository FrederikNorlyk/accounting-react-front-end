import MainComponent from "@/components/MainComponent";
import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Accounting",
  description: "Simple frontend for an accounting application, built using the React framework Next.js.",
};

export default function RootLayout({ children, }: { children: React.ReactNode; }) {
  return (
    <html lang="en" className="h-full bg-gray-100">
      <body className={inter.className}>
          <MainComponent children={children} />
      </body>
    </html>
  );
}
