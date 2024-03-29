import { useAppDispatch, useAppSelector } from "@/app/_redux/hooks";
import {
  decreaseQuantity,
  increaseQuantity,
  removeFromCart,
} from "@/app/_redux/slices/cart.slice";
import { hideSidebar } from "@/app/_redux/slices/ui.slice";
import { ShoppingCartIcon, TrashIcon } from "@heroicons/react/24/outline";
import { find } from "lodash";
import Image from "next/image";
import React, { useCallback, useEffect, useRef } from "react";
import { Controller, useForm } from "react-hook-form";
import { useClickAway } from "react-use";
import QtyBtn from "../qtyBtn";
import { SidebarInterface } from "./sidebars";

const CartSidebar: React.FC<SidebarInterface> = (props) => {
  const { watch, control } = useForm<{
    [key: string]: number;
  }>();
  const { show } = props;
  const ref = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();
  const items = useAppSelector((state) => state.cart.items);

  useClickAway(ref, () => {
    dispatch(hideSidebar());
  });

  const getTotalPrice = () => {
    let price = 0;
    for (const item of items) {
      price += item.product.price * item.qty;
    }
    return price;
  };

  const handleChange = useCallback(
    (name: string, updatedQty: number | undefined) => {
      const existingQty = find(items, (el) => el.product.id === name)?.qty;
      if (!existingQty || !updatedQty) return;
      if (updatedQty > existingQty) dispatch(increaseQuantity(name));
      else if (updatedQty < existingQty) dispatch(decreaseQuantity(name));
    },
    [dispatch, items],
  );

  const handleRemove = (id: string) => dispatch(removeFromCart(id));

  useEffect(() => {
    const subscription = watch((value, { name, type }) => {
      console.log("cart subscription", name, value);
      if (!name || !value[name]) return;
      handleChange(name, value[name]);
    });
    return () => subscription.unsubscribe();
  }, [handleChange, watch]);

  return (
    <div
      ref={ref}
      className={`fixed right-4 z-30 flex max-h-[600px] min-h-[100px] min-w-[250px] max-w-[400px] bg-white p-4 shadow-lg transition duration-300 ease-in-out ${show ? "translate-x-0" : "translate-x-[calc(100%+24px)]"}`}
    >
      {items.length > 0 && (
        <div className="flex flex-col items-center justify-center gap-y-4">
          {items.map(({ product, qty }) => (
            <div key={product.id} className="flex items-center gap-x-4">
              <div className="w-[20%]">
                <Image
                  src={product.imagePath}
                  alt=""
                  className="h-auto w-full"
                  sizes="100vw"
                  width="0"
                  height="0"
                />
              </div>
              <div className="w-[70%]">
                <p className="font-medium">{product.name}</p>
                {!!product.description && (
                  <p className="mt-1">{product.description}</p>
                )}
                <div className="mt-3 flex items-center gap-x-1">
                  <Controller
                    control={control}
                    name={product.id}
                    render={({ field: { onChange } }) => (
                      <QtyBtn size="small" value={qty} onChange={onChange} />
                    )}
                  />
                  <span>&times;</span>
                  <span>${product.price}</span>
                </div>
              </div>
              <div className="flex justify-center">
                <button
                  className="rounded-full p-3 hover:bg-zinc-100 hover:text-red-600"
                  onClick={() => handleRemove(product.id)}
                >
                  <TrashIcon className="h-5 w-5" />
                </button>
              </div>
            </div>
          ))}
          <div className="flex w-full justify-end gap-2 font-bold">
            <p>總計:</p>
            <p>${getTotalPrice()}</p>
          </div>
          <button className="flex items-center justify-center gap-1 rounded bg-black px-10 py-2 text-white">
            <ShoppingCartIcon className="h-4 w-4" />
            Checkout
          </button>
        </div>
      )}
      {items.length === 0 && <p className="m-auto">你的購物車是空的</p>}
    </div>
  );
};

export default CartSidebar;