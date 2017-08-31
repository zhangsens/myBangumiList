const electron = require("electron");
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
let win;

function openWindow() {
    win = new BrowserWindow({ width: 900, height: 600, frame: false });

    win.loadURL('file://' + __dirname + '/index.html');

    win.on("closed", () => {
        win = "";
    });
    win.webContents.openDevTools();
}

app.on('activate', () => {
    if (mw) {
        openWindow();
    }
});

app.on("ready", () => {
    openWindow();
});

app.on("window-all-closed", () => {
    app.quit();
});