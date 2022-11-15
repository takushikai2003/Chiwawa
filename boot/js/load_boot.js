import Retry from "../../common esm/Retry.js";
import BootScreen from "./BootScreen.js";
import LessonSelect from "./LessonSelect.js";


function $get(querySelector){
    return document.querySelector(querySelector);
}

const boot_screen = new BootScreen(document.body);

document.documentElement.style.backgroundColor = "#FFD966";
document.body.style.backgroundColor = "#FFD966";

await wait_event(boot_screen, "click");

document.documentElement.style.backgroundColor = "white";
document.body.style.backgroundColor = "white";

new LessonSelect(document.body);

$get("#lesson_content_option1").addEventListener("click", ()=>{
    start_content(`../Lessons/vocabulary lesson/index.html?lesson=${1}`);
}, {once: true});

$get("#lesson_content_option2").addEventListener("click", ()=>{
    start_content(`../Lessons/talk like/index.html?lesson=${1}`);
}, {once: true});

$get("#video_lesson").addEventListener("click", ()=>{
    start_content(`../Lessons/video text/index.html?lesson=${1}`);
}, {once: true});

$get("#japanese_syllabary").addEventListener("click", ()=>{
    start_content("../Japanese syllabary/index.html");
}, {once: true});

$get("#retry").addEventListener("click",()=>{
    Retry();
}, {once: true});

function start_content(url){
    console.log("start content");
    location.href = url;
}


function wait_event(target, event){
    return new Promise(resolve => {
        target.addEventListener(event, (e)=>{
            resolve(e);
        }, {once: true});
    });
}