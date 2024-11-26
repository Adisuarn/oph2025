import "../app/globals.css";
import 'react-toastify/dist/ReactToastify.css';

import { QueryProvider } from "~/libs/elysia/react";
import { seo } from "~/libs/seo";
import { ToastContainer } from "react-toastify";

export const metadata = seo({})

const RootLayout: React.FC<React.PropsWithChildren> = ({ children }) => (
  <html lang="en" suppressHydrationWarning>
    <head>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    </head>
    <body>
      <QueryProvider>
        {children}
      </QueryProvider>
      <ToastContainer />
    </body>
  </html>
)


export default RootLayout;
