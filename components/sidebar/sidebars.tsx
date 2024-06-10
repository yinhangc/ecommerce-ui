"use client";

import { useAppSelector } from "@/redux/hooks";
import { SidebarType } from "@/redux/slices/ui.slice";
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
