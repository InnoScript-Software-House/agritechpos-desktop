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
    dialog: {
        sendDialog(type) {
            ipcRenderer.send('dialog', type);
        }
    },
    browserWindow : {
        sendBrowserWindow(type) {
            ipcRenderer.send('browser-window', type);
        },
        fullscreen(data) {
            ipcRenderer.send('browser-window-fullscreen', data);
        },
        openLoginWindow() {
            ipcRenderer.send('open-login-window');
        }
    },
    loading: {
        getLoading(getData) {
            return ipcRenderer.on('get-loading-state',(event, result) => {
                getData(result);
            });
        }

    }

});