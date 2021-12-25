const {ipcRenderer, contextBridge } = require('electron');

contextBridge.exposeInMainWorld('nativeApi', {
    notification: {
        sendNoti(type) {
            ipcRenderer.send('notify', type);
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