/**
 * Developer                    - Aung Htet Paing
 * Start Date                   - 25 Dec 2021
 * Phone                        - 09421038123, 09758276201
 * Email                        - aunghtetpaing.info@gmail.com
**/

const { BrowserWindow, app, ipcMain, Notification, dialog } = require('electron');
const path = require('path');

const isDev = !app.isPackaged;

const createWindow = () => {
    const win = new BrowserWindow({
        maxWidth: 1000,
        maxHeight: 800,
        backgroundColor: '#eee',
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

ipcMain.on('dialog',async (e, message) => {
    return await dialog.showMessageBox(null, message);
});

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
    app.quit();
})