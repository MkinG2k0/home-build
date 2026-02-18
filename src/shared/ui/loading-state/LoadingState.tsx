import { IonSpinner } from "@ionic/react";
import * as React from "react";

import { cn } from "../../lib";

interface LoadingStateProps {
  className?: string;
  message?: string;
}

export const LoadingState: React.FC<LoadingStateProps> = ({
  className,
  message = "Загрузка...",
}) => (
  <div
    className={cn(
      "flex flex-col items-center justify-center gap-4 p-8",
      className,
    )}
  >
    <IonSpinner />
    {message && <p className="text-sm text-slate-600">{message}</p>}
  </div>
);
