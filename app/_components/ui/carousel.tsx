import React, { useCallback, useEffect, useRef, useState } from "react";
import { Swiper, SwiperClass, SwiperRef, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import Image from "next/image";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { StaticImport } from "next/dist/shared/lib/get-img-props";

interface CarouselProps {
  images: StaticImport[];
}

const Carousel: React.FC<CarouselProps> = (props) => {
  const { images } = props;
  const [currImageIndex, setCurrImageIndex] = useState(0);
  const swiperRef = useRef<SwiperClass | null>(null);
  const maxImageIndex = images.length - 1;

  const onSwiperRegister = (swiper: SwiperClass) => {
    swiper.on("slideChange", (swiper) => setCurrImageIndex(swiper.activeIndex));
    swiperRef.current = swiper;
  };

  const handlePrev = useCallback(() => {
    if (!swiperRef.current) return;
    swiperRef.current.slidePrev();
    setCurrImageIndex(currImageIndex - 1);
  }, [currImageIndex]);

  const handleNext = useCallback(() => {
    if (!swiperRef.current) return;
    swiperRef.current.slideNext();
    setCurrImageIndex(currImageIndex + 1);
  }, [currImageIndex]);

  const handleSelect = useCallback((index: number) => {
    setCurrImageIndex(index);
    if (!swiperRef.current) return;
    swiperRef.current.slideTo(index);
  }, []);

  useEffect(() => {
    return () => {
      if (!swiperRef.current) return;
      swiperRef.current.destroy();
    };
  }, []);

  return (
    <div className="w-full">
      <div className="group flex">
        <button
          onClick={handlePrev}
          className={`opacity-0 transition-opacity group-hover:opacity-100 ${currImageIndex === 0 && "text-slate-300"}`}
        >
          <ChevronLeftIcon className="h-12 w-12" />
        </button>
        <Swiper onSwiper={onSwiperRegister} slidesPerView={1}>
          {images.map((im, i) => (
            <SwiperSlide key={i}>
              <div className="mx-auto max-w-[90%]">
                <Image src={im} alt="" />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        <button
          onClick={handleNext}
          className={`opacity-0 transition-opacity group-hover:opacity-100 ${currImageIndex === maxImageIndex && "text-slate-300"}`}
        >
          <ChevronRightIcon className="h-12 w-12" />
        </button>
      </div>
      <div className="mx-auto mt-2 flex h-14 w-[90%] cursor-pointer items-center justify-center gap-2">
        {images.map((im, i) => (
          <div
            key={i}
            className={`h-full overflow-hidden ${currImageIndex === i && "border-4 border-sky-500"}`}
            onClick={() => handleSelect(i)}
          >
            <Image src={im} alt="" className="h-full w-auto object-contain" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
