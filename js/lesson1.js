const practice_data = {
    img_src: "./images/図1.jpg",
    pic_txt: "chào buổi trưa",
    audio_src: "./こんにちは.mp3",
    play_txt: "こんにちは",
    supplement_txt: "Nghe và nói theo 3 lần nhé!\n(聞きながら３回繰り返しましょう）"
}

const selective_question_data = {
    img_src: "./images/図1.jpg",
    audio_src: "./こんにちは.mp3",
    opt1_txt: "こにちは",
    opt2_txt: "こんにちは",
    opt3_txt: "こんちは",
    correct_opt_num: 2,
}

const description_question_data = {
    img_src: "./images/図1.jpg",
    audio_src: "./こんにちは.mp3",
    play_txt: "こんにちは",
    supplement_txt: "ベトナム語を書こう",
    correct_txt: "ĐÚNG",
}

const speak_question_data = {
    img_src: "./images/図1.jpg",
    pic_txt: "こんにちは",
    correct_txt: "こんにちは",
    speak_lang: "ja",
}


// practice_start(practice_data);

//step1 practice
function practice_start({img_src, pic_txt, audio_src, play_txt, supplement_txt}){
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

        selective_question_start(selective_question_data);
    },{once:true});
}


function selective_question_start({img_src, audio_src, opt1_txt, opt2_txt, opt3_txt, correct_opt_num}){
    hideAllWindow();
    $get("#selective_question_window").hidden = false;
    
    $get("#selective_question_picture").src = img_src;
    $get("#selective_question_audio").src = audio_src;
    const option1 = $get("#selective_question_option1");
    const option2 = $get("#selective_question_option2");
    const option3 = $get("#selective_question_option3");
    const gonext = $get("#selective_question_gonext");

    option1.innerHTML = opt1_txt;
    option2.innerHTML = opt2_txt;
    option3.innerHTML = opt3_txt;

    gonext.disabled = true;

    let selected_opt_num = 0;

    option1.onclick = function(){
        selected_opt_num = 1;
        gonext.disabled = false;
    }

    option2.onclick = function(){
        selected_opt_num = 2;
        gonext.disabled = false;
    }

    option3.onclick = function(){
        selected_opt_num = 3;
        gonext.disabled = false;
    }


    gonext.onclick = function(){
        if(selected_opt_num == correct_opt_num){
            oncorrect();
        }
        else{
            onmistake();
        }
    }

    function oncorrect(){
        description_question_start();
    }

    function onmistake(){
        description_question_start(description_question_data);
    }

};


function description_question_start({img_src, audio_src, play_txt, supplement_txt, correct_txt,}){
    hideAllWindow();
    $get("#description_question_window").hidden = false;

    $get("#description_question_picture").src = img_src;
    $get("#description_question_audio").src = audio_src;
    $get("#description_question_play_text").innerHTML = play_txt;
    $get("#description_question_supplement").innerHTML = supplement_txt;
    $get("#description_question_correctanswer").innerHTML = correct_txt;

    const correctanswer_area = $get("#description_question_correctanswer_area");
    const gonext = $get("#description_question_gonext");
    const input = $get("#description_question_input");

    correctanswer_area.hidden = true;

    $get("#description_question_playtext_area").onclick = function(){
        $get("#description_question_audio").play();
    }


    gonext.onclick = function(){
        if(input.value == correct_txt){
            oncorrect();
        }
        else{
            onmistake();
        }
    }

    
    function oncorrect(){
        correctanswer_area.hidden = false;
        gonext.onclick = function(){speak_question_start()};
    }

    //[未]バツの時の画像に置き換え
    function onmistake(){
        correctanswer_area.hidden = false;
        gonext.onclick = function(){speak_question_start()};
    }

}

//test
// description_question_start(description_question_data);


function speak_question_start({img_src, pic_txt, correct_txt, speak_lang}){
    hideAllWindow();
    $get("#speak_question_window").hidden = false;

    $get("#speak_question_picture").src = img_src;
    $get("#speak_question_picture_text").innerHTML = pic_txt;
    $get("#speak_question_correctanswer").innerHTML = correct_txt;

    const mic_area = $get("#speak_question_mic_area");
    const gonext = $get("#speak_question_gonext");

    gonext.disabled = true;


    //音声認識
    const SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
    const SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList;
    const SpeechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent;

    

    mic_area.onpointerdown = function(){

    }
}