import * as React from "react";

import { useAppStore } from "../../app/store";
import { PageWithRefresher } from "../../shared/ui";
import { ComplexesSwiper } from "../../widgets/complexes-swiper";
import { ContactForm } from "../../widgets/contact-form";
import { HeroSwiper } from "../../widgets/hero-swiper";
import { HomeNewsSection } from "../../widgets/home-news-section";
import { VideoSection } from "../../widgets/video-section";

const HomePage: React.FC = () => {
  const complexes = useAppStore((s) => s.complexes);
  const news = useAppStore((s) => s.news);
  const videos = useAppStore((s) => s.videos);

  const handleRefresh = React.useCallback(() => {
    // TODO: перезагрузка данных страницы
  }, []);

  return (
    <PageWithRefresher onRefresh={handleRefresh}>
      <div className="flex flex-col gap-4">
        <HeroSwiper />

        <ComplexesSwiper complexes={complexes} />

        <HomeNewsSection news={news} />

        <VideoSection videos={videos} />

        <ContactForm />
      </div>
    </PageWithRefresher>
  );
};

export { HomePage };
