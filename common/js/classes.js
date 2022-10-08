import SpeechRecognizer from "../../speech recognizetion/js/SpeechRecognizer.js";
import get_kana from "../../speech recognizetion/js/get_kana.js";
import FuzzySet from "../../speech recognizetion/lib/FuzzySet/FuzzySet.esm.js";


function hide_all_window(){
    document.querySelector("#practice_window").hidden = true;
    document.querySelector("#selective_question_window").hidden = true;
    document.querySelector("#description_question_window").hidden = true;
    document.querySelector("#speak_question_window").hidden = true;   
}

const $get = function (querySelector){
    return document.querySelector(querySelector);
}


class practice{
    constructor({img_src, pic_txt, audio_src, play_txt, supplement_txt}){

        hide_all_window();
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
    
        let _resolve;
        this.onend = function(){
            return new Promise(resolve=>{
                _resolve = resolve;
            });
        }
    

        //go next
        $get("#practice_gonext").addEventListener("click",()=>{
            $get("#practice_playtext_area").removeEventListener("click", audio_play);
            $get("#practice_audio").removeEventListener("click", onplayended);
    
            score++;

            _resolve();
            
        },{once:true});
    }
}


class selective_question{
    constructor({img_src, audio_src, opt1_txt, opt2_txt, opt3_txt, correct_opt_num}){
        hide_all_window();
        $get("#selective_question_window").hidden = false;
        $get("#selective_question_picture").src = img_src;
        
        const option1 = $get("#selective_question_option1");
        const option2 = $get("#selective_question_option2");
        const option3 = $get("#selective_question_option3");
        const gonext = $get("#selective_question_gonext");
        const audio = $get("#selective_question_audio");

        audio.src = audio_src;

        option1.innerHTML = opt1_txt;
        option2.innerHTML = opt2_txt;
        option3.innerHTML = opt3_txt;

        gonext.disabled = true;

        $get("#selective_question_picture_area").onclick = function(){
            audio.play();
        }
        

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


        let _resolve;
        this.onend = function(){
            return new Promise(resolve=>{
                _resolve = resolve;
            });
        }

        gonext.onclick = function(){
            if(selected_opt_num == correct_opt_num){
                oncorrect();
            }
            else{
                onmistake();
            }
        }

        //正解ならtrue,不正解ならfalseを返してresolve
        function oncorrect(){
            score++;
            _resolve(true);
        }

        function onmistake(){
            _resolve(false);
        }
    }
}


class description_question{
    constructor({img_src, audio_src, play_txt, supplement_txt, correct_txt,}){
        hide_all_window();
        $get("#description_question_window").hidden = false;
    
        $get("#description_question_picture").src = img_src;
        $get("#description_question_audio").src = audio_src;
        $get("#description_question_play_text").innerHTML = play_txt;
        $get("#description_question_supplement").innerHTML = supplement_txt;
        
    
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
    
        let _resolve;
        this.onend = function(){
            return new Promise(resolve=>{
                _resolve = resolve;
            });
        }
        
        function oncorrect(){
            score++;
            
            $get("#description_question_correctanswer_picture").src = "./images/correct.png";
            $get("#description_question_correctanswer").innerHTML = "ĐÚNG";
            correctanswer_area.hidden = false;

            gonext.addEventListener("click",function(){
                _resolve(true);
            }, {once: true});
        }
    
        function onmistake(){
            $get("#description_question_correctanswer_picture").src = "./images/mistake.png";
            $get("#description_question_correctanswer").innerHTML = "SAI rồi bạn ơi!\nĐáp án :\n" + correct_txt;
            correctanswer_area.hidden = false;

            gonext.addEventListener("click",function(){
                _resolve(false);
            }, {once: true});
        }
    }
}

//未
class speak_question{
    constructor({img_src, pic_txt, correct_txt}){
        hide_all_window();
        $get("#speak_question_window").hidden = false;

        $get("#speak_question_picture").src = img_src;
        $get("#speak_question_picture_text").innerHTML = pic_txt;
        $get("#speak_question_correctanswer_area").hidden = true;

        const mic_area = $get("#speak_question_mic_area");
        const gonext = $get("#speak_question_gonext");

        gonext.disabled = true;


        //音声認識
        let recording = false;
        mic_area.addEventListener("pointerdown", ()=>{
            if(!recording){
                rec_start();
                recording = true;
            }
            else{
                rec_stop();
                recording = false;
            }
        });

        function rec_start(){
            SpeechRecognizer.start();

            setTimeout(() => {
                rec_stop();
            }, 10000);
        }

        async function rec_stop(){
            if(!SpeechRecognizer.recording){
                return;
            }

            SpeechRecognizer.stop();
            const message = await SpeechRecognizer.get_message();

            const judgment_result = judge(message, get_kana(correct_txt).join("")); //bool
            
            if(judgment_result){
                oncorrect();
            }
            else{
                onmistake();
            }
        }


        function judge(message, seek_message){
            const threshold = 0.7;

            const message_kana = get_kana(message);

            const fs = FuzzySet(message_kana);
            const fs_result = fs.get(seek_message);

            if(fs_result == null){
                return false;
            }

            const fs_confidence = fs_result[0];

            if(fs_confidence < threshold){
                return false;
            }
            else{
                return true;
            }

        }
        

        let _resolve;
        this.onend = function(){
            return new Promise(resolve=>{
                _resolve = resolve;
            });
        }

        function oncorrect(){
            $get("#description_question_correctanswer_picture").src = "./images/correct.png";
            $get("#speak_question_correctanswer").innerHTML = "ĐÚNG";
            $get("#speak_question_correctanswer_area").hidden = false;
            gonext.disabled = false;

            gonext.addEventListener("click",function(){
                _resolve(true);
            }, {once: true});
        }

        function onmistake(){
            $get("#speak_question_correctanswer_picture").src = "./images/mistake.png";
            $get("#speak_question_correctanswer").innerHTML = "SAI rồi bạn ơi!\nĐáp án :\n" + correct_txt;
            $get("#speak_question_correctanswer_area").hidden = false;
            gonext.disabled = false;

            gonext.addEventListener("click",function(){
                _resolve(false);
            }, {once: true});
        }
    }
}


export {practice, selective_question, description_question, speak_question};