const { BrowserWindow, app, Menu, globalShortcut, ipcMain } = require('electron');

const path = require('path');
const fs = require('fs');

const printOptions = {
    silent: false,
    pageSize: 'A4',
    printBackground: false,
    color: false,
    margin: {
        marginType: 'printableArea',
    },
    landscape: false,
    pagesPerSheet: 1,
    collate: false,
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
});

ipcMain.on('printComponent', (event, url) => {
    let win = new BrowserWindow({ show: false });
    win.loadURL(url);
   
    win.webContents.on('did-finish-load', () => {
     win.webContents.print(printOptions, (success, failureReason) => {
      console.log('Print Initiated in Main...');
      if (!success) console.log(failureReason);
     });
    });
    return 'done in main';
});

ipcMain.handle('previewComponent', (event, url) => {
    let win = new BrowserWindow({ title: 'Preview', show: false, autoHideMenuBar: true });
   
    win.loadURL(url);
   
    win.webContents.once('did-finish-load', () => {
     win.webContents.printToPDF(printOptions).then((data) => {
       let buf = Buffer.from(data);
       var data = buf.toString('base64');
       let url = 'data:application/pdf;base64,' + data;
   
       win.webContents.on('ready-to-show', () => {
        win.show();
        win.setTitle('Preview');
       });
       win.webContents.on('closed', () => win = null);
       win.loadURL(url);
   
      })
      .catch((error) => {
       console.log(error);
      });
    });
    return 'shown preview window';
   });
