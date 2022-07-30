const $get = function (querySelector){
    return document.querySelector(querySelector);
}

//step1 practice
function practice_start(img_src, pic_txt, audio_src, play_txt, supplement_txt){
    hideAllWindow();
    $get("#practice_window").hidden = false;
    
    $get("#practice_picture").src = img_src;
    $get("#practice_picture_text").innerHTML = pic_txt;
    $get("#practice_audio").src = audio_src;
    $get("#practice_play_text").innerHTML = play_txt;
    $get("#practice_supplement").innerHTML = supplement_txt;
    $get("#practice_gonext").disabled = true;


    $get("#practice_playtext_area").addEventListener("click", audio_play);

    function audio_play(){
        $get("#practice_audio").play();
    }

    $get("#practice_audio").addEventListener("ended", onplayended);

    let played_times = 0;
    function onplayended(){
        played_times++;

        if(played_times >= 3){
            $get("#practice_gonext").disabled = false;
        }
    }


    //go next
    $get("#practice_gonext").addEventListener("click",()=>{
        console.log("go next");
        $get("#practice_playtext_area").removeEventListener("click", audio_play);
        $get("#practice_audio").removeEventListener("click", onplayended);
        selective_question_start();
    },{once:true});
}


function selective_question_start(){

};