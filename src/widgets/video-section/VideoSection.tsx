import { IonText } from "@ionic/react";
import * as React from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import { TEXTS } from "../../shared/config";
import type { VideoItem } from "../../shared/model";
import { VideoCard, VideoModal } from "../../shared/ui";

import "swiper/css";

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
            <VideoCard
              item={v}
              onPress={() => setSelectedVideo(v)}
            />
          </SwiperSlide>
        ))}
      </Swiper>
      <VideoModal
        isOpen={selectedVideo !== null}
        video={selectedVideo}
        onDidDismiss={handleCloseModal}
      />
    </section>
  );
});

VideoSection.displayName = "VideoSection";

export { VideoSection };
