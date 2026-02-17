import {
  IonButton,
  IonButtons,
  IonHeader,
  IonIcon,
  IonModal,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { close } from "ionicons/icons";
import * as React from "react";

import { TEXTS } from "../../config";
import { cn } from "../../lib";
import type { VideoItem } from "../../model";

export interface VideoModalProps {
  isOpen: boolean;
  onDidDismiss: () => void;
  video: VideoItem | null;
}

const VideoModal: React.FC<VideoModalProps> = ({
  isOpen,
  onDidDismiss,
  video,
}) => (
  <IonModal
    className="video-modal"
    isOpen={isOpen}
    onDidDismiss={onDidDismiss}
  >
    <IonHeader>
      <IonToolbar>
        <IonTitle>{video?.title ?? ""}</IonTitle>
        <IonButtons slot="end">
          <IonButton aria-label={TEXTS.close} onClick={onDidDismiss}>
            <IonIcon icon={close} />
          </IonButton>
        </IonButtons>
      </IonToolbar>
    </IonHeader>
    <div className="p-4">
      {video && (
        <div className="relative w-full overflow-hidden rounded-xl">
          <img
            alt={video.title}
            className="aspect-video w-full object-cover"
            src={video.thumbnailUrl}
          />
          <div
            className={cn(
              "absolute inset-0 flex items-center justify-center bg-black/30",
            )}
          >
            <div
              className="flex size-14 items-center justify-center rounded-full bg-white/70 backdrop-blur-sm"
              role="presentation"
            >
              <div className="ml-1 h-0 w-0 border-y-8 border-l-14 border-y-transparent border-l-slate-800" />
            </div>
          </div>
        </div>
      )}
    </div>
  </IonModal>
);

VideoModal.displayName = "VideoModal";

export { VideoModal };
