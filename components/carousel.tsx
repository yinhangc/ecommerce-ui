import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import React, { useCallback, useEffect, useRef, useState } from "react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { Swiper, SwiperClass, SwiperSlide } from "swiper/react";

interface CarouselProps {
  imagePaths: string[];
}

const Carousel: React.FC<CarouselProps> = (props) => {
  const { imagePaths } = props;
  const [currImageIndex, setCurrImageIndex] = useState(0);
  const swiperRef = useRef<SwiperClass | null>(null);
  const maxImageIndex = imagePaths.length - 1;

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
          disabled={currImageIndex === 0}
          onClick={handlePrev}
          className={`opacity-0 transition-opacity group-hover:opacity-100 ${currImageIndex === 0 && "text-slate-300"}`}
        >
          <ChevronLeftIcon className="h-12 w-12" />
        </button>
        <Swiper
          onSwiper={onSwiperRegister}
          slidesPerView={1}
          className="w-full"
        >
          {imagePaths.map((im, i) => (
            <SwiperSlide key={i}>
              <div className="mx-auto w-full">
                <Image
                  src={im}
                  alt=""
                  className="h-auto w-full"
                  sizes="100vw"
                  width="0"
                  height="0"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        <button
          disabled={currImageIndex === maxImageIndex}
          onClick={handleNext}
          className={`opacity-0 transition-opacity group-hover:opacity-100 ${currImageIndex === maxImageIndex && "text-slate-300"}`}
        >
          <ChevronRightIcon className="h-12 w-12" />
        </button>
      </div>
      <div className="mx-auto mt-2 flex h-14 w-[90%] cursor-pointer items-center justify-center gap-2">
        {imagePaths.map((im, i) => (
          <div
            key={i}
            className={`h-full overflow-hidden ${currImageIndex === i && "border-4 border-sky-500"}`}
            onClick={() => handleSelect(i)}
          >
            <Image
              src={im}
              alt=""
              className="h-full w-auto"
              sizes="100vw"
              width="0"
              height="0"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
