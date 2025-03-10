import type { Metadata } from "next";
import "./globals.css";
import { doranregular } from "@/next-persian-fonts/doran";
import Navbar from "@/components/global/navbar";
import Footer from "@/components/global/footer";
import { ToastContainer } from "react-toastify";
import { ActivityTrackerProvider } from '@/components/providers/ActivityTrackerProvider';

export const metadata: Metadata = {
  title: "مدرن لایت",
  description: "فروشگاه اینترنتی مدرن لایت",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={` ${doranregular.className} bg-[#e5d8d0] antialiased relative`}
      >
        <ActivityTrackerProvider>
        <Navbar />
        <ToastContainer position="top-center" rtl={true} />
        {children}
        <Footer />
        </ActivityTrackerProvider>
      </body>
    </html>
  );
}
