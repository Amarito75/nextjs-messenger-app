import "./globals.css";
import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import ToasterContext from "./context/ToasterContext";
import AuthContext from "./context/AuthContext";

export const metadata: Metadata = {
  title: "Chat Application | Amar Matallah",
  description: "Real Time Chat Application",
};
const montserrat = Montserrat({ subsets: ["latin"] });
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={montserrat.className}>
        <AuthContext>
          <ToasterContext />
          {children}
        </AuthContext>
      </body>
    </html>
  );
}
