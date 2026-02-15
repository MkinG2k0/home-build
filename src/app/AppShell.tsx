import { IonRouterOutlet, IonSplitPane } from '@ionic/react'
import * as React from 'react'
import { Route } from 'react-router-dom'

import { AppHeader } from '../widgets/app-header'
import { AppMenu } from '../widgets/app-menu'
import { CallFab } from '../widgets/call-fab'
import { AboutPage } from '../pages/about'
import { CatalogPage } from '../pages/catalog'
import { HomePage } from '../pages/home'
import { NewsPage } from '../pages/news'
import { VideoblogPage } from '../pages/videoblog'
	
const MAIN_ID = 'main'

export const AppShell: React.FC = () => (
	<IonSplitPane contentId={MAIN_ID}>
		<AppMenu contentId={MAIN_ID}/>
		<div className="flex flex-1 flex-col bg-slate-50" id={MAIN_ID}>
			<AppHeader/>
			<main className="relative flex-1 overflow-auto bg-slate-50">
				<IonRouterOutlet id="router-outlet">
					<Route component={HomePage} exact path="/"/>
					<Route component={CatalogPage} path="/catalog"/>
					<Route component={NewsPage} path="/news"/>
					<Route component={VideoblogPage} path="/videos"/>
					<Route component={AboutPage} path="/about"/>
				</IonRouterOutlet>
			</main>
			<CallFab/>
		</div>
	</IonSplitPane>
)
