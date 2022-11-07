const url = new URL(window.location.href);
const params = url.searchParams;
const page_name = params.get("page");

function $get(querySelector){
    return document.querySelector(querySelector);
}

const boot_screen = $get("#boot_screen");
const lesson_select_menu = $get("#lesson_select_menu");


if(page_name == "lesson_select"){
    boot_screen.hidden = true;
    lesson_select_menu.hidden = false;
}

else{
    boot_screen.hidden = false;
    lesson_select_menu.hidden = true;

    boot_screen.addEventListener("click", ()=>{
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
    start_content("../Japanese syllabary/start page/index.html");
}, {once: true});


function start_content(url){
    console.log("start content");
    location.href = url;
}