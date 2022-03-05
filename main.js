const { BrowserWindow, app, Menu, ipcMain } = require('electron');
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
        fullscreen: false,
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
});

ipcMain.on('restart-app', () => {
    app.quit();
});
