import { IonButton } from "@ionic/react";
import * as React from "react";

import { cn } from "../../lib";

interface ErrorStateProps {
  className?: string;
  message?: string;
  onRetry?: () => void;
}

export const ErrorState: React.FC<ErrorStateProps> = ({
  className,
  message = "Произошла ошибка при загрузке данных",
  onRetry,
}) => (
  <div
    className={cn(
      "flex flex-col items-center justify-center gap-4 p-8 text-center",
      className,
    )}
  >
    <p className="text-slate-600">{message}</p>
    {onRetry && (
      <IonButton onClick={onRetry} fill="outline">
        Попробовать снова
      </IonButton>
    )}
  </div>
);
