import { MinusCircleIcon, PlusCircleIcon } from "@heroicons/react/24/outline";
import React from "react";

interface QtyBtnInterface {
  size?: string;
  // react-hook-form
  value: number;
  onChange: (value: number) => void;
  // react-hook-form EOL
}

const QtyBtn: React.FC<QtyBtnInterface> = (props) => {
  const { size = "standard", value, onChange } = props;
  const disableMinusBtn = value <= 1;
  const containerClasses =
    size === "standard" ? "flex items-center gap-6" : "flex items-center gap-3";
  const btnClasses = size === "standard" ? "h-7 w-7" : "h-5 w-5";

  const handleMinus = () => {
    if (!disableMinusBtn) onChange(value - 1);
  };

  const handlePlus = () => {
    onChange(value + 1);
  };

  return (
    <div className={containerClasses}>
      <button
        onClick={handleMinus}
        className={`${disableMinusBtn && "text-slate-300"}`}
      >
        <MinusCircleIcon className={btnClasses} />
      </button>
      <div className="font-medium">{value}</div>
      <button onClick={handlePlus}>
        <PlusCircleIcon className={btnClasses} />
      </button>
    </div>
  );
};

export default QtyBtn;
