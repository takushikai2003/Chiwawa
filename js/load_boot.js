import Retry from "../common esm/Retry.js";
import BootScreen from "../pages/boot/BootScreen.js";
import LessonSelect from "../pages/boot/LessonSelect.js";
import JapaneseSyllabarySelect from "../pages/boot/JapaneseSyllabarySelect.js";
import startLesson from "./load_lesson.js";


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

$get("#lesson_content_option1").addEventListener("click", async()=>{
    await startLesson(`./data/vocabulary/lesson${1}.json`);
}, {once: true});

$get("#lesson_content_option2").addEventListener("click", async()=>{
    await startLesson(`./data/talk like/lesson${1}.json`);
}, {once: true});

$get("#video_lesson").addEventListener("click", async()=>{
    await startLesson(`./data/video text/lesson${1}.json`);
}, {once: true});

$get("#japanese_syllabary").addEventListener("click", ()=>{
    new JapaneseSyllabarySelect();
}, {once: true});

$get("#retry").addEventListener("click",()=>{
    Retry();
}, {once: true});


function wait_event(target, event){
    return new Promise(resolve => {
        target.addEventListener(event, (e)=>{
            resolve(e);
        }, {once: true});
    });
}