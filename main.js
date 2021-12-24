const { BrowserWindow, app, ipcMain, Notification, dialog } = require('electron');
const path = require('path');

const isDev = !app.isPackaged;

const createWindow = () => {
    const win = new BrowserWindow({
        maxWidth: 500,
        maxHeight: 600,
        backgroundColor: '#eeeeee',
        webPreferences: {
            nodeIntegration: true,
            nodeIntegrationInWorker: true,
            contextIsolation: true,
            webSecurity: false,
            allowRunningInsecureContent: false,
            preload: path.join(__dirname, 'preload.js')
        }
    });

    win.loadFile('./index.html');
}

if(isDev) {
    require('electron-reload')(__dirname, {
        electron: path.join(__dirname, 'node_modules', '.bin', 'electron')
    });
}

ipcMain.on('notify', (_, message) => {
    new Notification({title: 'Notification', body: message}).show();
});

ipcMain.on('dialog', (_, message) => {
    dialog.showMessageBox(null, message).then((response) => {
        console.log(response);
    });
});

app.whenReady().then(createWindow);