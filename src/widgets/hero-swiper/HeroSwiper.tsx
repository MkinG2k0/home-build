import * as React from "react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import { cn, getStrapiImageUrl } from "../../shared/lib";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { StrapiSlide } from "../../shared/model";

const SKELETON_SLIDES_COUNT = 1;

export interface HeroSwiperProps {
  slides?: StrapiSlide[];
}

const HeroSwiperSkeleton: React.FC = () => (
  <div className="aspect-video w-full overflow-hidden rounded-xl">
    <div className="flex h-full gap-2">
      {Array.from({ length: SKELETON_SLIDES_COUNT }).map((_, index) => (
        <div
          className="h-full min-w-0 flex-1 animate-pulse rounded-lg bg-slate-200"
          key={index}
        />
      ))}
    </div>
  </div>
);

const HeroSwiper: React.FC<HeroSwiperProps> = ({ slides }) => {
  const isLoading = slides === undefined || slides.length === 0;

  if (isLoading) {
    return (
      <div className={cn("hero-swiper relative")}>
        <HeroSwiperSkeleton />
      </div>
    );
  }

  return (
    <div className={cn("hero-swiper relative")}>
      <Swiper
        autoplay={{ delay: 3000, pauseOnMouseEnter: true }}
        className="aspect-video w-full overflow-hidden rounded-xl"
        grabCursor
        loop={true}
        modules={[Autoplay, Navigation, Pagination]}
        navigation
        pagination={{
          bulletClass: "hero-swiper-bullet",
          bulletActiveClass: "hero-swiper-bullet-active",
          clickable: true,
          el: ".hero-swiper-pagination",
        }}
        slidesPerView={1}
        spaceBetween={0}
        touchEventsTarget="container"
        touchRatio={1}
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <img
              alt=""
              className="size-full object-cover"
              src={getStrapiImageUrl(slide.img.url)}
            />
          </SwiperSlide>
        ))}
      </Swiper>
      <div
        aria-hidden
        className="hero-swiper-pagination absolute bottom-3 left-0 right-0 z-20 flex justify-center gap-1.5"
      />
    </div>
  );
};

HeroSwiper.displayName = "HeroSwiper";

export { HeroSwiper };
