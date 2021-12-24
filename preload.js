const {ipcRenderer, contextBridge } = require('electron');

contextBridge.exposeInMainWorld('electron', {
    notificationApi: {
        sendNotification(message) {
            ipcRenderer.send('notify', message);
        }
    },
    dialogApi: {
        sendDialog(message) {
            ipcRenderer.send('dialog', message);
        }
    },
    batteryApi: {

    },
    filesApi: {

    }
});