import { remote } from "electron"

function closeWindow() {
    remote.getCurrentWindow().close();
}

function addBangumi() {
    console.log("addBangumi");
}

function myBangumiInfo() {
    search.style.display = "none";
    sInput.style.display = "none";
    btn.style.display = "none";
    bangumi.style.display = "none";
    tSearch.style.flexGrow = 1;
}

function dangumiSearch() {
    search.style.display = "block";
    sInput.style.display = "block";
    btn.style.display = "block";
    bangumi.style.display = "none";
    tSearch.style.flexGrow = 6;
}

export { dangumiSearch, myBangumiInfo, addBangumi, closeWindow }