import Retry from "../../common esm/Retry.js";
import JapaneseSyllabarySelect from "../../pages/boot/KanaSelect.js";
import startLesson from "../../js/load_lesson.js";
import getDataAsString from "../../common esm/getDataAsString.js";
import { getMissedStacks } from "../../common esm/missedStack.js";

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
        
        //asyncでないと。
        $get("#japanese_syllabary").addEventListener("click", ()=>{
            new JapaneseSyllabarySelect(document.body);
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
    }
}


export default LessonSelect;