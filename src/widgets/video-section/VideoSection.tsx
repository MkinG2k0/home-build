import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonModal,
  IonText,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { close } from "ionicons/icons";
import * as React from "react";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import { TEXTS } from "../../shared/config";
import { cn } from "../../shared/lib";
import type { VideoItem } from "../../shared/model";
import { VideoCard } from "../../shared/ui";

import "swiper/css";
import "swiper/css/navigation";

export interface VideoSectionProps {
  className?: string;
  videos: VideoItem[];
}

const VideoSection = React.forwardRef<
  HTMLTableSectionElement,
  VideoSectionProps
>(({ videos }) => {
  const [selectedVideo, setSelectedVideo] = React.useState<VideoItem | null>(
    null,
  );

  const handleCloseModal = React.useCallback(() => {
    setSelectedVideo(null);
  }, []);

  return (
    <section className="video-section">
      <IonText>
        <h2 className="mb-6 text-3xl!  font-bold text-slate-800">
          {TEXTS.video}
        </h2>
      </IonText>
      <Swiper
        breakpoints={{
          320: { slidesPerView: 2.5 },
          640: { slidesPerView: 3.5 },
          1024: { slidesPerView: 4.5 },
        }}
        className="overflow-visible!"
        grabCursor
        resistance
        resistanceRatio={0.85}
        slidesPerView={2.5}
        spaceBetween={14}
        touchEventsTarget="container"
      >
        {videos.map((v) => (
          <SwiperSlide key={v.id}>
            <VideoCard item={v} onPress={() => setSelectedVideo(v)} />
          </SwiperSlide>
        ))}
      </Swiper>
      <IonModal
        backdropDismiss
        className="video-modal"
        isOpen={!!selectedVideo}
        onDidDismiss={handleCloseModal}
      >
        <IonHeader>
          <IonToolbar>
            <IonTitle className="font-semibold text-slate-800">
              {selectedVideo?.title ?? ""}
            </IonTitle>
            <IonButtons slot="end">
              <IonButton aria-label={TEXTS.close} onClick={handleCloseModal}>
                <IonIcon icon={close} />
              </IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          {selectedVideo && (
            <div className="flex min-h-full items-center justify-center">
              <img
                alt=""
                className="h-full w-full object-contain"
                src={selectedVideo.thumbnailUrl}
              />
            </div>
          )}
        </IonContent>
      </IonModal>
    </section>
  );
});

VideoSection.displayName = "VideoSection";

export { VideoSection };
