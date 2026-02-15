import { IonRouterOutlet, IonSplitPane } from "@ionic/react";
import * as React from "react";
import { Route as BaseRoute } from "react-router-dom";

import { AppHeader } from "../widgets/app-header";
import { AppMenu } from "../widgets/app-menu";
import { CallFab } from "../widgets/call-fab";
import { AboutPage } from "../pages/about";
import { CatalogPage } from "../pages/catalog";
import { HomePage } from "../pages/home";
import { NewsPage } from "../pages/news";
import { VideoblogPage } from "../pages/videoblog";

type RouteProps = {
  component: React.ComponentType;
  exact?: boolean;
  path: string;
};
const Route = BaseRoute as React.ComponentType<RouteProps>;

const MAIN_ID = "main";

export const AppShell: React.FC = () => (
  <IonSplitPane contentId={MAIN_ID} when={false}>
    <AppMenu contentId={MAIN_ID} />
    <div className="flex flex-1 flex-col bg-slate-50" id={MAIN_ID}>
      <div className="mx-auto flex min-h-0 w-full max-w-7xl flex-1 flex-col">
        <AppHeader />
        <main className="relative flex-1 overflow-auto bg-slate-50 px-4 sm:px-6 lg:px-8">
          <IonRouterOutlet id="router-outlet">
            <Route component={HomePage} exact path="/" />
            <Route component={CatalogPage} path="/catalog" />
            <Route component={NewsPage} path="/news" />
            <Route component={VideoblogPage} path="/videos" />
            <Route component={AboutPage} path="/about" />
          </IonRouterOutlet>
        </main>
      </div>
      <CallFab />
    </div>
  </IonSplitPane>
);
