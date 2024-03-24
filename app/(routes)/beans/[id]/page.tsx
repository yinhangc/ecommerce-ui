"use client";

import RadioSelect, {
  RadioSelectProps,
} from "@/app/_components/ui/radioSelect";
import brazilBeansImg from "@/public/brazil-cerrado-natural.png";
import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

const product = {
  id: "brazil-cerrado-natural",
  name: "Brazil Cerrado Natural 巴西🇧🇷 喜拉朵日曬",
  origin: "Cerrado, Brazil",
  elevation: "1000-1200m",
  flavourEn: "Dark chocolate, Creamy, Smoked, Nuts",
  flavourZh: "黑巧克力、奶油、煙燻、堅果",
  roastLevel: "Medium Dark",
  acidity: "Light",
  process: "Natural",
  descriptionEn: `Brazilian Cerrado coffee is suitable for drip filtering and espresso brewing. It is highly beloved for its popular flavor profile, which includes the aroma of roasted walnuts and hazelnuts, complemented by a hint of caramel-like sweetness and rich chocolate flavors.

    This coffee is cultivated by thousands of small farmers in the Cerrado region of Brazil, located in the lush and diverse Cerrado belt, which is one of the largest coffee exporting regions globally. The area is renowned for its mix of grasslands, woodlands, and forests, as well as its fertile soil known as "Terra Roxa" (Red Earth) by the locals. The combination of high daytime temperatures and a dry environment makes the Cerrado region ideal for coffee cultivation at relatively low altitudes (around 1,100 meters) compared to other Central and South American coffee-growing regions.
    
    These unique qualities have granted the Cerrado region the first Protected Designation of Origin (PDO) status in Brazil, similar to the protection specifications for Iberian ham or champagne. This means that coffee labeled as "Cerrado" must originate from the Cerrado region. For customers who appreciate single-origin coffee, they not only enjoy its distinct flavor characteristics but also value the ethics, traceability, and highest quality that it represents. Brazilian Cerrado coffee is a unique brew that will soon become an essential choice.`,
  descriptionZh: `適合滴濾和濃縮咖啡的巴西喜拉朵咖啡，因其受歡迎的味道特點而備受喜愛，包括烤核桃和榛子的香氣，再加上一絲焦糖般的甜味和濃鬱的巧克力風味。

    這種咖啡由巴西喜拉朵地區的數千名小農種植，該地區位於茂盛多樣的喜拉朵地帶，是全球最大的咖啡出口國之一。這個地區以大草原、林地和森林的混合以及土壤肥沃而聞名，當地人稱之為“Terra Roxa”（紅土）。加上高白天溫度和乾燥的地區環境，這些種植條件使得喜拉朵地區相對於其他中美洲和南美洲的咖啡來說，在較低海拔（約1,100米）種植咖啡非常理想。
    
    這些獨特的品質使得喜拉朵成為巴西首個獲得原產地保護地位的地區，這意味著標有“Cerrado”標籤的咖啡必須來自喜拉朵地區（類似於保護伊比利亞火腿或香檳的規定） 。對於那些欣賞單一產地咖啡的顧客來說，他們不僅欣賞其獨特的風味特點，還欣賞其代表的倫理、可追溯和最高品質的咖啡。巴西喜拉朵咖啡是一款獨特的咖啡，很快就會成為必備的選擇。`,
  priceList: [
    { size: "100g", price: 80 },
    { size: "200g", price: 130 },
  ],
  image: brazilBeansImg,
};

const radioSelectProps: { [key: string]: RadioSelectProps } = {
  weight: {
    label: "重量",
    groupId: "weight",
    options: [
      { label: "100g", value: "100g" },
      { label: "200g", value: "200g" },
    ],
    defaultValue: "100g",
  },
};

interface BeanFormInput {
  weight: string;
}

const BeanPage = () => {
  const { setValue, watch, handleSubmit } = useForm<BeanFormInput>();

  const onSubmit: SubmitHandler<BeanFormInput> = (data) =>
    console.log("submit!", data);

  useEffect(() => {
    const subscription = watch((value, { name, type }) =>
      console.log("bean subscription", value),
    );
    return () => subscription.unsubscribe();
  }, [watch]);

  return (
    <section className="mx-auto max-w-7xl px-6 py-8">
      <div className="flex items-center justify-center">
        <div className="w-1/2"></div>
        <div className="w-1/2">
          <h2 className="mb-8 text-3xl font-semibold">{product.name}</h2>
          <div className="mb-8 text-xl">HKD 100</div>
          <form onSubmit={(e) => e.preventDefault()}>
            <div className="mb-8 flex flex-col gap-3">
              <RadioSelect
                {...radioSelectProps["weight"]}
                formKey="weight"
                setValue={setValue}
              />
            </div>
            <button onClick={handleSubmit(onSubmit)}>加至購物車</button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default BeanPage;
