import * as React from "react";
import { FreeMode } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import { TEXTS } from "../../shared/config";
import type { Complex } from "../../shared/model";
import { ComplexCard } from "../../shared/ui";

import "swiper/css";
import { IonText } from "@ionic/react";

export interface ComplexesSwiperProps {
  className?: string;
  complexes: Complex[];
}

const ComplexesSwiper = React.forwardRef<
  HTMLTableSectionElement,
  ComplexesSwiperProps
>(({ className, complexes }, ref) => (
  <section className={className} ref={ref}>
    <IonText>
      <h2 className="mb-6 text-4xl! font-bold text-slate-800">
        {TEXTS.housing_complexes}
      </h2>
    </IonText>
    <Swiper
      breakpoints={{
        320: { slidesPerView: 1.15 },
        640: { slidesPerView: 2 },
        1024: { slidesPerView: 3 },
      }}
      className="overflow-visible! pb-2"
      freeMode={{ enabled: true, momentum: true }}
      grabCursor
      modules={[FreeMode]}
      resistance
      resistanceRatio={0.85}
      slidesPerView={1.15}
      spaceBetween={2}
      touchEventsTarget="container"
    >
      {complexes.map((c) => (
        <SwiperSlide key={c.id}>
          <ComplexCard complex={c} />
        </SwiperSlide>
      ))}
    </Swiper>
  </section>
));

ComplexesSwiper.displayName = "ComplexesSwiper";

export { ComplexesSwiper };
