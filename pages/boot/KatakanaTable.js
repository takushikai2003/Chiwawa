import startLesson from "../../js/load_lesson.js";
import getDataAsString from "../../common esm/getDataAsString.js";

const insertHTML = await getDataAsString("./pages/boot/KatakanaTable.html");

const katakana_table_data = [
    ["ア","イ","ウ","エ","オ"],
    ["カ","キ","ク","ケ","コ"],
    ["サ","シ","ス","セ","ソ"],
    ["タ","チ","ツ","テ","ト"],
    ["ナ","ニ","ヌ","ネ","ノ"],
    ["ハ","ヒ","フ","へ","ホ"],
    ["マ","ミ","ム","メ","モ"],
    ["ヤ","","ユ","","ヨ"],
    ["ラ","リ","ル","レ","ロ"],
    ["ワ","","","","ヲ"],
    ["ン","","","",""],
];


class KatakanaTable{
    constructor(){
        document.body.innerHTML = insertHTML;

        const url = new URL(window.location.href);
        const params = url.searchParams;
        const page = params.get("page");
        if(page != "katakana_table"){
            history.pushState(null, null, "./index.html?page=katakana_table");   
        }

        const learnedKatakanaRow = Number(localStorage.getItem("learnedKatakanaRow")) || 0;

        const katakana_table = document.querySelector("#katakana_table");

        for(let i=0; i<katakana_table_data.length; i++){
            const tr = document.createElement("tr");
            for(let j=0; j<katakana_table_data[i].length; j++){
                const td = document.createElement("td");
                td.innerHTML = katakana_table_data[i][j];
                tr.appendChild(td);
            }

            if(learnedKatakanaRow >= i){
                tr.addEventListener("click", ()=>{
                    start_japanese_syllabary("katakana", i);
                });
            }
            else{
                tr.style.color = "gainsboro";
            }
        
            katakana_table.appendChild(tr);
        }
    }
}


async function start_japanese_syllabary(type, index){
    const path = `./data/japanese syllabary/${type}_${index}.json`
    await startLesson(path);
    const learnedKatakanaRow = Number(localStorage.getItem("learnedKatakanaRow")) || 0;
    localStorage.setItem("learnedKatakanaRow", learnedKatakanaRow+1);
    history.back();
    return;
}


export default KatakanaTable;