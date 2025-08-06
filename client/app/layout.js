'use client'
import { Poppins, Josefin_Sans, Inter } from "next/font/google";
import { ThemeProvider } from "next-themes";
import "./globals.css";
import { Providers } from "./Provider";
import { Toaster } from "react-hot-toast";
import { SessionProvider } from "next-auth/react";
import { useLoadUserQuery } from "@/redux/feature/api/apiSlice";
import Loader from "./components/Loader";

// Importing fonts from Google Fonts

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});
const josefin = Josefin_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${poppins.className} ${josefin.className} !bg-white bg-no-repeat dark:bg-gradient-to-b dark:from-gray-900 dark:to-black duration-300`}
      >
        <Providers>
          <SessionProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem={true}
            >
              <Toaster position="top-center" reverseOrder={false} />
              <Custom>{children}</Custom>
            </ThemeProvider>
          </SessionProvider>
        </Providers>
      </body>
    </html>
  );
}

const Custom = ({children}) => {
  const {isLoading} = useLoadUserQuery({});
  return (
    <>
    {
      isLoading ? <Loader /> : <>{children}</>
    }
    </>
  )
}
