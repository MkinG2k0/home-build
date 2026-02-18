import { IonCol, IonGrid, IonRow } from "@ionic/react";
import * as React from "react";

import { useVideoBlogs } from "../../shared/lib/hooks";
import type { VideoItem } from "../../shared/model";
import {
  ErrorState,
  LoadingState,
  PageWithRefresher,
  VideoCard,
  VideoModal,
} from "../../shared/ui";

const VideoblogPage: React.FC = () => {
  const {
    data: videos,
    isLoading,
    isError,
    refetch,
  } = useVideoBlogs();
  const [selectedVideo, setSelectedVideo] = React.useState<VideoItem | null>(
    null,
  );

  const handleCloseModal = React.useCallback(() => {
    setSelectedVideo(null);
  }, []);

  if (isLoading) {
    return (
      <PageWithRefresher>
        <LoadingState />
      </PageWithRefresher>
    );
  }

  if (isError || !videos) {
    return (
      <PageWithRefresher>
        <ErrorState onRetry={() => refetch()} />
      </PageWithRefresher>
    );
  }

  return (
    <PageWithRefresher>
      <IonGrid>
        <IonRow>
          {videos.map((v) => (
            <IonCol key={v.id} size="12" sizeMd="6" sizeLg="4">
              <VideoCard
                item={v}
                onPress={() => setSelectedVideo(v)}
              />
            </IonCol>
          ))}
        </IonRow>
      </IonGrid>
      <VideoModal
        isOpen={selectedVideo !== null}
        video={selectedVideo}
        onDidDismiss={handleCloseModal}
      />
    </PageWithRefresher>
  );
};

export { VideoblogPage };
