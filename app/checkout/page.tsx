"use client";

import FormInputField from "@/components/form/formInputField";
import Stepper from "@/components/stepper";
import { ChevronRightIcon } from "@heroicons/react/24/outline";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

const checkoutFormInputSchema = z.object({
  email: z.string().email("請填寫正確的電郵地址"),
});

type CheckoutFormInputSchemaType = z.infer<typeof checkoutFormInputSchema>;
const CheckoutPage = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CheckoutFormInputSchemaType>({
    defaultValues: {
      email: "",
    },
    resolver: zodResolver(checkoutFormInputSchema),
  });

  const onSubmit: SubmitHandler<CheckoutFormInputSchemaType> = (data) => {
    console.log(data);
    router.push("/checkout/address");
  };

  return (
    <section className="mx-auto max-w-2xl px-6 py-12">
      <Stepper stage={0} />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mx-auto mt-12 flex w-full flex-col items-center justify-center"
      >
        <p className="mb-4">請提供您的電郵地址以便第一時間獲取訂單資訊:</p>
        <div className="mb-12 w-full">
          <FormInputField
            name="email"
            label="電郵地址"
            placeholder="Email address"
            required={true}
            register={register}
            error={errors["email"]}
          />
        </div>
        <button
          type="submit"
          className="flex items-center justify-center gap-1 rounded bg-black px-10 py-2 text-white"
        >
          繼續
          <ChevronRightIcon className="h-5 w-5" />
        </button>
      </form>
    </section>
  );
};

export default CheckoutPage;
