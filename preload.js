/**
 * Developer                    - Aung Htet Paing
 * Start Date                   - 25 Dec 2021
 * Phone                        - 09421038123, 09758276201
 * Email                        - aunghtetpaing.info@gmail.com
**/

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