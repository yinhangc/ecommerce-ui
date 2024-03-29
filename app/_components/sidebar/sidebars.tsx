"use client";

import { useAppSelector } from "@/app/_redux/hooks";
import { SidebarType } from "@/app/_redux/slices/ui.slice";
import CartSidebar from "./cartSidebar";

export interface SidebarInterface {
  show: boolean;
}

const Sidebars = () => {
  const sidebar = useAppSelector((state) => state.ui.sidebar);

  return (
    <>
      <CartSidebar show={sidebar === SidebarType.Cart} />
    </>
  );
};

export default Sidebars;
