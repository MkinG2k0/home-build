import * as React from "react";

import {
  useMainSlider,
  useNews,
  useResidentialComplexes,
  useVideoBlogs,
} from "../../shared/lib/hooks";
import { PageWithRefresher } from "../../shared/ui";
import { ComplexesSwiper } from "../../widgets/complexes-swiper";
import { ContactForm } from "../../widgets/contact-form";
import { HeroSwiper } from "../../widgets/hero-swiper";
import { HomeNewsSection } from "../../widgets/home-news-section";
import { VideoSection } from "../../widgets/video-section";

const HomePage: React.FC = () => {
  const { data: mainSlider, refetch: refetchMainSlider } = useMainSlider();
  const { data: complexes, refetch: refetchComplexes } =
    useResidentialComplexes();
  const { data: videos, refetch: refetchVideos } = useVideoBlogs();
  const { data: news, refetch: refetchNews } = useNews();

  const handleRefresh = React.useCallback(() => {
    refetchMainSlider();
    refetchComplexes();
    refetchVideos();
    refetchNews();
  }, [refetchMainSlider, refetchComplexes, refetchVideos, refetchNews]);

  console.log(mainSlider);
  return (
    <PageWithRefresher onRefresh={handleRefresh}>
      <div className="flex flex-col gap-2">
        <HeroSwiper slides={mainSlider} />

        <ComplexesSwiper complexes={complexes} />

        <HomeNewsSection news={news} />

        <VideoSection videos={videos} />

        <ContactForm />
      </div>
    </PageWithRefresher>
  );
};

export { HomePage };
