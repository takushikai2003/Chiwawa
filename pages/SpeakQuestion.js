import SpeechRecognizer from "../common esm/speech recognizetion/SpeechRecognizer.js";
import {setMissedStack, getMissedStack, removeMissedStack} from "../common esm/missedStack.js";
import getDataAsString from "../common esm/getDataAsString.js";
import { correct_audio, mistake_audio } from "../common esm/Audios.js";

const insertHTML = await getDataAsString("./pages/Speak.html");

const $get = function (querySelector){
    return document.querySelector(querySelector);
}

const path_to_lesson_data = "./data";

class SpeakQuestion{
    constructor(insertTarget, {img_src, pic_txt="", correct_txt}, retry=false){
        insertTarget.innerHTML = insertHTML;
        
        const _img_src = path_to_lesson_data + img_src;

        $get("#speak_question_picture").src = _img_src;
        $get("#speak_question_picture_text").innerHTML = pic_txt;
        $get("#speak_question_correctanswer_area").hidden = true;

        const mic_area = $get("#speak_question_mic_area");
        const gonext = $get("#speak_question_gonext");

        gonext.disabled = true;


        //音声認識
        let recording = false;
        mic_area.addEventListener("click", async ()=>{
            if(!recording){
                await rec_start();
                recording = true;
            }
            else{
                await rec_stop();
                recording = false;
            }
        });

        async function rec_start(){
            await SpeechRecognizer.start();
	        mic_area.style.border = "solid 5px red";
            
            setTimeout(() => {
                if(recording){
                    rec_stop();
                }
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

        let _resolve;
        this.onend = function(){
            return new Promise(resolve=>{
                _resolve = resolve;
            });
        }


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
                data: {
                    type: "speak",
                    img_src: img_src,
                    pic_txt: pic_txt,
                    correct_txt: correct_txt
                },
                mistake: mistake
            }

            if(!retry){
                setMissedStack(mistake_qestion);
            }


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