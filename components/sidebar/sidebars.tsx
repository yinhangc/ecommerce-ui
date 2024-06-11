"use client";

import { useSearchParams } from "next/navigation";
import CartSidebar from "./cartSidebar";

const Sidebars = () => {
  const searchParams = useSearchParams();

  return <>{!!searchParams.get("cartSidebar") && <CartSidebar />}</>;
};

export default Sidebars;
