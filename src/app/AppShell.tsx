import { IonRouterOutlet, IonSplitPane } from "@ionic/react";
import * as React from "react";
import { Route as BaseRoute } from "react-router-dom";

import { AppHeader } from "../widgets/app-header";
import { AppMenu } from "../widgets/app-menu";
import { CallFab } from "../widgets/call-fab";
import { AboutPage } from "../pages/about";
import { CatalogDetailPage, CatalogPage } from "../pages/catalog";
import { HomePage } from "../pages/home";
import { NewsDetailPage, NewsPage } from "../pages/news";
import { VideoblogDetailPage, VideoblogPage } from "../pages/videoblog";

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
      <div className="mx-auto flex min-h-0 w-full max-w-7xl flex-1 flex-col ">
        <AppHeader />
        <main className="main-scroll relative flex-1 overflow-auto bg-slate-50">
          <IonRouterOutlet id="router-outlet">
            <Route component={HomePage} exact path="/" />
            <Route component={CatalogDetailPage} path="/catalog/:id" />
            <Route component={CatalogPage} exact path="/catalog" />
            <Route component={NewsDetailPage} path="/news/:id" />
            <Route component={NewsPage} exact path="/news" />
            {/* <Route component={VideoblogDetailPage} path="/videos/:id" /> */}
            <Route component={VideoblogPage} exact path="/videos" />
            <Route component={AboutPage} exact path="/about" />
          </IonRouterOutlet>
        </main>
      </div>
      <CallFab />
    </div>
  </IonSplitPane>
);
