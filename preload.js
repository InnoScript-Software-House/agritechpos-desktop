const { ipcRenderer, contextBridge, app } = require('electron');
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
    },
    quit: {
        quitApp(){
            return ipcRenderer.invoke('quit-app');
        }
    }
});