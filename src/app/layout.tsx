import "../app/globals.css";
import "react-toastify/dist/ReactToastify.css";

import { QueryProvider } from "~/libs/elysia/react";
import { seo } from "~/libs/seo";
import { ToastContainer } from "react-toastify";
import { ThemeProvider } from '../components/theme-provider'
import { SpeedInsights } from '@vercel/speed-insights/next';
// import { Analytics } from '@vercel/analytics/next';
import Navbar from "~/app/_components/Header/Navbar";
import Footer from "~/app/_components/Footer/Footer";

export const metadata = seo({});

const RootLayout: React.FC<React.PropsWithChildren> = async ({ children }) => {

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        <meta
          name="description"
          content="งานนิทรรศการประจำปีของโรงเรียนเตรียมอุดมศึกษา พบกับกิจกรรมที่น่าสนใจจากนักเรียนโรงเรียนเตรียมอุดมศึกษา อาทิ แนะแนวการศึกษาต่อ แนะนำสายการเรียน และกิจกรรมจากชมรมต่าง ๆ"
        />
        <meta
          name="keywords"
          content="Open House, Triam Udom Suksa, Education, School Events, Thailand, 2025"
        />
        <meta name="author" content="Triam Udom Suksa School" />

        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://openhouse.triamudom.ac.th/" />
        <meta property="og:title" content="Triam Udom Open House 2025" />
        <meta
          property="og:description"
          content="งานนิทรรศการประจำปีของโรงเรียนเตรียมอุดมศึกษา พบกับกิจกรรมที่น่าสนใจจากนักเรียนโรงเรียนเตรียมอุดมศึกษา อาทิ แนะแนวการศึกษาต่อ แนะนำสายการเรียน และกิจกรรมจากชมรมต่าง ๆ"
        />
        <meta property="og:image" content="/assets/preview.png" />

        <meta property="twitter:card" content="summary_large_image" />
        <meta
          property="twitter:url"
          content="https://openhouse.triamudom.ac.th/"
        />
        <meta property="twitter:title" content="Triam Udom Open House 2025" />
        <meta
          property="twitter:description"
          content="งานนิทรรศการประจำปีของโรงเรียนเตรียมอุดมศึกษา พบกับกิจกรรมที่น่าสนใจจากนักเรียนโรงเรียนเตรียมอุดมศึกษา อาทิ แนะแนวการศึกษาต่อ แนะนำสายการเรียน และกิจกรรมจากชมรมต่าง ๆ"
        />
        <meta property="twitter:image" content="/assets/preview.png" />

        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className="font-Thai">
        <QueryProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            >
            <Navbar />
            {children}
            <Footer />
            <ToastContainer />
          </ThemeProvider>
        </QueryProvider>
        <SpeedInsights />
        {/* <Analytics /> */}
      </body>
    </html>
  );
};

export default RootLayout;
