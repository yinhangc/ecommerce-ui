import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  decreaseQuantity,
  increaseQuantity,
  removeFromCart,
} from "@/redux/slices/cart.slice";
import { hideSidebar } from "@/redux/slices/ui.slice";
import { ShoppingCartIcon, TrashIcon } from "@heroicons/react/24/outline";
import { find } from "lodash";
import Image from "next/image";
import React, { useCallback, useEffect, useRef } from "react";
import { Controller, FieldValues, useForm } from "react-hook-form";
import { useClickAway } from "react-use";
import QtyBtn from "../qtyBtn";
import { SidebarInterface } from "./sidebars";
import Link from "next/link";

const CartSidebar: React.FC<SidebarInterface> = (props) => {
  const { watch, control } = useForm<FieldValues>();
  const { show } = props;
  const ref = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();
  const items = useAppSelector((state) => state.cart.items);

  useClickAway(ref, () => {
    dispatch(hideSidebar());
  });

  const getProductsPrice = () => {
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

  const handleCheckoutBtnClick = () => dispatch(hideSidebar());

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
            <p>${getProductsPrice()}</p>
          </div>
          <button
            className="rounded bg-black text-white"
            onClick={handleCheckoutBtnClick}
          >
            <Link
              href="/checkout"
              className="flex items-center gap-1 px-10 py-2"
            >
              <ShoppingCartIcon className="h-4 w-4" />
              Checkout
            </Link>
          </button>
        </div>
      )}
      {items.length === 0 && <p className="m-auto">你的購物車是空的</p>}
    </div>
  );
};

export default CartSidebar;
