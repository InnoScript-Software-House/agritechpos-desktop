const {BrowserWindow, app, Menu, globalShortcut, ipcMain} = require('electron');

const path = require('path');

const printOptions = {
	silent: false,
	pageSize: 'A4',
	printBackground: false,
	color: false,
	margin: {
		marginType: 'printableArea'
	},
	landscape: false,
	pagesPerSheet: 1,
	collate: false
};

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
	webPreferences,
	backgroundColor: '#eeeeee'
};

let menuHide = new Menu();
let curentWindow = null;

let mainWindow = () => {
	let win = new BrowserWindow({
		width: 1800,
		height: 1000,
		type: 'MainWindow',
		frame: false,
		fullscreen: false,
		...browserWindowOptions
	});

	// if(!isDev){
	//     globalShortcut.register('Ctrl+Shift+I', () => {
	//         return null;
	//     })
	// }

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
