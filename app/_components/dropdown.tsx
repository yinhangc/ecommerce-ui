import { ChevronDownIcon } from "@heroicons/react/24/outline";
import find from "lodash/find";
import { useRef, useState } from "react";
import { useClickAway } from "react-use";

export interface DropdownProps {
  options: {
    label: string;
    value: string;
  }[];
  icon?: React.ReactNode;
  type?: "hover" | "click";
  variant?: "standard" | "outline";
  style?: {
    width?: string;
  };
  // react-hook-form
  value?: string;
  onChange?: (value: string) => void;
  // react-hook-form EOL
}

const Dropdown: React.FC<DropdownProps> = (props) => {
  const {
    options,
    icon,
    type = "hover",
    variant = "standard",
    style = {},
    value,
    onChange,
  } = props;
  const ref = useRef<HTMLDivElement>(null);
  const [menuVisible, setMenuVisible] = useState(false);
  const displayLabel = find(options, { value })?.label || "---SELECT ONE---";
  const showMenu = (menuVisible && type === "click") || type === "hover";

  useClickAway(ref, () => setMenuVisible(false));

  const handleSelect = (selectedValue: string) => {
    if (!!onChange && !!selectedValue) onChange(selectedValue);
    setMenuVisible(false);
  };

  return (
    <div
      ref={ref}
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
      {showMenu && (
        <ul
          role="select"
          className={`absolute top-[100%] w-full overflow-hidden rounded bg-white shadow-lg ${type === "hover" ? "hidden group-hover:block" : ""} ${variant === "outline" ? "text-left" : "text-center"}`}
        >
          {options.map((option) => (
            <li
              key={option.value}
              className="hover:text-leather-500 px-4 py-2 transition-all hover:font-bold"
              onClick={() => handleSelect(option.value)}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
