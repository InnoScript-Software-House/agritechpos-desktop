const { ipcRenderer, contextBridge } = require('electron');
const { device } = require('./src/node');

contextBridge.exposeInMainWorld('nativeApi', {
    notification: {
        sendNoti(type) {
            ipcRenderer.send('notify', type);
        }
    },
    device: {
        get(data) {
            return data(device);
        }
    }
});