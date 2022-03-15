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
    print: {
        invoice() {
            return ipcRenderer.send('print-invoice');
        },
        reload(data) {
            return ipcRenderer.on('reload', (event, res) => {
                return data(res);
            });
        }
    }
});