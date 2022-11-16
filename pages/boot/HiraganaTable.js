import startLesson from "../../js/load_lesson.js";
import getDataAsString from "../../common esm/getDataAsString.js";

const insertHTML = await getDataAsString("./pages/boot/HiraganaTable.html");

const hiragana_table_data = [
    ["あ","い","う","え","お"],
    ["か","き","く","け","こ"],
    ["さ","し","す","せ","そ"],
    ["た","ち","つ","て","と"],
    ["な","に","ぬ","ね","の"],
    ["は","ひ","ふ","へ","ほ"],
    ["ま","み","む","め","も"],
    ["や","","ゆ","","よ"],
    ["ら","り","る","れ","ろ"],
    ["わ","","","","を"],
    ["ん","","","",""],
];

class HiraganaTable{
    constructor(){
        document.body.innerHTML = insertHTML;

        const url = new URL(window.location.href);
        const params = url.searchParams;
        const page = params.get("page");
        if(page != "hiragana_table"){
            history.pushState(null, null, "./index.html?page=hiragana_table");   
        }

        const hiragana_table = document.querySelector("#hiragana_table");

        for(let i=0; i<hiragana_table_data.length; i++){
            const tr = document.createElement("tr");
            for(let j=0; j<hiragana_table_data[i].length; j++){
                const td = document.createElement("td");
                td.innerHTML = hiragana_table_data[i][j];
                tr.appendChild(td);
            }
        
            tr.addEventListener("click", ()=>{
                start_japanese_syllabary("hiragana", i);
            });
        
            hiragana_table.appendChild(tr);
        }
        
    }
}


function start_japanese_syllabary(type, index){
    const path = `./data/japanese syllabary/${type}_${index}.json`
    startLesson(path);
}


export default HiraganaTable;