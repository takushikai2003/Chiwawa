function $get(querySelector){
    return document.querySelector(querySelector);
}


$get("#boot_screen").addEventListener("click", ()=>{
    $get("#boot_screen").hidden = true;
    $get("#lesson_select_menu").hidden = false;
}, {once: true});


// $get("#lesson_content_option1").addEventListener("click", ()=>{
//     start_content(`../Lessons/vocabulary lesson/index.html?lesson=${1}`);
// }, {once: true});

// $get("#lesson_content_option2").addEventListener("click", ()=>{
//     start_content(`../Lessons/talk like/index.html?lesson=${1}`);
// }, {once: true});

// $get("#lesson_content_option3").addEventListener("click", ()=>{
//     start_content(`../Lessons/video text/index.html?lesson=${1}`);
// }, {once: true});


function start_content(url){
    console.log("start content");
    location.href = url;
}