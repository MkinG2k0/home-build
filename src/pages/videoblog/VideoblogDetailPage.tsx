import { IonCard, IonCardHeader, IonCardTitle, IonIcon } from "@ionic/react";
import { playCircle } from "ionicons/icons";
import * as React from "react";
import { useParams } from "react-router-dom";

import { useVideoBlog } from "../../shared/lib/hooks";
import { cn, getStrapiImageUrl } from "../../shared/lib";
import {
  ErrorState,
  LoadingState,
  PageWithRefresher,
} from "../../shared/ui";

const VideoblogDetailPage: React.FC = () => {
  const { id: documentId } = useParams<{ id: string }>();
  const {
    data: video,
    isLoading,
    isError,
    refetch,
  } = useVideoBlog(documentId);

  if (isLoading) {
    return (
      <PageWithRefresher>
        <LoadingState />
      </PageWithRefresher>
    );
  }

  if (isError) {
    return (
      <PageWithRefresher>
        <ErrorState onRetry={() => refetch()} />
      </PageWithRefresher>
    );
  }

  if (!video?.data) {
    return (
      <PageWithRefresher>
        <div className="flex items-center justify-center p-8">
          <p className="text-slate-600">Видео не найдено</p>
        </div>
      </PageWithRefresher>
    );
  }

  const videoData = video.data;

  return (
    <PageWithRefresher>
      <div className="flex flex-col gap-4 p-4">
        <IonCard className="overflow-hidden rounded-xl border-0 shadow-md bg-white m-0!">
          <div className="relative">
            <img
              alt={videoData.title}
              className="h-80 w-full object-cover"
              src={getStrapiImageUrl(videoData.img.url)}
            />
            <div
              className={cn(
                "absolute inset-0 flex items-center justify-center bg-black/30",
              )}
            >
              <IonIcon className="text-6xl text-white" icon={playCircle} />
            </div>
          </div>
          <IonCardHeader className="px-4 pb-4 pt-4">
            <IonCardTitle className="text-2xl font-bold text-slate-800">
              {videoData.title}
            </IonCardTitle>
          </IonCardHeader>
        </IonCard>
      </div>
    </PageWithRefresher>
  );
};

export { VideoblogDetailPage };
