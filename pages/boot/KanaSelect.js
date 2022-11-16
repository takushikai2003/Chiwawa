import getDataAsString from "../../common esm/getDataAsString.js";
import HiraganaTable from "./HiraganaTable.js";
import KatakanaTable from "./KatakanaTable.js";

const insertHTML = await getDataAsString("./pages/boot/KanaSelect.html");

class JapaneseSyllabaryStartPage{
    constructor(insertTarget){

        insertTarget.innerHTML = insertHTML;

        const url = new URL(window.location.href);
        const params = url.searchParams;
        const page = params.get("page");
        if(page != "select_kana"){
            history.pushState(null, null, "./index.html?page=select_kana");   
        }

        document.querySelector("#hiragana_btn")
        .addEventListener("click",()=>{
            new HiraganaTable();
        });

        document.querySelector("#katakana_btn")
        .addEventListener("click",()=>{
            new KatakanaTable();
        });
    }
}


export default JapaneseSyllabaryStartPage;