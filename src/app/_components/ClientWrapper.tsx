"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Header/Nav";
import Footer from "./Footer";

const ClientWrapper: React.FC = () => {
  const pathname = usePathname();
  return (pathname !== "/register" && <Navbar /> && <Footer />)
};

export default ClientWrapper;