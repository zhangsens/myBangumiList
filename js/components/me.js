import React from "react"
import { connect } from 'react-redux'

import fs from 'fs'
console.log("start");
const dir="./data";
const looking="./data/looking.data";
const looked="./data/looked.data";
const exist = fs.existsSync(dir);
if(exist){
    const filelooking = fs.existsSync(looking);
    if(!filelooking){
        fs.writeFileSync(looking,"[]");
    }
    const filelooked = fs.existsSync(looked);
    if(!filelooked){
        fs.writeFileSync(looked,"[]");
    }
}else{
    fs.mkdirSync(dir);
    fs.writeFileSync(looking,"[]");
    fs.writeFileSync(looked,"[]");
}
var bangumiLooking = fs.readFileSync(looking).toString('utf-8');
bangumiLooking = bangumiLooking?JSON.parse(bangumiLooking):[];
var bangumiLooked = fs.readFileSync(looked).toString('utf-8');
bangumiLooked = bangumiLooked?JSON.parse(bangumiLooked):[];

const Me = connect(
    (state)=>({target:state.target,bangumi:state.bangumi,reload:state.reload})
)(class Me extends React.Component{
    bangumiAdd(bangumi){
        if(bangumi && bangumi.eplist.length>0){
            const id = bangumi.id;
            var bangumiexist = false;
            for(let i in bangumiLooking){
                if(bangumiLooking[i].id == id){
                    bangumiexist = true;
                    break;
                }
            }
            for(let i in bangumiLooked){
                if(bangumiLooked[i].id == id || bangumiexist){
                    bangumiexist = true;
                    break;
                }
            }
            if(bangumiexist){
                console.log(`this bangumi is exist!`);
            }else{
                bangumiLooking.push(bangumi);
                fs.writeFile(looking,JSON.stringify(bangumiLooking),"utf-8",function(){});
            }
            
        }
    }
    bangumiList(){
        const html = [];
        html.push(<li key="looking">正在追/补的番剧：</li>);
        for(let i in bangumiLooking){
            let li = this.info(bangumiLooking[i]);
            html.push(li);
        }
        html.push(<li key="looked">已经补完的番剧：</li>);
        for(let i in bangumiLooked){
            let li = this.info(bangumiLooked[i]);
            html.push(li)
        }
        return html;
    }
    info(bangumi){
        return (
            <li key={bangumi.id}>
                <img src={`http:${bangumi.img}`} />
                <div className="my-bangumi-li">
                    <p>{bangumi.name}</p>
                    <ul data-length={bangumi.epsum}>
                        <li onClick={this.listshow.bind(this)}>张开列表</li>
                        {this.epmap(bangumi.id,bangumi.eplist,bangumi.looked)}
                    </ul>
                </div>
            </li>
        )
    }
    epmap(id,eplist,looked){
        var eps = [];
        for(let i in eplist){
            eps.push(<li key={i} className={i<looked?`looked`:``} title={`${eplist[i].title}`} onClick={this.lookAt.bind(this,id,i)}>{`${eplist[i].ep}.${eplist[i].title}`}</li>)
        }
        return eps;
    }
    listshow(e){
        e.persist();
        const target = e.target;
        //console.log(e.target.tagName=="LI");
        const parent = target.parentElement;
        const length = parseInt(parent.getAttribute(`data-length`));
        if(parent.offsetHeight==50){
            target.innerHTML = `收回列表`;
            parent.style.height = `${(length+1)*50}px`;
        }else{
            target.innerHTML = `张开列表`;
            parent.style.height = `50px`;
        }
    }
    lookAt(id,ep){
        /*
            观看进度:
            看完->looked.data
            没看完->looking.data
        */
        ep++;
        for(let i in bangumiLooking){
            if(bangumiLooking[i].id == id){
                bangumiLooking[i].looked = ep;
                if(bangumiLooking[i].looked == bangumiLooking[i].epsum){
                    const bangumi = bangumiLooking.splice(i,1);
                    bangumiLooked.push(bangumi[0]);
                }
                break;
            }
        }
        for(let i in bangumiLooked){
            if(bangumiLooked[i].id == id){
                bangumiLooked[i].looked = ep;
                if(bangumiLooked[i].looked != bangumiLooked[i].epsum){
                    const bangumi = bangumiLooked.splice(i,1);
                    bangumiLooking.push(bangumi[0]);
                }
                break;
            }
        }
        fs.writeFile(looking,JSON.stringify(bangumiLooking),"utf-8",function(){});
        fs.writeFile(looked,JSON.stringify(bangumiLooked),"utf-8",function(){});
        this.props.dispatch({type:"upload"});
    }
    render(){
        var { target,bangumi } = this.props;
        target = target?target:"tMe";
        this.bangumiAdd(bangumi);
        return (
            <div className={target=="tMe"?"me":"me blurred"} id="me">
                <ul>
                    <li>列表</li>
                    {this.bangumiList()}
                </ul>
            </div>
        )
    }
})

export { Me }