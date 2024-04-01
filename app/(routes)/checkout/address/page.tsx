"use client";

import FormDropdown from "@/app/_components/form/formDropdown";
import FormInputField from "@/app/_components/form/formInputField";
import FormRadioSelect from "@/app/_components/form/formRadioSelect";
import Stepper from "@/app/_components/stepper";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { FieldErrors, SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

const requiredError = "請填寫此欄位";

const checkoutAddressFormInputShippingSchema = z.object({
  deliveryOption: z.literal("shipping"),
  surname: z.string().min(1, requiredError),
  name: z.string().min(1, requiredError),
  address1: z.string().min(1, requiredError),
  address2: z.string().min(1, requiredError),
  address3: z.string().min(1, requiredError),
  region: z.string().min(1, requiredError),
  phone: z.string().regex(/^[0-9]{8}$/, "請填寫正確的電話號碼"),
});
const checkoutAddressFormInputSelfPickupSchema = z.object({
  deliveryOption: z.literal("self-pickup"),
  selfPickupAddress: z.string(),
});

const checkoutAddressFormInputSchema = z.discriminatedUnion("deliveryOption", [
  checkoutAddressFormInputShippingSchema,
  checkoutAddressFormInputSelfPickupSchema,
]);

type CheckoutAddressFormInputShippingSchema = z.infer<
  typeof checkoutAddressFormInputShippingSchema
>;
type CheckoutAddressFormInputSelfPickupSchema = z.infer<
  typeof checkoutAddressFormInputSelfPickupSchema
>;
type CheckoutAddressFormInputSchemaType = z.infer<
  typeof checkoutAddressFormInputSchema
>;

const CheckoutAddressPage = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<CheckoutAddressFormInputSchemaType>({
    defaultValues: {
      deliveryOption: "shipping",
      surname: "",
      name: "",
      address1: "",
      address2: "",
      address3: "",
      region: "hk",
      phone: "",
    },
    resolver: zodResolver(checkoutAddressFormInputSchema),
  });

  const watchDeliveryOption = watch("deliveryOption");
  if (watchDeliveryOption === "self-pickup")
    setValue("selfPickupAddress", "mk");

  const onSubmit: SubmitHandler<CheckoutAddressFormInputSchemaType> = (
    data,
  ) => {
    console.log("data", data);
    router.push("/checkout/payment");
  };

  const handleBack = () => {
    router.push("/checkout");
  };

  return (
    <section className="mx-auto max-w-3xl px-6 py-12">
      <Stepper stage={1} />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mx-auto mt-12 flex flex-col items-center justify-center"
      >
        <div className="mb-16 w-full">
          <h3 className="mb-4 text-center text-2xl">請選擇您的送貨選項：</h3>
          <FormRadioSelect
            name="deliveryOption"
            register={register}
            options={[
              { label: "郵寄", value: "shipping" },
              { label: "店內自取", value: "self-pickup" },
            ]}
          />
        </div>
        {watchDeliveryOption === "shipping" && (
          <div className="mb-12 w-full">
            <h3 className="mb-4 text-center text-2xl">請填寫您的收貨地址：</h3>
            <div className="mb-6 flex gap-x-6">
              <FormInputField
                name="surname"
                label="姓氏"
                placeholder="姓氏"
                required={true}
                register={register}
                error={
                  (
                    errors as FieldErrors<CheckoutAddressFormInputShippingSchema>
                  )["surname"]
                }
              />
              <FormInputField
                name="name"
                label="名字"
                placeholder="名字"
                required={true}
                register={register}
                error={
                  (
                    errors as FieldErrors<CheckoutAddressFormInputShippingSchema>
                  )["name"]
                }
              />
            </div>
            <div className="mb-6 flex flex-col gap-y-6">
              <FormInputField
                name="address1"
                label="地址欄1"
                placeholder="地址欄1"
                required={true}
                register={register}
                error={
                  (
                    errors as FieldErrors<CheckoutAddressFormInputShippingSchema>
                  )["address1"]
                }
              />
              <FormInputField
                name="address2"
                label="地址欄2"
                placeholder="地址欄2"
                required={true}
                register={register}
                error={
                  (
                    errors as FieldErrors<CheckoutAddressFormInputShippingSchema>
                  )["address2"]
                }
              />
              <FormInputField
                name="address3"
                label="地址欄3"
                placeholder="地址欄3"
                required={true}
                register={register}
                error={
                  (
                    errors as FieldErrors<CheckoutAddressFormInputShippingSchema>
                  )["address3"]
                }
              />
            </div>
            <div className="flex gap-x-6">
              <FormDropdown
                name="region"
                label="地區"
                required={true}
                register={register}
                options={[{ label: "香港", value: "hk" }]}
                classes="flex-1"
              />
              <FormInputField
                name="phone"
                label="電話號碼"
                placeholder="電話號碼"
                register={register}
                required={true}
                classes="flex-1"
                error={
                  (
                    errors as FieldErrors<CheckoutAddressFormInputShippingSchema>
                  )["phone"]
                }
              />
            </div>
          </div>
        )}
        {watchDeliveryOption === "self-pickup" && (
          <div className="mb-12 w-full">
            <h3 className="mb-4 text-center text-2xl">
              請選擇你的取貨門市地址：
            </h3>
            <FormRadioSelect
              name="selfPickupAddress"
              register={register}
              options={[
                { label: "旺角山東街2號 7樓4B號店", value: "mk" },
                { label: "元朗安寧路143-146號 金城樓地下A舖", value: "yl" },
              ]}
              classes="grid grid-cols-2 gap-x-6 gap-y-2"
            />
          </div>
        )}
        <div className="flex gap-x-10">
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
        </div>
      </form>
    </section>
  );
};

export default CheckoutAddressPage;
