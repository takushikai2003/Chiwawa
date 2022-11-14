import Retry from "../../common esm/Retry.js";

const url = new URL(window.location.href);
const params = url.searchParams;
const page_name = params.get("page");
const retry = params.get("retry");

// console.log(retry);
if(retry){
    Retry();
}

function $get(querySelector){
    return document.querySelector(querySelector);
}

const boot_screen = $get("#boot_screen");
const lesson_select_menu = $get("#lesson_select_menu");


if(page_name == "lesson_select"){
    document.documentElement.style.backgroundColor = "white";
    document.body.style.backgroundColor = "white";

    boot_screen.hidden = true;
    lesson_select_menu.hidden = false;
}

else{
    document.documentElement.style.backgroundColor = "#FFD966";
    document.body.style.backgroundColor = "#FFD966";

    boot_screen.hidden = false;
    lesson_select_menu.hidden = true;

    boot_screen.addEventListener("click", ()=>{
        document.documentElement.style.backgroundColor = "white";
        document.body.style.backgroundColor = "white";
        boot_screen.hidden = true;
        lesson_select_menu.hidden = false;
    }, {once: true});
}



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