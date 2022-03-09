const { BrowserWindow, app, Menu, globalShortcut, ipcMain } = require('electron');

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
        type: 'MainWindow',
        frame: false,
        fullscreen: true,
        ...browserWindowOptions
    });


    if(!isDev){ 
        globalShortcut.register('Ctrl+Shift+I', () => {
            return null;
        })
    }


    win.loadFile('./index.html');
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

ipcMain.on('quit-app', () => {
    app.quit();
})
