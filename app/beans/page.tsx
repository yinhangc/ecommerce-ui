import {
  AdjustmentsHorizontalIcon,
  Bars3BottomLeftIcon,
} from "@heroicons/react/24/outline";
import Dropdown, { DropdownProps } from "../_components/ui/dropdown";
import brazilBeansImg from "@/public/brazil-cerrado-natural.png";
import colombiaBeansImg from "@/public/colombia-medellin-supremo.png";
import Image from "next/image";

const dropdownProps: { [key: string]: DropdownProps } = {
  roastLevel: {
    options: [
      { label: "全部烘焙度", value: "all" },
      { label: "淺焙", value: "light" },
      { label: "中焙", value: "medium" },
      { label: "中深焙", value: "medium-dark" },
      { label: "深焙", value: "dark" },
    ],
    defaultValue: "all",
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
    defaultValue: "all",
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
    defaultValue: "alphabetical-a-z",
    variant: "outline",
    type: "click",
    style: {
      width: "min-w-[159px]",
    },
  },
};

const productsData = [
  {
    id: "brazil-cerrado-natural",
    name: "Brazil Cerrado Natural 巴西 喜拉朵日曬",
    priceList: [
      { size: "100g", price: 75 },
      { size: "200g", price: 105 },
    ],
    image: brazilBeansImg,
  },
  {
    id: "colombia-medellin-supremo",
    name: "Colombia Medellin Supremo 哥倫比亞 梅德琳",
    priceList: [
      { size: "100g", price: 75 },
      { size: "200g", price: 105 },
    ],
    image: colombiaBeansImg,
  },
  {
    id: "brazil-cerrado-natural",
    name: "Brazil Cerrado Natural 巴西 喜拉朵日曬",
    priceList: [
      { size: "100g", price: 75 },
      { size: "200g", price: 105 },
    ],
    image: brazilBeansImg,
  },
  {
    id: "colombia-medellin-supremo",
    name: "Colombia Medellin Supremo 哥倫比亞 梅德琳",
    priceList: [
      { size: "100g", price: 75 },
      { size: "200g", price: 105 },
    ],
    image: colombiaBeansImg,
  },
];

export default function Beans() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-8">
      <h2 className="mb-8 text-3xl font-semibold">咖啡豆</h2>
      {/* Filter */}
      <div className="mb-8 flex w-full items-center justify-between">
        <div className="flex w-full items-center gap-3">
          <div className="flex min-w-[60px] items-center gap-1">
            <AdjustmentsHorizontalIcon className="h-6 w-6" />
            <span className="min-w-[35px]">選擇:</span>
          </div>
          <Dropdown {...dropdownProps["roastLevel"]} />
          <Dropdown {...dropdownProps["origin"]} />
        </div>
        <div className="flex w-full items-center justify-end gap-3">
          <div className="flex min-w-[60px] items-center gap-1">
            <Bars3BottomLeftIcon className="h-6 w-6" />
            <span className="min-w-[40px]">排序:</span>
          </div>
          <Dropdown {...dropdownProps["sortBy"]} />
        </div>
      </div>
      {/* Products */}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-8">
        {productsData.map(({ id, name, image }) => (
          <div key={id} className="cursor-pointer">
            <Image src={image} alt={name} />
            <div className="mt-3">
              <h3 className="text-xl">{name}</h3>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
