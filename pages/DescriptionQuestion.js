//未使用
import {setMissedStack, getMissedStack, removeMissedStack} from "../common esm/missedStack.js";
import getDataAsString from "../common esm/getDataAsString.js";

const insertHTML = await getDataAsString("./pages/Description.html");

const path_to_lesson_data = "./data";

const $get = function (querySelector){
    return document.querySelector(querySelector);
}

class DescriptionQuestion{
    constructor(insertTarget, {img_src, audio_src, play_txt, supplement_txt, correct_txt,}, retry=false){
        insertTarget.innerHTML = insertHTML;

        const _img_src = path_to_lesson_data + img_src;
        const _audio_src = path_to_lesson_data + audio_src;
    
        $get("#description_question_picture").src = _img_src;
        $get("#description_question_play_text").innerHTML = play_txt;
        $get("#description_question_supplement").innerHTML = supplement_txt;
        
        const audio = new Audio(_audio_src);
        const correctanswer_area = $get("#description_question_correctanswer_area");
        const gonext = $get("#description_question_gonext");
        const input = $get("#description_question_input");
    
        correctanswer_area.hidden = true;
    
        $get("#description_question_playtext_area").onclick = function(){
            audio.play();
        }
    
        gonext.innerHTML = "OK";

        gonext.addEventListener("click",()=>{
            if(input.value == correct_txt){
                oncorrect();
            }
            else{
                onmistake(input.value);
            }

            gonext.innerHTML = "Next";
        }, {once: true});
    
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
            
            $get("#description_question_correctanswer_picture").src = "./images/correct.png";
            $get("#description_question_correctanswer").innerHTML = "";
            correctanswer_area.hidden = false;

            gonext.addEventListener("click",function(){
                _resolve(true);
            }, {once: true});
        }
    
        function onmistake(mistake){
            mistake_audio.play();
            
            const mistake_qestion = {
                lessonType: "vocabulary",
                data: {
                    type: "description",
                    img_src: img_src,
                    audio_src: audio_src,
                    play_txt: play_txt,
                    supplement_txt: supplement_txt,
                    correct_txt: correct_txt
                },
                mistake: mistake
            }

            if(!retry){
                setMissedStack(mistake_qestion);
            }

            
            $get("#description_question_correctanswer_picture").src = "./images/mistake.png";
            $get("#description_question_correctanswer").innerHTML = "Đáp án : " + correct_txt;
            correctanswer_area.hidden = false;

            gonext.addEventListener("click",function(){
                _resolve(false);
            }, {once: true});
        }
    }
}


export default DescriptionQuestion;