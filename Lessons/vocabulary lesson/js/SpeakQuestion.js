import hide_all_window from "./hide_all_window.js";
import SpeechRecognizer from "../../../common esm/speech recognizetion/SpeechRecognizer.js";
import {setMissedStack, getMissedStack, removeMissedStack} from "../../../common esm/missedStack.js";

const $get = function (querySelector){
    return document.querySelector(querySelector);
}

const path_to_lesson_data = "../lessons_data";

class SpeakQuestion{
    constructor({img_src, pic_txt, correct_txt}){

        const _img_src = path_to_lesson_data + img_src;

        hide_all_window();
        $get("#speak_question_window").hidden = false;

        $get("#speak_question_picture").src = _img_src;
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

        async function rec_start(){
            await SpeechRecognizer.start();
	        mic_area.style.border = "solid 5px red";
            
            setTimeout(() => {
                rec_stop();
            }, 10000);
        }

        async function rec_stop(){
            const judgment_result = await SpeechRecognizer.stop(correct_txt);
            mic_area.style.border = "";
            
            if(judgment_result.correct){
                oncorrect();
            }
            else{
                onmistake(judgment_result.message);
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

        const correct_audio = new Audio("./audios/correct.mp3");
        const mistake_audio = new Audio("./audios/mistake.mp3");

        function oncorrect(){
            correct_audio.play();
            
            let score = Number(localStorage.getItem("score")) || 0;
            score++;
            localStorage.setItem("score", score.toString());

            $get("#speak_question_correctanswer_picture").src = "./images/correct.png";
            $get("#speak_question_correctanswer").innerHTML = "";
            $get("#speak_question_correctanswer_area").hidden = false;
            gonext.disabled = false;

            gonext.addEventListener("click",function(){
                _resolve(true);
            }, {once: true});
        }

        function onmistake(mistake){
            mistake_audio.play();
            
            const mistake_qestion = {
                lessonType: "vocabulary",
                data: {
                    type: "speak",
                    img_src: img_src,
                    pic_txt: pic_txt,
                    correct_txt: correct_txt
                },
                mistake: mistake
            }

            setMissedStack(mistake_qestion);

            $get("#speak_question_correctanswer_picture").src = "./images/mistake.png";
            $get("#speak_question_correctanswer").innerHTML = "Đáp án : " + correct_txt;
            $get("#speak_question_correctanswer_area").hidden = false;
            gonext.disabled = false;

            gonext.addEventListener("click",function(){
                _resolve(false);
            }, {once: true});
        }
    }
}


export default SpeakQuestion;