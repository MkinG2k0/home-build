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
  <IonModal className="video-modal" isOpen={isOpen} onDidDismiss={onDidDismiss}>
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
    <div className="">
      {video && (
        <div className="relative w-full overflow-hidden">
          <img
            alt={video.title}
            className="aspect-video w-full object-cover"
            src={video.thumbnailUrl}
          />
        </div>
      )}
    </div>
  </IonModal>
);

VideoModal.displayName = "VideoModal";

export { VideoModal };
