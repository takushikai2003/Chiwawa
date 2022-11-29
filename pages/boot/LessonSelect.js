import Retry from "../../common esm/Retry.js";
import startLesson from "../../js/load_lesson.js";
import getDataAsString from "../../common esm/getDataAsString.js";
import { getMissedStacks } from "../../common esm/missedStack.js";
import Setting from "./Setting.js";
import {HiraganaTable_a_n, HiraganaTable_ga_po, HiraganaTable_kya_pyo} from "./HiraganaTable.js";
import {KatakanaTable_a_n, KatakanaTable_ga_po, KatakanaTable_kya_pyo} from "./KatakanaTable.js";


function $get(querySelector){
    return document.querySelector(querySelector);
}

const insertHTML = await getDataAsString("./pages/boot/LessonSelect.html");

class LessonSelect{
    constructor(insertTarget){
        insertTarget.innerHTML = insertHTML;

        const url = new URL(window.location.href);
        const params = url.searchParams;
        const page = params.get("page");
        if(page != "selct_lesson"){
            history.pushState(null, null, "./index.html?page=select_lesson");   
        }

        $get("#hiragana_a_n").addEventListener("click",()=>{
            new HiraganaTable_a_n();
        });

        $get("#hiragana_ga_po").addEventListener("click",()=>{
            new HiraganaTable_ga_po();
        });

        $get("#hiragana_kya_pyo").addEventListener("click",()=>{
            new HiraganaTable_kya_pyo();
        });

        $get("#katakana_a_n").addEventListener("click",()=>{
            new KatakanaTable_a_n();
        });

        $get("#katakana_ga_po").addEventListener("click",()=>{
            new KatakanaTable_ga_po();
        });

        $get("#katakana_kya_pyo").addEventListener("click",()=>{
            new KatakanaTable_kya_pyo();
        });


        $get("#lesson_content_option1").addEventListener("click", async()=>{
            await startLesson(`./data/vocabulary/lesson${1}.json`);
            history.back();
        }, {once: true});
        
        $get("#lesson_content_option2").addEventListener("click", async()=>{
            await startLesson(`./data/talk like/lesson${1}.json`);
            history.back();
        }, {once: true});
        
        $get("#video_lesson").addEventListener("click", async()=>{
            await startLesson(`./data/video text/lesson${1}.json`);
            history.back();
        }, {once: true});
        
        $get("#retry").addEventListener("click", async ()=>{
            while(true){
                if(getMissedStacks().length == 0){
                    break;
                }

                await Retry();
            }
            console.log("finish retry");//ここはwhileループしてもいいかも
        
            history.back();
        }, {once: true});


        $get("#lesson_select_setting").addEventListener("click", ()=>{
            new Setting();
        }, {once: true});
    }
}


export default LessonSelect;