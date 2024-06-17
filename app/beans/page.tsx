"use client";

import Dropdown, { DropdownProps } from "@/components/dropdown";
import brazilCerradoNaturalImg from "@/public/beans/brazil-cerrado-natural.png";
import brazilObataImg from "@/public/beans/brazil-obata.png";
import brazilSantosImg from "@/public/beans/brazil-santos.png";
import colombiaCaturraImg from "@/public/beans/colombia-caturra.png";
import colombiaElObrajeImg from "@/public/beans/colombia-el-obraje.png";
import colombiaMedellinSupremoImg from "@/public/beans/colombia-medellin-supremo.png";
import colombiaMonteBonitoImg from "@/public/beans/colombia-monte-bonito.png";
import yunnanHoneyProcessedImg from "@/public/beans/yunnan-honey-process.png";
import yunnanKongQueImg from "@/public/beans/yunnan-kong-que.png";
import {
  AdjustmentsHorizontalIcon,
  Bars3BottomLeftIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";

const dropdownProps: { [key: string]: DropdownProps } = {
  roastLevel: {
    options: [
      { label: "全部烘焙度", value: "all" },
      { label: "淺焙", value: "light" },
      { label: "中焙", value: "medium" },
      { label: "中深焙", value: "medium-dark" },
      { label: "深焙", value: "dark" },
    ],
    variant: "outline",
    type: "click",
    style: {
      width: "min-w-[134px]",
    },
  },
  origin: {
    options: [
      { label: "全部產地", value: "all" },
      { label: "混合", value: "blend" },
      { label: "單一品種", value: "single-origin" },
    ],
    variant: "outline",
    type: "click",
    style: {
      width: "min-w-[118px]",
    },
  },
  sortBy: {
    options: [
      { label: "按字母, A-Z", value: "alphabetical-a-z" },
      { label: "按字母, Z-A", value: "alphabetical-z-a" },
      { label: "價格, 從低至高", value: "price-lowest-to-highest" },
      { label: "價格, 從高至低", value: "price-highest-to-lowest" },
      { label: "日期, 從舊至新", value: "date-oldest-to-newest" },
      { label: "日期, 從新至舊", value: "date-newest-to-oldest" },
    ],
    variant: "outline",
    type: "click",
    style: {
      width: "min-w-[159px]",
    },
  },
};

const productsData = [
  // https://perkcoffee.co/hk-en/product/brazil-cerrado/#/?attribute_pa_preparation=wholebean&attribute_pa_brew-method=none&attribute_pa_size=250g-bag
  // https://giraffecoffee.co/brazil-cerrado/
  {
    id: "1",
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
    image: brazilCerradoNaturalImg,
  },
  // https://sucafina.com/na/offerings/santos-natural
  {
    id: "2",
    name: "Brazil Santos 巴西🇧🇷 桑托斯",
    origin: "São Paulo, Brazil",
    elevation: "800-1300m",
    flavourEn: "Peanut, Sugar cane, White sugar",
    flavourZh: "花生、甘蔗、白砂糖",
    roastLevel: "Medium",
    acidity: "Light to Medium",
    process: "Natural",
    descriptionEn: `In Brazil, the term "Santos" is synonymous with high-quality coffee. This name originates from the port of Santos, which has been one of Brazil's largest coffee export ports. Prior to the 1990s, coffee was classified as Santos 1, Santos 2, Santos 3, and so on. Although the grading system has since changed, the name Santos has been preserved due to its good reputation.

    As the world's largest coffee-producing country, Brazil has a wide variety of coffee species and production conditions. Every year, a range of high-quality coffees is produced, allowing for the continuous supply of high-quality blended coffee. Brazilian Santos is known for its sweet and smooth taste, making it highly popular. It has a medium-bodied texture and a mild flavor reminiscent of cream. Due to its consistent characteristics, this coffee serves as an excellent foundation for any blend, allowing you to savor the beloved flavor over and over again.`,
    descriptionZh: `在巴西，桑托斯（Santos）正在著手建造高品質的咖啡。這個名字源自桑托斯港口，該港口一直是巴西最大的咖啡出口港口之一。在1990年代之前，咖啡被分成桑托斯1號、桑托斯2號、桑托斯3號等。雖然分級制度此後發生了改變，但桑托斯這個名字借鑒了良好的系統而保留至今。

    作為全球最大的咖啡生產國，巴西擁有非常廣泛的品種和生產條件，每年咖啡生產一系列供給選擇的優質咖啡，使得持續提供高品質的混合咖啡成為可能。巴西桑托斯恢復清醒而順滑的口感而聞名，廣受歡迎，具有中等酒精厚重的口感和奶油般的溫和風味。由於提供瞭如此一致的特點，這種咖啡是任何混合咖啡的絕佳基礎，讓您再次回味相同心愛的風味。`,
    priceList: [
      { size: "100g", price: 90 },
      { size: "200g", price: 150 },
    ],
    image: brazilSantosImg,
  },
  {
    id: "3",
    name: "Brazil Obata 巴西🇧🇷 歐巴塔",
    origin: "Minas Gerias, Brazil",
    elevation: "1000-1100m",
    flavourEn: "Berry jam, Plum wine, Raisins, Tropical fruits",
    flavourZh: "莓果果醬、梅酒、葡萄乾、熱帶水果",
    roastLevel: "Medium Dark",
    acidity: "Medium to High",
    process: "Natural",
    descriptionEn: `Obata is a coffee variety that was developed in Brazil and recently introduced in Costa Rica. It is a rare variety with a complex origin: it is a hybrid of Sarchimor and Mundo Novo. Mundo Novo is a cross between Bourbon and Typica, known as the New World variety. This plant has relatively high nutrient requirements but produces a high yield and is resistant to coffee rust, making it increasingly popular among coffee farmers. In terms of taste, the Obata variety is a clean and balanced coffee with delicate yet pronounced acidity, which makes it impressive due to its unique flavor. The volcanic soil characteristics of Costa Rica seem to have a particularly positive impact on this variety.`,
    descriptionZh: `奧巴塔（Obata）咖啡品種在巴西培育，並最近在哥斯達黎加引入。這是一種罕見的品種，其起源複雜：它由薩奇莫（Sarchimor）和蒙多諾沃（Mundo Novo）雜交而來。新世界是波本（Bourbon）和提比卡（Typica）的交叉品種。這種植物對養分要求相當高，但產量非常高，並且對咖啡銹病有抗性，因此在咖啡農民中越來越受歡迎。在口感方面，奧巴塔品種是一種純淨而平衡的咖啡，具有細膩但明顯的酸度，因此以其獨特的風味而令人印象深刻。哥斯達黎加火山土壤的土壤特性似乎對此有特別正面的影響。`,
    priceList: [
      { size: "100g", price: 80 },
      { size: "200g", price: 130 },
    ],
    image: brazilObataImg,
  },
  // https://www.roastmasters.com/medellinx.html
  {
    id: "4",
    name: "Colombia Medellin Supremo 哥倫比亞🇨🇴 梅德琳",
    origin: "Medellin, Colombia",
    elevation: "1600-1850m",
    flavourEn: "Walnut, Cedar, Spice, Caramel, Dried dark fruit",
    flavourZh: "核桃、雪松、香料、焦糖、深色水果乾",
    roastLevel: "Medium",
    acidity: "Light to Medium",
    process: "Fully Washed",
    descriptionEn: `Medellín is a trading city in the Antioquia region of Colombia, located in the northwest of the capital city, Bogotá. It is one of the larger coffee-producing areas in Colombia. The region produces the majority of Colombian coffee, which is graded based on bean size. This grading includes various classifications of Excelso, ranging from screen sizes 14 to 16.5, as well as Supremo, with a screen size above 17. Therefore, Supremo is the largest coffee bean, apart from a small portion known as "elephant beans" or Maragogype, which is a minor part of Colombia's production. Medellín coffee has a medium body and is typically not as fruity/winey as coffee from other regions in Colombia. This coffee has a balanced flavor and can be enjoyed at any time. The coffee harvesting season in this area runs from September to December, and it generally arrives in the United States in early to late spring.

    The farms are situated at altitudes ranging from around 5,200 to 6,000 feet. The ripe coffee cherries are mostly handpicked by women in the region, then undergo traditional wet fermentation processing. They are washed using a series of channels with pure mountain spring water and finally dried on patios. Supremo coffee beans are large and uniform, with over 90% of the beans exceeding screen size 18.
    
    Supremo coffee beans are a combination of many small landowners and can be used to create simple, clean, and versatile coffee. They can be used as single-origin coffee, blended with other ingredients to enhance brightness and mildness, or for dark roasting. These beans have high density, durability, and larger particles.`,
    descriptionZh: `梅德琳是安提奧基亞州的一個貿易城市，位於首都波哥大的西北部，是哥倫比亞較大的咖啡產區之一。該地區生產了大部分以豆子大小分級的哥倫比亞咖啡。這些大小包括各種Excelso的分類，可以是14到16.5號篩網，以及Supremo，螢幕大小為17號以上。因此，Supremo是最大的咖啡豆，除了被稱為「大象豆」的Maragogype，這是哥倫比亞產量的一小部分。梅德琳咖啡具有中等口感，通常不像來自哥倫比亞其他地區的咖啡那樣具有水果/葡萄酒味。這種咖啡口感平衡，可以在任何時間享用。該地的咖啡收穫季節為9月至12月，美國一般在春季早期至晚春季到貨。

    農場海拔一般在大概5200至6000英尺之間。成熟的咖啡漿果由該地區的大多數婦女手工採摘，然後經過傳統發酵濕法處理，在純淨的山泉水中使用一系列渠道進行洗滌，最後在露台上晾曬。 Supremo咖啡豆大而均勻，90%的豆子篩網尺寸超過18號。
    
    Supremo咖啡豆是由許多小地主合併而成，可以製作簡單、乾淨和多用途的咖啡。它們可以用作單品咖啡，混合配料以增加明亮度和溫和的口感，也可以用於深烘焙。它們密度高，耐久且顆粒較大。`,
    priceList: [
      { size: "100g", price: 70 },
      { size: "200g", price: 120 },
    ],
    image: colombiaMedellinSupremoImg,
  },
  // https://www.delafincacoffee.com/blog/bean-basics-intro-to-the-caturra-varietal
  {
    id: "5",
    name: "Colombia Caturra 哥倫比亞🇨🇴 卡杜拉",
    origin: "Caldas, Colombia",
    elevation: "1400-1800m",
    flavourEn: "Cherry, Caramel, White chocolate",
    flavourZh: "櫻桃、焦糖、白巧克力",
    roastLevel: "Light",
    acidity: "Medium",
    process: "Fully Washed",
    descriptionEn: `Caturra is a varietal originating from Brazil. It was first discovered in the early 20th century and is a naturally occurring mutation of the Bourbon varietal. Caturra is a dwarf variety, meaning that it is shorter in stature compared with other coffee plants. This makes it easier to maintain and harvest, which is one of the reasons why it's so popular.

    The Caturra varietal is known for generally having bright acidity, balanced body, and a nice complexity. It also can have a sweet aftertaste, making it well sought after by coffee buyers.`,
    descriptionZh: `Caturra是一種起源於巴西的品種。它最早發現於20世紀初，是波本品種的自然突變。 Caturra是一種矮生品種，與其他咖啡植物相比，它的身材較矮。這使得它更容易維護和收穫，這也是它如此受歡迎的原因之一。

    Caturra品種通常以明亮的酸度、中等的酒體和良好的複雜性而聞名。它還可能具有甜美的餘韻，這使得它備受咖啡買家追捧。`,
    priceList: [
      { size: "100g", price: 90 },
      { size: "200g", price: 150 },
    ],
    image: colombiaCaturraImg,
  },
  // https://www.mistobox.com/colombia-el-obraje
  {
    id: "6",
    name: "Colombia El Obraje 哥倫比亞🇨🇴 奧博拉",
    origin: "Nariño, Colombia",
    elevation: "1900m",
    flavourEn: "Caramel, Citrus, Raspberry, Apple, Honey, Toffee",
    flavourZh: "焦糖、柑橘、覆盆子、蘋果、蜂蜜、拖肥糖",
    roastLevel: "Light",
    acidity: "Medium",
    process: "Fully Washed",
    descriptionEn: `Located in the Nariño region of Colombia, the Hacienda El Obraje farm is owned and operated by Pablo Andrés Grelro. While this farm has been in his family for 80 years, with 75 of those years dedicated to apple cultivation, it has only been in the past 5 years that they started growing coffee. In this short period of time, they have been able to produce an amazing coffee! Their coffee bean is remarkably well-balanced, with aromas of honey and toffee sweetness. It has a juicy raspberry and apple flavor that accompanies a pleasant acidity in the forefront.`,
    descriptionZh: `位於哥倫比亞的納里尼奧地區，Hacienda El Obraje農場由帕布羅·安德烈斯·格雷羅擁有和經營。雖然這座農場已經在他的家族手中傳承了80年，但其中75年都是種植蘋果，只有最近的5年才開始種植咖啡。在這短暫的時間裡，他們已經能夠生產出一種令人驚嘆的咖啡！它的咖啡豆非常平衡，帶有蜂蜜和拖肥糖甜味的香氣，前味酸度中有多汁的覆盆子和蘋果的味道。`,
    priceList: [
      { size: "100g", price: 125 },
      { size: "200g", price: 230 },
    ],
    image: colombiaElObrajeImg,
  },
  // https://www.footprintcoffee.co.uk/product/colombia-monte-bonito/
  {
    id: "7",
    name: "Colombia Monte Bonito 哥倫比亞🇨🇴 博尼託山",
    origin: "Monte Bonito, Colombia",
    elevation: "1700m",
    flavourEn: "Mandarin, Orange blossom, Nutmeg, Toffee",
    flavourZh: "柑橘、橙花、肉荳蔻、拖肥糖",
    roastLevel: "Medium",
    acidity: "Medium",
    process: "Fully Washed",
    descriptionEn: `These beans have a lovely spiced orange brightness with a satisfying full body and a toffee finish. They are produced by a small group of farmers from the tiny town of Monte Bonito. Most of the coffee growers from this region are very small with only between 1 to 3 hectares each. There are 89 farmers in this group, each are responsible for the full management of their farm, picking the coffee themselves and only asking for help from their neighbours when needed.

    During the harvest the coffee is picked, depulped and left to ferment for between 16 to 18 hours. Next day the coffee is washed and is then ready for drying. The group members have different drying methods. Some have drying platforms on the roof of the house;others have raised drying beds with a rail system; the rest have a parabolic tents for drying the coffee for between 10-14 days depending on the climate.
    
    They are then supported by the Manizales Cooperative, which help assess and separate the beans according to quality. The producers receive extra payment for high-quality beans. There is also an extra premium for producers who deliver the coffee to the Cooperartive below 11% moisture.`,
    descriptionZh: `這些豆子具有可愛的香料橙色亮度，具有令人滿意的濃鬱口感和太妃糖的餘味。它們是由來自蒙特博尼托小鎮的一小群農民生產的。該地區的大多數咖啡種植者規模都非常小，每個種植面積僅在 1 至 3 公頃之間。這個小組有 89 位農民，每個人都負責自己農場的全面管理，自己採咖啡，只在需要時向鄰居尋求幫助。

    收穫期間，咖啡被採摘、去果肉並發酵 16 至 18 小時。第二天，咖啡被清洗並準備乾燥。小組成員有不同的乾燥方法。有些在屋頂上有乾燥平台；有些則有帶軌道系統的高架乾燥床；有些則在屋頂上設有乾燥平台。其餘的則設有拋物線形帳篷，根據氣候狀況將咖啡乾燥 10 至 14 天。
    
    然後他們得到馬尼薩萊斯合作社的支持，該合作社幫助根據品質評估和分離咖啡豆。生產者可以獲得優質咖啡豆的額外報酬。對於向合作社提供水分低於 11% 的咖啡的生產商來說，還有額外的溢價。`,
    priceList: [
      { size: "100g", price: 80 },
      { size: "200g", price: 130 },
    ],
    image: colombiaMonteBonitoImg,
  },
  // https://coffeeroasters.com.hk/products/yunnan-kongque-washed-coffee
  {
    id: "8",
    name: "Yunnan KongQue 雲南🇨🇳 孔雀",
    origin: "Yunnan, China",
    elevation: "1400-1600m",
    flavourEn: "Jasmine, Citrus, Tangerine",
    flavourZh: "茉莉、柑橘、橘子",
    roastLevel: "Light",
    acidity: "Medium",
    process: "Fully Washed",
    descriptionEn: `The Yunnan KongQue Washed Coffee consists of high-quality coffee beans sourced from different farms in the Yunnan region of China. This single-origin coffee undergoes a complete washing process and is roasted to a light level. It offers a crisp and refreshing taste with notes of jasmine and citrus, culminating in a delightful tangerine finish. The coffee exhibits a clean and light-bodied profile.`,
    descriptionZh: `雲南孔雀水洗咖啡由來自中國雲南地區不同農場的優質咖啡豆組成。這種單一產地咖啡經過完整的洗滌過程並被輕度烘焙。它口感清爽，帶有茉莉花和柑橘的香氣，最後帶來令人愉悅的橘子餘味。咖啡呈現出乾淨、輕盈的口感。`,
    priceList: [
      { size: "100g", price: 70 },
      { size: "200g", price: 120 },
    ],
    image: yunnanKongQueImg,
  },
  // https://www.avidcoffeehk.com/products/%E9%9B%B2%E5%8D%97-%E7%93%8A%E7%91%A4%E6%BC%BF%E8%9C%9C%E8%99%95%E7%90%86-yunnan-honey-process-%E6%96%B0%E9%AE%AE%E7%83%98%E7%84%99%E5%92%96%E5%95%A1%E8%B1%86-%E8%90%BD%E5%96%AE%E5%8D%B3%E7%83%98-68-100g-108-200g
  // https://www.kopicoffeeco.com/products/yunnanhoney
  {
    id: "9",
    name: "Yunnan Honey Process 雲南🇨🇳 瓊瑤漿蜜處理",
    origin: "Yunnan",
    elevation: "1400m",
    flavourEn: "Red wine, Fruity Syrup, Passion Fruit, Berries",
    flavourZh: "紅酒、果味糖漿、百香果、莓果",
    roastLevel: "Medium",
    acidity: "Medium",
    process: "Honey Process",
    descriptionEn: `In 1987, Jane Luo and her husband embarked on their coffee-growing journey at Yirong Farm, pioneering coffee cultivation in Menglian prefecture, Yunnan. Fast forward over 30 years, their daughter Jean Luo is now collaborating with her mother, Jane, to propel their business to new heights by venturing into the realm of coffee exports.

    The coffee produced by their farm is certified organic and embraces sustainable practices. Compost is utilized as a natural fertilizer for the coffee trees, eradicating the requirement for chemical pesticides. Additionally, the farm benefits from a constant water supply provided by a mountain spring throughout the year.`,
    descriptionZh: `1987年，Jane和丈夫在Yirong農場開始了咖啡種植之旅，開創了雲南孟連地區咖啡種植的先河。 30 多年過去了，他們的女兒 Jean Luo 現在與母親 Jane 合作，涉足咖啡出口領域，將他們的業務推向新的高度。

    他們農場生產的咖啡經過有機認證，並採用永續實踐。堆肥被用作咖啡樹的天然肥料，消除了對化學農藥的需求。此外，該農場還受益於山泉全年不間斷的供水。`,
    priceList: [
      { size: "100g", price: 70 },
      { size: "200g", price: 120 },
    ],
    image: yunnanHoneyProcessedImg,
  },
];

interface BeansFormInput {
  roastLevel: string;
  origin: string;
  sortBy: string;
}

const BeansPage = () => {
  const { control, watch } = useForm<BeansFormInput>({
    defaultValues: {
      roastLevel: "all",
      origin: "all",
      sortBy: "alphabetical-a-z",
    },
  });

  useEffect(() => {
    const subscription = watch((value, { name, type }) =>
      console.log("beans subscription", value),
    );
    return () => subscription.unsubscribe();
  }, [watch]);

  return (
    <section className="mx-auto max-w-7xl px-6 py-8">
      <h2 className="mb-8 text-3xl font-semibold">咖啡豆</h2>
      {/* Filter */}
      <form
        className="mb-8 flex w-full items-center justify-between"
        onSubmit={(e) => e.preventDefault()}
      >
        <div className="flex w-full items-center gap-3">
          <div className="flex min-w-[60px] items-center gap-1">
            <AdjustmentsHorizontalIcon className="h-6 w-6" />
            <span className="min-w-[35px]">選擇:</span>
          </div>
          <Controller
            control={control}
            name="roastLevel"
            render={({ field: { value, onChange } }) => (
              <Dropdown
                {...dropdownProps["roastLevel"]}
                value={value}
                onChange={onChange}
              />
            )}
          />
          <Controller
            control={control}
            name="origin"
            render={({ field: { value, onChange } }) => (
              <Dropdown
                {...dropdownProps["origin"]}
                value={value}
                onChange={onChange}
              />
            )}
          />
        </div>
        <div className="flex w-full items-center justify-end gap-3">
          <div className="flex min-w-[60px] items-center gap-1">
            <Bars3BottomLeftIcon className="h-6 w-6" />
            <span className="min-w-[40px]">排序:</span>
          </div>
          <Controller
            control={control}
            name="sortBy"
            render={({ field: { value, onChange } }) => (
              <Dropdown
                {...dropdownProps["sortBy"]}
                value={value}
                onChange={onChange}
              />
            )}
          />
        </div>
      </form>
      {/* Products */}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-8">
        {productsData.map(({ id, name, image }) => (
          <div key={id} className="cursor-pointer">
            <Link href={`/beans/${id}`} className="inline-block h-full w-full">
              <Image src={image} alt={name} />
              <div className="mt-3">
                <h3 className="text-xl">{name}</h3>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
};

export default BeansPage;
