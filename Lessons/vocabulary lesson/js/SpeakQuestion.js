import hide_all_window from "./hide_all_window.js";
import SpeechRecognizer from "../../../common esm/speech recognizetion/js/SpeechRecognizer.js";
import get_kana from "../../../common esm/speech recognizetion/js/get_kana.js";
import FuzzySet from "../../../common esm/speech recognizetion/lib/FuzzySet/FuzzySet.esm.js";

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

        function rec_start(){
            SpeechRecognizer.start();
	        mic_area.style.border = "solid 5px red";
            
            setTimeout(() => {
                rec_stop();
            }, 10000);
        }

        async function rec_stop(){
            if(!SpeechRecognizer.recording){
                return;
            }

	        mic_area.style.border = "";

            SpeechRecognizer.stop();
            const message = await SpeechRecognizer.get_message();

            const judgment_result = judge(message, get_kana(correct_txt).join("")); //bool
            
            if(judgment_result){
                oncorrect();
            }
            else{
                onmistake(message);
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
            let score = Number(localStorage.getItem("score")) || 0;
            score++;
            localStorage.setItem("score", score.toString());

            $get("#speak_question_correctanswer_picture").src = "./images/correct.png";
            $get("#speak_question_correctanswer").innerHTML = "ĐÚNG";
            $get("#speak_question_correctanswer_area").hidden = false;
            gonext.disabled = false;

            gonext.addEventListener("click",function(){
                _resolve(true);
            }, {once: true});
        }

        function onmistake(mistake){
            const misetake_qestion = {
                lessonType: "vocabulary",
                data: {
                    type: "speak",
                    img_src: img_src,
                    pic_txt: pic_txt,
                    correct_txt: correct_txt
                },
                mistake: mistake
            }

            const missed_stack = JSON.parse(localStorage.getItem("missed_stack")) || [];
            missed_stack.push(misetake_qestion);

            localStorage.setItem("missed_stack", JSON.stringify(missed_stack));


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


export default SpeakQuestion;