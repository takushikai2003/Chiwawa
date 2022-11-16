import startLesson from "../../js/load_lesson.js";
import getDataAsString from "../../common esm/getDataAsString.js";

const insertHTML = await getDataAsString("./pages/boot/JapaneseSyllabarySelect.html");

class JapaneseSyllabaryStartPage{
    constructor(insertTarget){

        insertTarget.innerHTML = insertHTML;

        const select_kana_window = document.querySelector("#select_kana_window");

        document.querySelector("#hiragana_btn")
        .addEventListener("click",()=>{
            select_kana_window.hidden = true;
            document.querySelector("#hiragana_table_window").hidden = false;
        });
        
        
        document.querySelector("#katakana_btn")
        .addEventListener("click",()=>{
            select_kana_window.hidden = true;
            document.querySelector("#katakana_table_window").hidden = false;
        });
        
        
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
        
        
        
        const katakana_table = document.querySelector("#katakana_table");
        
        for(let i=0; i<katakana_table_data.length; i++){
            const tr = document.createElement("tr");
            for(let j=0; j<katakana_table_data[i].length; j++){
                const td = document.createElement("td");
                td.innerHTML = katakana_table_data[i][j];
                tr.appendChild(td);
            }

            tr.addEventListener("click", ()=>{
                start_japanese_syllabary("katakana", i);
            });
        
            katakana_table.appendChild(tr);
        }
        
        
        function start_japanese_syllabary(type, index){
            const path = `./data/japanese syllabary/${type}_${index}.json`
            startLesson(path);
        }
    }
}


export default JapaneseSyllabaryStartPage;