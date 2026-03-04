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
  const {
    data: mainSlider,
    isLoading: isMainSliderLoading,
    refetch: refetchMainSlider,
  } = useMainSlider();
  const {
    data: complexes,
    isLoading: isComplexesLoading,
    refetch: refetchComplexes,
  } = useResidentialComplexes();
  const {
    data: videos,
    isLoading: isVideosLoading,
    refetch: refetchVideos,
  } = useVideoBlogs();
  const {
    data: news,
    isLoading: isNewsLoading,
    refetch: refetchNews,
  } = useNews();

  const handleRefresh = React.useCallback(async () => {
    await Promise.allSettled([
      refetchMainSlider(),
      refetchComplexes(),
      refetchVideos(),
      refetchNews(),
    ]);
  }, [refetchMainSlider, refetchComplexes, refetchVideos, refetchNews]);

  const newsSlice = news?.slice(0, 4) ?? [];

  return (
    <PageWithRefresher onRefresh={handleRefresh}>
      <div className="flex flex-col gap-2 pb-24">
        <HeroSwiper isLoading={isMainSliderLoading} slides={mainSlider} />

        <ComplexesSwiper isLoading={isComplexesLoading} complexes={complexes} />

        <HomeNewsSection isLoading={isNewsLoading} news={newsSlice} />

        <VideoSection isLoading={isVideosLoading} videos={videos} />

        <ContactForm />
      </div>
    </PageWithRefresher>
  );
};

export { HomePage };
