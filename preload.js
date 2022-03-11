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
        },
        platform(data) {
            return data(device.platform());
        }
    },
    app: {
        restart() {
            ipcRenderer.send('restart-app', true);
        }
    },
    quit: {
        quitApp(){
            return ipcRenderer.send('quit-app');
        }
    },
    printComponent: async (url, callback) => {
        let response = await ipcRenderer.invoke('printComponent', url);
        callback(response);
    },
    previewComponent: async (url, callBack) => {
        let response = await ipcRenderer.invoke('previewComponent', url);
        callBack(response);
    },
});