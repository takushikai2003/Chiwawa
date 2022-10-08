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

    $get("#lesson_content_option1").addEventListener("click", start_content, {once: true});
}


function start_content(){
    console.log("start content");
    location.href = "../common/index.html?lesson="+1;
}