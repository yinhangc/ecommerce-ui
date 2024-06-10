import { PlusCircleIcon } from "@heroicons/react/24/outline";
import React, { MouseEventHandler } from "react";

interface AddToCartBtnInterface {
  handleSubmit: MouseEventHandler<HTMLButtonElement>;
}

const AddToCartBtn: React.FC<AddToCartBtnInterface> = (props) => {
  const { handleSubmit } = props;

  return (
    <button
      className="flex items-center justify-center gap-1 rounded bg-black px-10 py-2 text-white"
      onClick={handleSubmit}
    >
      <PlusCircleIcon className="h-4 w-4" />
      加至購物車
    </button>
  );
};

export default AddToCartBtn;
