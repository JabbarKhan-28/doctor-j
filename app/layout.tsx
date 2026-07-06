import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import Providers from "./provider";
import PageLoader from "./components/PageLoader";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta-sans",
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Doctor J - Book Appointment",
  description: "Simply browse through our extensive list of trusted doctors, and schedule your appointment hassle-free.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${plusJakartaSans.variable} bg-[#F8FAFC] scroll-smooth`}
      data-scroll-behavior="smooth"
    >
      <body className="min-h-screen flex flex-col font-sans antialiased text-slate-800">
        <Providers>
          <Navbar />
          <main className="grow flex flex-col">
            <PageLoader>
              {children}
            </PageLoader>
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}


