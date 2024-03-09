"use client";

import {
  CurrencyDollarIcon,
  GlobeAltIcon,
  ShoppingCartIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import logo from "@/public/logo.png";

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
        className="opacity-1 pointer-events-none absolute top-2 z-20 h-6 w-6"
      ></div>
      <header
        className={`sticky top-0 z-10 flex w-full flex-col bg-white transition-all duration-300 ${isShrink ? "h-[180px]" : "h-[280px]"}`}
      >
        <div className="mx-auto flex h-[80%] max-h-full w-full max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex gap-4">
            <div className="cursor-pointer">
              <GlobeAltIcon className="h-7 w-7" />
            </div>
            <div className="cursor-pointer">
              <CurrencyDollarIcon className="h-7 w-7" />
            </div>
          </div>
          <div>
            <Image src={logo} alt="Logo" height={isShrink ? 140 : 220} />
          </div>
          <div className="flex gap-4">
            <div className="cursor-pointer">
              <UserIcon className="h-7 w-7" />
            </div>
            <div className="cursor-pointer">
              <ShoppingCartIcon className="h-7 w-7" />
            </div>
          </div>
        </div>
        <nav className="h-[20%]">
          <ul className="flex max-h-full items-center justify-center bg-twine-400 py-4 text-white">
            <li>
              <Link href="/beans" className="px-4">
                主頁
              </Link>
            </li>
            <li>
              <Link href="/beans" className="px-4">
                咖啡豆
              </Link>
            </li>
            <li>
              <Link href="/accessories" className="px-4">
                配件
              </Link>
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
}
