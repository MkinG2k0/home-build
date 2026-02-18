import { IonApp, setupIonicReact } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import * as React from "react";

import { AppShell } from "./app/AppShell";
import { QueryProvider } from "./app/providers/QueryProvider";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { Analytics } from "@vercel/analytics/react";

import "@ionic/react/css/core.css";
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

import "./theme/global.css";
import "./theme/variables.css";

setupIonicReact();

const App: React.FC = () => (
  <QueryProvider>
    <IonApp>
      <IonReactRouter>
        <AppShell />
        <Analytics />
        <SpeedInsights />
      </IonReactRouter>
    </IonApp>
  </QueryProvider>
);

export default App;
