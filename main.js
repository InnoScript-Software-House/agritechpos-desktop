/**
 * Developer                    - Aung Htet Paing
 * Start Date                   - 25 Dec 2021
 * Phone                        - 09421038123, 09758276201
 * Email                        - aunghtetpaing.info@gmail.com
**/
const http = require("http");
const express = require("express");

const server = express();

server.use(express.json());
const httpServer = http.createServer(server);

const { BrowserWindow, app, ipcMain, Notification, dialog, Tray, Menu } = require('electron');
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

let menuHide = new Menu();

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

let resetWindow, dashboardWindow;

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


/**
 * Dialog Box
 * 
 * ===========================
 * Electron Native Dialog Box
 * ===========================
 * 
 * Display native system dialogs for opening and saving files, alerting, etc.
*/

const warningDialogBox = (bwtype, title, message) => {

    const windowType = bwtype === 'login-validation' ? 
    loginWindow : 
    null;

    const options = {
        type: 'warning',
        title: title,
        message: message
    }

    const dialogBox = dialog.showMessageBox(windowType, options);
    return dialogBox;
}

app.whenReady().then(() => {
    const contents = mainWindow();
    contents.webContents.on('did-finish-load', () => {
        contents.webContents.send('get-loading-state', true);
    });

    // server listening 
    httpServer.listen(4001, () => {
    console.log(`Server running on port 4001`);
    });

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

// ** Open Dialog Box
ipcMain.on('dialog', (_, type) => {
    const dialog = type === 'login-validation' ?
    warningDialogBox(type, trans.auth.validate.valid_login_title,  trans.auth.validate.valid_credential) :
    null;

    return dialog;
});

// ** Browser Window Create
ipcMain.on('browser-window', (_, type) => {
});

// ** Open Login Window
ipcMain.once('open-login-window', (event) => {
    let focusWindow = BrowserWindow.getFocusedWindow();
    focusWindow.close();
    const contents = loginWindow();
    contents.webContents.on('did-finish-load', () => {
        contents.webContents.send('get-loading-state', false);
    });
});

// Browser Window FullScreen
ipcMain.on('browser-window-fullscreen', (event) => {
    let focusWindow = BrowserWindow.getFocusedWindow();
    focusWindow.fullScreen = true;
    focusWindow.fullScreenable = true;
});


ipcMain.on('loading', (event, loadingState) => {
    event.reply('sadasd')
});



ipcMain.on('create-window', (_, type) => {
    loginWindow.close();
    createWindow(type)
})
