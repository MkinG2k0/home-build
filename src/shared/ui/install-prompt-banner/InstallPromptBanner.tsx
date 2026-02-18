import { IonButton } from '@ionic/react'
import * as React from 'react'

import { TEXTS } from '../../config'
import { cn } from '../../lib'
import { useInstallPrompt } from '../../lib/hooks/use-install-prompt'

const DISMISS_KEY = 'pwa-install-banner-dismissed'

export const InstallPromptBanner: React.FC = () => {
	const {install, isInstallable, isStandalone} = useInstallPrompt()
	const [dismissed, setDismissed] = React.useState(() => {
		if (typeof window === 'undefined') return true
		return window.localStorage.getItem(DISMISS_KEY) === '1'
	})
	
	const handleDismiss = React.useCallback(() => {
		setDismissed(true)
		if (typeof window !== 'undefined') {
			window.localStorage.setItem(DISMISS_KEY, '1')
		}
	}, [])

	const handleInstall = React.useCallback(() => {
		install()
		handleDismiss()
	}, [install, handleDismiss])

	const visible = isInstallable && !isStandalone && !dismissed
	if (!visible) return null

	return (
		<div
			className={cn(
				'fixed bottom-4 left-4 right-4 z-[90] flex flex-col gap-3 rounded-xl bg-slate-800 p-4 text-white shadow-lg sm:left-auto sm:right-4 sm:max-w-xl',
			)}
			role="dialog"
			aria-labelledby="install-banner-title"
		>
			<p id="install-banner-title" className="text-sm font-medium">
				{TEXTS.install_app_description}
			</p>
			<div className="flex gap-2">
				<IonButton
					onClick={handleInstall}
				>
					{TEXTS.install_app}
				</IonButton>
				<IonButton
					onClick={handleDismiss}

					aria-label={TEXTS.close}
				>
					{TEXTS.close}
				</IonButton>
			</div>
		</div>
	)
}
