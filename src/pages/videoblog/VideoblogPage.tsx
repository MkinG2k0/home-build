import { IonCol, IonGrid, IonRow } from "@ionic/react";
import * as React from "react";

import { useAppStore } from "../../app/store";
import type { VideoItem } from "../../shared/model";
import { PageWithRefresher, VideoCard, VideoModal } from "../../shared/ui";

const VideoblogPage: React.FC = () => {
  const videos = useAppStore((s) => s.videos);
  const [selectedVideo, setSelectedVideo] = React.useState<VideoItem | null>(
    null,
  );

  const handleCloseModal = React.useCallback(() => {
    setSelectedVideo(null);
  }, []);

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
