const { BrowserWindow, app, Menu } = require('electron');
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
    webPreferences,
    backgroundColor: '#eeeeee',
}

let menuHide = new Menu();

let mainWindow = () => {
    let win = new BrowserWindow({
        width: 1800,
        height: 1000,
        fullscreen: true,
        type: 'MainWindow',
        ...browserWindowOptions
    });

    win.loadFile('./index.html');

    win.webContents.openDevTools()
    return win;
}


if(isDev) {
    require('electron-reload')(__dirname, {
        electron: path.join(__dirname, 'node_modules', '.bin', 'electron')
    });
}


app.whenReady().then(() => {
    const contents = mainWindow();
    contents.webContents.on('did-finish-load', () => {
        // contents.webContents.send('get-loading-state', true);
    });
});