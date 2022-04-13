const {BrowserWindow, app, Menu, ipcMain, shell, globalShortcut, dialog, Notification } = require('electron');
const path = require('path');

const isDev = !app.isPackaged;

let webPreferences = {
	nodeIntegration: true,
	nodeIntegrationInWorker: true,
	contextIsolation: true,
	webSecurity: false,
	allowRunningInsecureContent: false,
	preload: path.join(__dirname, 'preload.js')
};

let browserWindowOptions = {
	webPreferences
};

const template = [
	{
		label: 'App',
		submenu: [
			{ role: 'Quit'}
		]
	},
	{
		label: 'View',
		submenu: [
		  { role: 'reload' },
		  { role: 'forceReload' },
		  { type: 'separator' },
		  { role: 'resetZoom' },
		  { role: 'zoomIn' },
		  { role: 'zoomOut' },
		  { type: 'separator' },
		  { role: 'togglefullscreen' },
		  { role: 'toggleDevTools' },
		]
	  },
	  {
		label: 'Window',
		submenu: [
		  { role: 'minimize' },
		  { role: 'zoom' }
		]
	  },
	  {
		role: 'help',
		submenu: [
		  {
			label: 'User Guide',
			click: async () => {
			  await shell.openExternal('https://agritechpos.com/userguide')
			}
		  },
		  {
			label: 'Documentations',
			click: async () => {
			  await shell.openExternal('https://agritechpos.com/documentaions')
			}
		  },
		  {
			label: 'About Software',
			click: async () => {
			  await shell.openExternal('https://agritechpos.com/about-software')
			}
		  },
		  {
			label: 'Support',
			click: async () => {
			  await shell.openExternal('https://agritechpos.com/support')
			}
		  }
		]
	  }
];

const menu = Menu.buildFromTemplate(template);
Menu.setApplicationMenu(menu);

let curentWindow = null;

let mainWindow = () => {
	let win = new BrowserWindow({
		width: 1800,
		height: 1000,
		type: 'MainWindow',
		frame: true,
		fullscreen: false,
		...browserWindowOptions
	});

	if(!isDev){
	    globalShortcut.register('Ctrl+Shift+I', () => {
	        return null;
	    })
	}

	win.loadFile('./index.html');
	return win;
};

if (isDev) {
	require('electron-reload')(__dirname, {
		electron: path.join(__dirname, 'node_modules', '.bin', 'electron')
	});
}

app.whenReady().then(() => {
	curentWindow = mainWindow();
});

app.on('window-all-closed', () => {
	app.quit();
})

ipcMain.on('restart-app', () => {
	app.quit();
});

ipcMain.on('quit-app', () => {
	app.quit();
});

ipcMain.on('print-invoice', (events, options) => {
	curentWindow.webContents.print(options, (success, failureReason) => {
		curentWindow.webContents.send('reload', success ? success : failureReason);
	});
});

ipcMain.on('show-message-box', (events, data) => {
	dialog.showMessageBox(curentWindow, data);
});

ipcMain.on('open-webview', (events, url) => {
	let win = new BrowserWindow({
		width: 800,
		height: 1000,
		type: 'MainWindow',
		frame: true,
		fullscreen: false,
		...browserWindowOptions
	});

	if(!isDev){
	    globalShortcut.register('Ctrl+Shift+I', () => {
	        return null;
	    })
	}

	win.loadURL(url);
});

ipcMain.on('notification:show', (events, data) => {
	new Notification({ title: data.title, body: data.body, tag: data.tag}).show();
});

