"use client";

import logo from "@/public/logo.png";
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
import { useAppDispatch, useAppSelector } from "../_redux/hooks";
import {
  Language,
  selectTranslations,
  setLanguage,
} from "../_redux/slices/i18n.slice";
import { SidebarType, showSidebar } from "../_redux/slices/ui.slice";
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
  const dispatch = useAppDispatch();
  const t = useAppSelector(selectTranslations);
  const cartItemsLength = useAppSelector((state) => state.cart.items).length;
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
      dispatch(setLanguage(language as Language));
    });
    return () => subscription.unsubscribe();
  }, [dispatch, watch]);

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

  const handleCartBtnClick = () => dispatch(showSidebar(SidebarType.Cart));
  return (
    <>
      <div
        ref={scrollTrackerRef}
        className="pointer-events-none absolute top-2 z-20 h-6 w-6 opacity-0"
      ></div>
      <header
        className={`sticky top-0 z-10 flex h-[300px] w-full flex-col bg-transparent transition-all duration-300`}
      >
        <div
          className={`mx-auto flex w-full max-w-7xl items-center bg-white px-6`}
        >
          <div className="flex basis-2/6 items-center gap-4">
            <Controller
              control={control}
              name="language"
              render={({ field: { value, onChange } }) => (
                <Dropdown
                  {...dropdownProps["language"]}
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
                  {...dropdownProps["currency"]}
                  value={value}
                  onChange={onChange}
                />
              )}
            />
          </div>
          <div
            className={`basis-2/6 transition-all duration-200 ease-in-out ${isShrink ? "h-[125px]" : "h-[200px]"} `}
          >
            <Image
              src={logo}
              alt="Logo"
              className="h-full w-auto"
              sizes="100vw"
              width="0"
              height="0"
              style={{
                margin: "auto",
              }}
            />
          </div>
          <div className="flex basis-2/6 items-center justify-end gap-5">
            <button>
              <Link href="/login" className="flex items-center gap-1">
                <UserIcon className="h-7 w-7" />
                {t.header.nav_login}
              </Link>
            </button>
            <button
              className="flex items-center gap-1"
              onClick={handleCartBtnClick}
            >
              <div className="relative">
                {cartItemsLength > 0 && (
                  <div className="absolute -right-2 -top-3 flex h-5 w-5 items-center justify-center rounded-full bg-red-600 text-xs font-medium text-white">
                    {cartItemsLength}
                  </div>
                )}
                <ShoppingCartIcon className="h-7 w-7" />
              </div>
              {t.header.nav_cart}
            </button>
          </div>
        </div>
        <nav>
          <ul className="bg-leather-500 flex h-full items-center justify-center py-4 text-white">
            <li>
              <Link href="/" className="px-6">
                {t.header.nav_home}
              </Link>
            </li>
            <li>
              <Link href="/beans" className="px-6">
                {t.header.nav_beans}
              </Link>
            </li>
            <li>
              <Link href="/accessories" className="px-6">
                {t.header.nav_accessories}
              </Link>
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
};

export default Header;
