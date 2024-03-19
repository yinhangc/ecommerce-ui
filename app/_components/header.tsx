"use client";

import {
  ChevronDownIcon,
  CurrencyDollarIcon,
  GlobeAltIcon,
  ShoppingCartIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import logo from "@/public/logo.png";
import Dropdown, { DropdownProps } from "./ui/dropdown";

const dropdownProps: { [key: string]: DropdownProps } = {
  language: {
    icon: <GlobeAltIcon className="h-7 w-7" />,
    options: [
      { label: "繁體中文", value: "zh" },
      { label: "English", value: "en" },
    ],
    defaultValue: "zh",
  },
  currency: {
    icon: <CurrencyDollarIcon className="h-7 w-7" />,
    options: [
      { label: "HKD", value: "hkd" },
      { label: "TWD", value: "twd" },
    ],
    defaultValue: "hkd",
  },
};

export default function Header() {
  const scrollTrackerRef = useRef<HTMLDivElement>(null);
  const [isShrink, setIsShrink] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries: IntersectionObserverEntry[]) => {
        const entry = entries[0];
        setIsShrink(entry.intersectionRatio < 0.95);
      },
      {
        threshold: [0, 1],
      },
    );
    if (scrollTrackerRef.current) observer.observe(scrollTrackerRef.current);
    return () => {
      if (scrollTrackerRef.current)
        observer.unobserve(scrollTrackerRef.current);
    };
  }, []);

  return (
    <>
      <div
        ref={scrollTrackerRef}
        className="pointer-events-none absolute top-2 z-20 h-6 w-6 opacity-0"
      ></div>
      <header
        className={`sticky top-0 z-10 flex w-full flex-col bg-white transition-all duration-300`}
      >
        <div
          className={`mx-auto flex w-full max-w-7xl items-center px-6 ${isShrink ? "py-0" : "py-4"}`}
        >
          <div className="flex basis-2/6 items-center gap-4">
            <Dropdown {...dropdownProps.language} />
            <Dropdown {...dropdownProps.currency} />
          </div>
          <div
            className={`basis-2/6 transition-all duration-500 ${isShrink ? "h-[140px]" : "h-[200px]"}`}
          >
            <Image
              src={logo}
              alt="Logo"
              style={{
                display: "block",
                height: "100%",
                width: "auto",
                margin: "auto",
              }}
            />
          </div>
          <div className="flex basis-2/6 items-center justify-end gap-5">
            <button>
              <Link href="/login" className="flex items-center gap-1">
                <UserIcon className="h-7 w-7" />
                登入
              </Link>
            </button>
            <button>
              <Link href="/cart" className="flex items-center gap-1">
                <ShoppingCartIcon className="h-7 w-7" />
                購物車
              </Link>
            </button>
          </div>
        </div>
        <nav>
          <ul className="bg-leather-500 flex h-full items-center justify-center py-4 text-white">
            <li>
              <Link href="/" className="px-6">
                主頁
              </Link>
            </li>
            <li>
              <Link href="/beans" className="px-6">
                咖啡豆
              </Link>
            </li>
            <li>
              <Link href="/accessories" className="px-6">
                配件
              </Link>
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
}
