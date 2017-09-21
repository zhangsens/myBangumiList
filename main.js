const electron = require("electron");
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const fs = require("fs");
let win, x, y, width, height, config;
//console.log(global);

if (fs.existsSync("./window.json")) {
    x = require("./window.json").x;
    y = require("./window.json").y;
    width = require("./window.json").width;
    height = require("./window.json").height;
} else {
    x = 0;
    y = 0;
    width = 400;
    height = 600;
    config = {
        x: x,
        y: y,
        width: width,
        height: height
    }
    fs.writeFileSync("./window.json", JSON.stringify(config, null, 1), "utf-8", function() {});
}

function openWindow() {
    win = new BrowserWindow({
        x: x,
        y: y,
        width: width,
        height: height,
        title: `bangumi`,
        frame: false
    });

    win.loadURL('file://' + __dirname + '/index.html');

    win.on("closed", () => {
        win = null;
    });

    win.on("resize", () => {
        const { screen } = electron
        const { workArea } = screen.getPrimaryDisplay();
        config = {
            x: win.getPosition()[0],
            y: win.getPosition()[1],
            width: win.getSize()[0],
            height: win.getSize()[1]
        }
        fs.writeFileSync("./window.json", JSON.stringify(config, null, 1), "utf-8", function() {})
        console.log(win.getSize(), win.getPosition());
    });

    win.on("move", () => {
        const { screen } = electron
        const { workArea } = screen.getPrimaryDisplay();
        config = {
            x: win.getPosition()[0],
            y: win.getPosition()[1],
            width: win.getSize()[0],
            height: win.getSize()[1]
        }
        fs.writeFileSync("./window.json", JSON.stringify(config, null, 1), "utf-8", function() {})
        console.log(win.getSize(), win.getPosition());
    });
    //win.webContents.openDevTools();
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