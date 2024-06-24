"use client";

import logo from "@/public/logo.png";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { SidebarType, showSidebar } from "@/redux/slices/ui.slice";
import {
  CurrencyDollarIcon,
  GlobeAltIcon,
  ShoppingCartIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  Language,
  selectTranslations,
  setLanguage,
} from "../redux/slices/i18n.slice";
import Dropdown, { DropdownProps } from "./dropdown";

const dropdownProps: { [key: string]: DropdownProps } = {
  language: {
    icon: <GlobeAltIcon className="h-7 w-7" />,
    options: [
      { label: "繁體中文", value: "zh" },
      { label: "English", value: "en" },
    ],
  },
  currency: {
    icon: <CurrencyDollarIcon className="h-7 w-7" />,
    options: [
      { label: "HKD", value: "hkd" },
      { label: "TWD", value: "twd" },
    ],
  },
};

interface HeaderFormInput {
  language: Language;
  currency: string;
}

const Header = () => {
  // const dispatch = useAppDispatch();
  // const t = useAppSelector(selectTranslations);
  // TODO: cartItemsLength
  // const cartItemsLength = useAppSelector((state) => state.cart.items).length;
  const cartItemsLength = 0;
  const scrollTrackerRef = useRef<HTMLDivElement>(null);
  const [isShrink, setIsShrink] = useState(false);
  const { control, watch } = useForm<HeaderFormInput>({
    defaultValues: {
      language: "zh",
      currency: "hkd",
    },
  });

  useEffect(() => {
    const subscription = watch((value, { name, type }) => {
      console.log("header subscription", value);
      const { language, currency } = value;
      // TODO: setLanguage
      // dispatch(setLanguage(language as Language));
    });
    return () => subscription.unsubscribe();
  }, [watch]);

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
        className={`pointer-events-none sticky top-0 z-20 flex h-[256px] w-full flex-col overflow-hidden bg-transparent transition-all duration-300`}
      >
        <div className="pointer-events-auto mx-auto flex w-full max-w-7xl items-center bg-white px-6">
          <div className="flex basis-2/6 items-center gap-4">
            <Controller
              control={control}
              name="language"
              render={({ field: { value, onChange } }) => (
                <Dropdown
                  {...dropdownProps['language']}
                  value={value}
                  onChange={onChange}
                />
              )}
            />
            <Controller
              control={control}
              name="currency"
              render={({ field: { value, onChange } }) => (
                <Dropdown
                  {...dropdownProps['currency']}
                  value={value}
                  onChange={onChange}
                />
              )}
            />
          </div>
          <div
            className={`basis-2/6 transition-all duration-200 ease-in-out ${isShrink ? 'h-[125px]' : 'h-[200px]'} `}
          >
            <Image
              src={logo}
              alt="Logo"
              className="h-full w-auto"
              sizes="100vw"
              width="0"
              height="0"
              style={{
                margin: 'auto',
              }}
            />
          </div>
          <div className="flex basis-2/6 items-center justify-end gap-5">
            <Link href="/login" className="flex items-center gap-1">
              <UserIcon className="h-7 w-7" />
              {/* {t.header.nav_login} */}
              登入
            </Link>
            <Link
              href="?cartSidebar=true"
              className="relative flex items-center gap-1"
            >
              <span className="absolute -right-4 -top-3 flex h-5 w-5 items-center justify-center rounded-full bg-red-600 text-xs font-medium text-white">
                {cartItemsLength}
              </span>
              <ShoppingCartIcon className="h-7 w-7" />
              {/* {t.header.nav_cart} */}
              購物車
            </Link>
          </div>
        </div>
        <nav className="pointer-events-auto">
          <ul className="bg-dark-blue flex h-full items-center justify-center py-4 text-white">
            <li>
              <Link href="/" className="px-6">
                {/* {t.header.nav_home} */}
                主頁
              </Link>
            </li>
            <li>
              <Link href="/sneakers" className="px-6">
                {/* {t.header.nav_sneakers} */}鞋
              </Link>
            </li>
            <li>
              <Link href="/accessories" className="px-6">
                {/* {t.header.nav_accessories} */}
                配件
              </Link>
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
};

export default Header;
