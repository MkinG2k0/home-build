import type { CapacitorConfig } from '@capacitor/cli'

const config: CapacitorConfig = {
	appId: 'com.home.app',
	appName: 'Эталон Инвест',
	webDir: 'dist',
	server: {
		androidScheme: 'https',
		iosScheme: 'capacitor',
		hostname: '192.168.0.199:5173',
		cleartext: true,
	},
	android: {
		allowMixedContent: true,
		captureInput: true,
		webContentsDebuggingEnabled: false,
	},
	ios: {
		contentInset: 'automatic',
		scrollEnabled: true,
		allowsLinkPreview: false,
	},
	plugins: {
		Keyboard: {
			resize: 'body',
			style: 'dark',
			resizeOnFullScreen: true,
		},
		StatusBar: {
			style: 'default',
			backgroundColor: '#fcf9fa',
		},
		// Geolocation: {
		//   permissions: {
		//     location: {
		//       ios: "WhenInUse",
		//       android: "WhenInUse",
		//     },
		//   },
		// },
		App: {
			launchUrl: '/',
		},
	},
	backgroundColor: '#fcf9fa',
	zoomEnabled: false,
}

export default config
