import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { useEffect, useRef, useState } from "react";
import find from "lodash/find";

interface DropdownProps {
  icon: React.ReactNode;
  options: {
    label: string;
    value: string;
  }[];
  type?: "hover" | "click";
  variant?: "standard" | "outline";
  defaultValue?: string;
  nullValueLabel?: string;
}

export default function Dropdown(props: DropdownProps) {
  const {
    icon,
    options,
    type = "hover",
    variant = "standard",
    defaultValue = "",
    nullValueLabel = "---SELECT ONE---",
  } = props;
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [value, setValue] = useState<string>(defaultValue);
  const [menuVisible, setMenuVisible] = useState(false);

  const displayLabel = find(options, { value })?.label || nullValueLabel;
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
    <div ref={dropdownRef} className="group relative cursor-pointer">
      <button
        className={`flex items-center justify-center gap-1 rounded ${variant === "outline" ? "border border-gray-500 px-4 py-2" : ""}`}
        onClick={() => setMenuVisible(!menuVisible)}
      >
        {icon}
        {displayLabel}
        <ChevronDownIcon className="h-4 w-4" />
      </button>
      {showMenuCondition && (
        <ul
          role="select"
          className={`absolute top-[100%] w-full overflow-hidden rounded bg-white text-center shadow-lg ${type === "hover" ? "hidden group-hover:block" : ""}`}
        >
          {options.map((option) => (
            <li
              key={option.value}
              className="py-2 transition-colors hover:text-twine-500"
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
