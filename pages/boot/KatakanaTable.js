import startLesson from "../../js/load_lesson.js";
import getDataAsString from "../../common esm/getDataAsString.js";

const insertHTML = await getDataAsString("./pages/boot/KanaTable.html");

const katakana_table_data_a_n = [
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

const katakana_table_data_ga_po = [
    ["ガ","ギ","グ","ゲ","ゴ"],
    ["ザ","ジ","ズ","ゼ","ゾ"],
    ["ダ","ヂ","ヅ","デ","ド"],
    ["バ","ビ","ブ","ベ","ボ"],
    ["パ","ピ","プ","ペ","ポ"],
];

const katakana_table_data_kya_pyo = [
    ["キャ","","キュ","","キョ"],
    ["シャ","","シュ","","ショ"],
    ["チャ","","チュ","","チョ"],
    ["ニャ","","ニュ","","ニョ"],
    ["ヒャ","","ヒュ","","ヒョ"],
    ["ミャ","","ミュ","","ミョ"],
    ["リャ","","リュ","","リョ"],
    ["ギャ","","ギュ","","ギョ"],
    ["ジャ","","ジュ","","ジョ"],
    ["ビャ","","ビュ","","ビョ"],
    ["ピャ","","ピュ","","ピョ"],
];


class KatakanaTable{
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
                    start_japanese_syllabary("katakana_" + type, i);
                });
            }
            else{
                tr.style.color = "gainsboro";
            }
        
            table.appendChild(tr);
        }
        
    }
}


class KatakanaTable_a_n extends KatakanaTable{
    constructor(){
        super(katakana_table_data_a_n, "a_n");
    }
}

class KatakanaTable_ga_po extends KatakanaTable{
    constructor(){
        super(katakana_table_data_ga_po, "ga_po");
    }
}

class KatakanaTable_kya_pyo extends KatakanaTable{
    constructor(){
        super(katakana_table_data_kya_pyo, "kya_pyo");
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


export {KatakanaTable_a_n, KatakanaTable_ga_po, KatakanaTable_kya_pyo};