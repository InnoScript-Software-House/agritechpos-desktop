module.exports = {
    setMenu : (menus, curentWindow) => {
        let buildTemplate = [];

        menus.map((value) => {
            buildTemplate.push({
                label: value.label,
                click() {
                    curentWindow.webContents.send('navigate', value.url)
                }
            });
        });
        
        return buildTemplate;
    },

    webPreferences: {
        nodeIntegration: true,
        nodeIntegrationInWorker: true,
        contextIsolation: true,
        webSecurity: false,
        allowRunningInsecureContent: false
    }
}