import startLesson from "../../js/load_lesson.js";
import getDataAsString from "../../common esm/getDataAsString.js";

const insertHTML = await getDataAsString("./pages/boot/KanaTable.html");

const hiragana_table_data_a_n = [
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

const hiragana_table_data_ga_po = [
    ["が","ぎ","ぐ","げ","ご"],
    ["ざ","じ","ず","ぜ","ぞ"],
    ["だ","ぢ","づ","で","ど"],
    ["ば","び","ぶ","べ","ぼ"],
    ["ぱ","ぴ","ぷ","ぺ","ぽ"],
];

const hiragana_table_data_kya_pyo = [
    ["きゃ","","きゅ","","きょ"],
    ["しゃ","","しゅ","","しょ"],
    ["ちゃ","","ちゅ","","ちょ"],
    ["にゃ","","にゅ","","にょ"],
    ["ひゃ","","ひゅ","","ひょ"],
    ["みゃ","","みゅ","","みょ"],
    ["りゃ","","りゅ","","りょ"],
    ["ぎゃ","","ぎゅ","","ぎょ"],
    ["じゃ","","じゅ","","じょ"],
    ["びゃ","","びゅ","","びょ"],
    ["ぴゃ","","ぴゅ","","ぴょ"],
];


class HiraganaTable{
    constructor(table_data, type){//type: a_n など
        document.body.innerHTML = insertHTML;

        const learnedHiranagaRow = Number(localStorage.getItem("learnedHiranagaRow_" + type)) || 0;
        
        const table = document.querySelector("#kana_table");

        for(let i=0; i<table_data.length; i++){
            const tr = document.createElement("tr");
            for(let j=0; j<table_data[i].length; j++){
                const td = document.createElement("td");
                td.innerHTML = table_data[i][j];
                tr.appendChild(td);
            }

            if(learnedHiranagaRow >= i){
                tr.addEventListener("click", ()=>{
                    start_japanese_syllabary("hiragana_" + type, i);
                });
            }
            else{
                tr.style.color = "gainsboro";
            }
        
            table.appendChild(tr);
        }
        
    }
}


class HiraganaTable_a_n extends HiraganaTable{
    constructor(){
        super(hiragana_table_data_a_n, "a_n");
    }
}

class HiraganaTable_ga_po extends HiraganaTable{
    constructor(){
        super(hiragana_table_data_ga_po, "ga_po");
    }
}

class HiraganaTable_kya_pyo extends HiraganaTable{
    constructor(){
        super(hiragana_table_data_kya_pyo, "kya_pyo");
    }
}


async function start_japanese_syllabary(type, index){
    const path = `./data/japanese syllabary/${type}_${index}.json`
    await startLesson(path);
    const learnedHiranagaRow = Number(localStorage.getItem("learnedHiranagaRow_" + type)) || 0;
    localStorage.setItem("learnedHiranagaRow_" + type, learnedHiranagaRow+1);
    history.back();
    return;
}


export {HiraganaTable_a_n, HiraganaTable_ga_po, HiraganaTable_kya_pyo};