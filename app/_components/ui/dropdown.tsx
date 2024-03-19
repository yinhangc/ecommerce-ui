"use client";

import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { useEffect, useRef, useState } from "react";
import find from "lodash/find";

export interface DropdownProps {
  icon?: React.ReactNode;
  options: {
    label: string;
    value: string;
  }[];
  type?: "hover" | "click";
  variant?: "standard" | "outline";
  defaultValue?: string;
  style?: {
    width?: string;
  };
}

export default function Dropdown(props: DropdownProps) {
  const {
    icon,
    options,
    type = "hover",
    variant = "standard",
    defaultValue = "",
    style = {},
  } = props;
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [value, setValue] = useState<string>(defaultValue);
  const [menuVisible, setMenuVisible] = useState(false);

  const displayLabel = find(options, { value })?.label || "---SELECT ONE---";
  const showMenuCondition =
    (menuVisible && type === "click") || type === "hover";

  const handleClickOutside = (e: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node))
      setMenuVisible(false);
  };

  useEffect(() => {
    if (type !== "click") return;
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [type]);

  return (
    <div
      ref={dropdownRef}
      className={`group relative cursor-pointer ${!!style?.width && style.width}`}
    >
      <button
        className={`flex w-full items-center justify-between gap-1 ${variant === "outline" ? "rounded border border-gray-500 px-4 py-2" : ""}`}
        onClick={() => setMenuVisible(!menuVisible)}
      >
        {!!icon && icon}
        {displayLabel}
        <ChevronDownIcon className="h-4 w-4" />
      </button>
      {showMenuCondition && (
        <ul
          role="select"
          className={`absolute top-[100%] w-full overflow-hidden rounded bg-white shadow-lg ${type === "hover" ? "hidden group-hover:block" : ""} ${variant === "outline" ? "text-left" : "text-center"}`}
        >
          {options.map((option) => (
            <li
              key={option.value}
              className="hover:text-leather-500 px-4 py-2 transition-all hover:font-bold"
              onClick={() => {
                setValue(option.value);
                setMenuVisible(false);
              }}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
