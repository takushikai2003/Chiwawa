function $get(querySelector){
    return document.querySelector(querySelector);
}


$get("#boot_screen").addEventListener("click", Start, {once: true});


function Start(){
    $get("#boot_screen").hidden = true;
    $get("#select_menu").hidden = false;

    $get("#select_menu_option2").addEventListener("click", lesson_select, {once: true});
}


function lesson_select(){
    $get("#select_menu").hidden = true;
    $get("#lesson_select_menu").hidden = false;

    $get("#lesson_select_option1").addEventListener("click", lesson_content_select, {once: true});
}


function lesson_content_select(){
    $get("#lesson_select_menu").hidden = true;
    $get("#lesson_content_select_menu").hidden = false;

    $get("#lesson_content_option1").addEventListener("click", ()=>{
        start_content(`../vocabulary lesson/index.html?lesson=${1}`);
    }, {once: true});

    $get("#lesson_content_option2").addEventListener("click", ()=>{
        start_content(`../talk like/index.html`);
    }, {once: true});

    $get("#lesson_content_option3").addEventListener("click", ()=>{
        start_content(`../video text/index.html`);
    }, {once: true});
}


function start_content(url){
    console.log("start content");
    location.href = url;
}