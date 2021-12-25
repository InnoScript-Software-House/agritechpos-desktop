
/**
 * Developer                    - Aung Htet Paing
 * Start Date                   - 25 Dec 2021
 * Phone                        - 09421038123, 09758276201
 * Email                        - aunghtetpaing.info@gmail.com
**/

const { BrowserWindow, app, ipcMain, Notification, dialog, Tray } = require('electron');
const path = require('path');
const { trans } = require('./src/assets/i18n/mm.json');

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

/**
 * BrowserWindow
 * 
 * ************************************
 * Create and control browser windows.
 * ************************************
 * 
 * The BrowserWindow class exposes various ways to modify the look and behavior of your app's windows. For more details, see the Window Customization tutorial.
 * url - https://www.electronjs.org/docs/latest/tutorial/window-customization
 * 
 * [ LoginWindow ]
 */

let loginWindow;

const createWindow = (browserWindowType) => {

    let win;

    if(browserWindowType === 'login') {
        loginWindow = new BrowserWindow({
            maxWidth: 400,
            maxHeight: 600,
            title: 'Kubota POS - Login',
            type: 'Login',
            icon: new Tray('./src/assets/images/sample.jpg'),
            ...browserWindowOptions
        });

        loginWindow.loadFile('./index.html');
        win = loginWindow;
    }
}

if(isDev) {
    require('electron-reload')(__dirname, {
        electron: path.join(__dirname, 'node_modules', '.bin', 'electron')
    });
}

const sysNotification = () => {
    const notify = new Notification({
        title: trans.notification.app_start_title,
        body: trans.notification.app_start_message,
        icon: new Tray('./src/assets/images/sample.jpg'),
        closeButtonText: 'OK',
        urgency: 'normal'
    });
    
    notify.show();
}

app.whenReady().then(() => {
    createWindow('login');
});

/**
 * IPCMain
 * 
 * ***********************************************************************
 * Communicate asynchronously from the main process to renderer processes.
 * ***********************************************************************
 * 
 * The ipcMain module is an Event Emitter. When used in the main process, 
 * it handles asynchronous and synchronous messages sent from a renderer process (web page). 
 * Messages sent from a renderer will be emitted to this module.
 * 
 */

ipcMain.on('notify', (_, type) => {
    if(type === 'sys-start-notify') {
        return sysNotification();
    };
});
