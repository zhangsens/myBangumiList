const ipc = require('electron').ipcRenderer;
const remote = require('electron').remote;
const http = require("http");
const io = require("cheerio")
const fs = require("fs");
const userAgent = {
    desktop: 'bilimini Desktop like Mozilla/233 (Chrome and Safari)',
    mobile: 'bilimini Mobile like (iPhone or Android) whatever'
};
const bangumiInfo = document.getElementById("myBangumiInfo");
let wv;

checkFileExists();

function returnIndex() {
    wv.style.display = "flex";
    bangumiInfo.style.display = "none";
    //wv.src = "http://bangumi.tv/subject_search";
}

function myBangumiInfo() {
    wv.style.display = "none";
    bangumiInfo.style.display = "block";
    bangumiInfo.innerHTML = "";
    readBangumiData();
}

function addBangumi() {
    var url = wv.src;
    if (!url.match(/subject/)) {
        return false;
    }
    var loading = document.getElementById("loading");
    loading.style.display = "block";
    http.get(url, function(res) {
        var html = "";
        res.on("data", function(chunk) {
            html += chunk;
        });
        res.on("end", function() {
            var $ = io.load(html);
            var bangumi = {};
            bangumi.name = $("h1 a").attr("title");
            bangumi.length = $(".prg_list li").length;
            bangumi.looked = 0;
            bangumi.img = $("#bangumiInfo img").attr("src");
            fs.exists("./data/" + bangumi.name + ".txt", function(exists) {
                if (!exists) {
                    fs.writeFile("./data/" + bangumi.name + ".txt", JSON.stringify(bangumi), "utf8", function(err) {
                        if (err) throw err;
                        loading.style.display = "none";
                    });
                }
            });
        });
    });
    writeBangumiData();
}

function bangumiLooked(dom) {
    var name = dom.parentNode.parentNode.children[0].childNodes[0].data;
    var looked = dom.childNodes[0].data;
    for (let i = 0; i < dom.parentNode.children.length; i++) {
        if (i < looked) {
            dom.parentNode.children[i].className = "looked";
        } else {
            dom.parentNode.children[i].className = "";
        }
    }
    fs.readFile("./data/" + name + ".txt", "utf-8", function(err, res) {
        var data = JSON.parse(res);
        data.looked = looked;
        fs.writeFile("./data/" + name + ".txt", JSON.stringify(data), "utf-8", function(err) {
            if (err) throw err;
        });
    })
}

function closeWindow() {
    remote.getCurrentWindow().close();
}

function checkFileExists() {
    var existsFile = fs.existsSync("./data");
    if (!existsFile) {
        fs.mkdir("./data", function() {});
    }
}

function readBangumiData() {
    //文件是否存在
    var existsFile = fs.existsSync("./data");
    //读取所有.txt文件
    if (!existsFile) {
        fs.mkdir("./data");
    } else {
        fs.readdir("./data", function(err, result) {
            for (let i in result) {
                var _bangumi = JSON.parse(fs.readFileSync("./data/" + result[i], "utf8"));
                var html = " <div><img src='http:" + _bangumi.img + "'><div><p>" + _bangumi.name + "</p><p>";
                for (let n = 1; n < _bangumi.length + 1; n++) {
                    html += "<span onclick='bangumiLooked(this)'";
                    if (n <= _bangumi.looked) {
                        html += "class='looked'";
                    }
                    html += ">" + n + "</span> ";
                }
                html += "</p></div></div>";
                bangumiInfo.innerHTML += html;
            }
        });
    }
}

function writeBangumiData() {

}

window.addEventListener('DOMContentLoaded', function() {
    wv = document.getElementById("wv");
    wv.addEventListener('will-navigate', function(e) {
        if (e.url.match(/subject_search/)) {
            var target = e.url.substr(0, e.url.length - 3) + "2";
            wv.loadURL(target);
        } else if (e.url.match(/subject/)) {}
    });
});