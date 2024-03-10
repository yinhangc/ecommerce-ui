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
import Dropdown from "./ui/dropdown";

const dropdownProps = {
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
        className={`sticky top-0 z-10 flex w-full flex-col bg-white transition-all duration-300 ${isShrink ? "h-[170px]" : "h-[280px]"}`}
      >
        <div
          className={`mx-auto flex w-full max-w-7xl items-center px-6 py-4 ${isShrink ? "h-[80%]" : "h-[70%]"}`}
        >
          <div className="flex basis-2/6 items-center gap-4">
            <Dropdown {...dropdownProps.language} />
            <Dropdown {...dropdownProps.currency} />
          </div>
          <div
            className={`basis-2/6 transition-all duration-500 ${isShrink ? "h-[150px]" : "h-[200px]"}`}
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
            <button className="flex items-center gap-1">
              <ShoppingCartIcon className="h-7 w-7" />
              購物籃
            </button>
          </div>
        </div>
        <nav className={`${isShrink ? "h-[20%]" : "h-[30%]"}`}>
          <ul className="flex max-h-full items-center justify-center bg-twine-500 py-4 text-white">
            <li>
              <Link href="/" className="px-5">
                主頁
              </Link>
            </li>
            <li>
              <Link href="/beans" className="px-5">
                咖啡豆
              </Link>
            </li>
            <li>
              <Link href="/accessories" className="px-5">
                配件
              </Link>
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
}
