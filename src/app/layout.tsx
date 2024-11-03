import "../app/globals.css";

import { GeistSans } from "geist/font/sans";

import { QueryProvider } from "~/libs/elysia/react";
import { seo } from "~/libs/seo";
import { cn } from "~/libs/utils";


export const metadata = seo({})


const RootLayout: React.FC<React.PropsWithChildren> = ({ children }) => (
    <html lang="en" suppressHydrationWarning>
      <body className={GeistSans.variable}>
        <QueryProvider>
          {children}
        </QueryProvider>
      </body>
    </html>
)


export default RootLayout;
