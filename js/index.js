import { remote } from "electron"

function closeWindow() {
    remote.getCurrentWindow().close();
}

function addBangumi() {
    console.log("addBangumi");
}

function myBangumiInfo() {
    console.log("myBangumiInfo");
}

function returnIndex() {
    console.log("returnIndex");
}

export { returnIndex, myBangumiInfo, addBangumi, closeWindow }