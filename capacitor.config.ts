import type { CapacitorConfig } from '@capacitor/cli'

const config: CapacitorConfig = {
	appId: 'com.home.app',
	appName: 'Эталон Инвест',
	webDir: 'dist',
	server: {
		androidScheme: 'https',
		iosScheme: 'capacitor',
		// hostname: '192.168.0.199:5173',	
		cleartext: true,
	},
	android: {
		allowMixedContent: true,
		captureInput: true,
		webContentsDebuggingEnabled: false,
		backgroundColor: 'white',
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
			backgroundColor: '#475569',
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
			// launchUrl: 'https://192.168.0.199:5173',
		},
	},
	backgroundColor: '#fcf9fa',
	zoomEnabled: false,
}

export default config
