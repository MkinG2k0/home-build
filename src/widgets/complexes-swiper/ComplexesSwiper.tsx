import { IonRouterLink, IonText } from "@ionic/react";
import * as React from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import { TEXTS } from "../../shared/config";
import type { Complex } from "../../shared/model";
import { ComplexCard } from "../../shared/ui";

import "swiper/css";

export interface ComplexesSwiperProps {
  className?: string;
  complexes: Complex[];
}

const ComplexesSwiper = React.forwardRef<
  HTMLTableSectionElement,
  ComplexesSwiperProps
>(({ complexes }) => (
  <section>
    <IonText>
      <h2 className="mb-6 text-3xl! font-bold text-slate-800">
        {TEXTS.housing_complexes}
      </h2>
    </IonText>
    <Swiper
      breakpoints={{
        320: { slidesPerView: 2.5 },
        640: { slidesPerView: 3.5 },
        1024: { slidesPerView: 4.5 },
      }}
      grabCursor
      resistance
      resistanceRatio={0.85}
      slidesPerView={2.5}
      spaceBetween={14}
      touchEventsTarget="container"
      className=" overflow-visible!"
    >
      {complexes.map((c) => (
        <SwiperSlide key={c.id}>
          <IonRouterLink routerDirection="forward" routerLink={`/catalog/${c.id}`}>
            <ComplexCard complex={c} />
          </IonRouterLink>
        </SwiperSlide>
      ))}
    </Swiper>
  </section>
));

ComplexesSwiper.displayName = "ComplexesSwiper";

export { ComplexesSwiper };
