"use client";

import Payment from "@/app/_components/payment";
import Stepper from "@/app/_components/stepper";
import { useAppSelector } from "@/app/_redux/hooks";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FieldErrors, SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

const requiredError = "請填寫此欄位";

const checkoutPaymentFormInputShippingSchema = z.object({
  deliveryOption: z.literal("shipping"),
});
const checkoutPaymentFormInputSelfPickupSchema = z.object({
  deliveryOption: z.literal("self-pickup"),
  selfPickupAddress: z.string(),
});

const checkoutPaymentFormInputSchema = z.discriminatedUnion("deliveryOption", [
  checkoutPaymentFormInputShippingSchema,
  checkoutPaymentFormInputSelfPickupSchema,
]);

type CheckoutPaymentFormInputShippingSchemaType = z.infer<
  typeof checkoutPaymentFormInputShippingSchema
>;
type CheckoutPaymentFormInputSelfPickupSchemaType = z.infer<
  typeof checkoutPaymentFormInputSelfPickupSchema
>;
type CheckoutPaymentFormInputSchemaType = z.infer<
  typeof checkoutPaymentFormInputSchema
>;

const CheckoutPaymentPage = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<CheckoutPaymentFormInputSchemaType>({
    defaultValues: {},
    resolver: zodResolver(checkoutPaymentFormInputSchema),
  });
  const items = useAppSelector((state) => state.cart.items);

  const watchPaymentOption = watch("deliveryOption");
  if (watchPaymentOption === "self-pickup") setValue("selfPickupAddress", "mk");

  const onSubmit: SubmitHandler<CheckoutPaymentFormInputSchemaType> = (
    data,
  ) => {
    console.log("data", data);
  };

  const handleBack = () => {
    router.push("/checkout/address");
  };

  const getProductsPrice = () => {
    let price = 0;
    for (const item of items) {
      price += item.product.price * item.qty;
    }
    return price;
  };

  return (
    <section className="mx-auto max-w-5xl px-6 py-12">
      <Stepper stage={2} />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mx-auto mt-12 grid grid-cols-2 gap-x-8"
      >
        <div className="w-full">
          <h3 className="mb-4 text-2xl">付款</h3>
          <Payment />
          {/* <p className="leading-7">
            感謝您選擇我們的產品！請確定你的訂單詳情，並點擊下方「繼續」按鈕以繼續付款。您將被重新導向到安全結帳頁面，以完成交易。請確保您的付款資訊準確無誤，並確保網路連線穩定。如果您遇到任何問題或有任何疑問，請隨時聯絡我們的客戶服務部。謝謝！
          </p>
          <div className="mt-12 flex gap-x-10">
            <button
              className="flex items-center justify-center gap-1 rounded border border-black bg-white px-10 py-2 text-black"
              onClick={handleBack}
            >
              <ChevronLeftIcon className="h-5 w-5" />
              返回
            </button>
            <button
              type="submit"
              className="flex items-center justify-center gap-1 rounded bg-black px-10 py-2 text-white"
            >
              繼續
              <ChevronRightIcon className="h-5 w-5" />
            </button>
          </div> */}
        </div>
        <div className="w-full">
          <h3 className="mb-4 text-2xl">訂單詳情</h3>
          <div className="rounded border border-gray-300 p-4">
            <div className="border-b border-gray-300 pb-4">
              {items.map(({ product, qty }) => (
                <div key={product.id} className="flex gap-x-4">
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
                  <div className="w-[45%]">
                    <p className="font-medium">{product.name}</p>
                    {!!product.description && (
                      <p className="mt-1 text-sm text-gray-600">
                        {product.description}
                      </p>
                    )}
                  </div>
                  <div className="w-[15%]">Qty: {qty}</div>
                  <div className="w-[20%] text-end">
                    <p>HKD {product.price * qty}</p>
                    <p className="text-sm text-gray-600">${product.price}/1</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex flex-col gap-y-2 pt-4">
              <div className="flex items-center justify-between">
                <p>小計:</p>
                <p>HKD {getProductsPrice()}</p>
              </div>
              <div className="flex items-center justify-between">
                <p>運費:</p>
                <p>HKD 30</p>
              </div>
              <div className="flex items-center justify-between font-bold">
                <p>總計:</p>
                <p>HKD {getProductsPrice() + 30}</p>
              </div>
            </div>
          </div>
        </div>
      </form>
    </section>
  );
};

export default CheckoutPaymentPage;
