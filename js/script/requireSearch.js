import { get } from 'http'
import { load } from 'cheerio'

const requireSearch = function(url,page,fn,end){
    get(url+`&page=${page}`, function(res) {
        var html = "";
        var result = new Array();
        res.on("data", function(chunk) {
            html += chunk;
        })
        res.on("end", function() {
            var $ = load(html);
            var li = $("#browserItemList li");
            if(li == 0){
                end();
            }else{
                fn(li);
                page++;
                return requireSearch(url,page,fn,end);
            }
            
        })
    });
}

export { requireSearch }