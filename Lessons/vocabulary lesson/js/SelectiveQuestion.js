import hide_all_window from "./hide_all_window.js";
import {setMissedStack} from "../../../common esm/missedStack.js";

const path_to_lesson_data = "../lessons_data";

const $get = function (querySelector){
    return document.querySelector(querySelector);
}

class SelectiveQuestion{
    constructor({img_src, audio_src, opt1_txt, opt2_txt, opt3_txt, correct_opt_num}, retry=false){
        const _img_src = path_to_lesson_data + img_src;
        const _audio_src = path_to_lesson_data + audio_src;

        hide_all_window();
        $get("#selective_question_window").hidden = false;
        $get("#selective_question_picture").src = _img_src;
        $get("#selective_question_correctanswer_area").hidden = true;

        const option1 = $get("#selective_question_option1");
        const option2 = $get("#selective_question_option2");
        const option3 = $get("#selective_question_option3");
        const gonext = $get("#selective_question_gonext");
        const audio = new Audio(_audio_src);

        option1.innerHTML = opt1_txt;
        option2.innerHTML = opt2_txt;
        option3.innerHTML = opt3_txt;

        gonext.innerHTML = "OK";
        gonext.disabled = true;

        $get("#selective_question_picture_area").onclick = function(){
            audio.play();
        }

        
        let correct_opt_text;
        if(correct_opt_num==1){
            correct_opt_text = opt1_txt;
        }
        else if(correct_opt_num==2){
            correct_opt_text = opt2_txt;
        }
        else{
            correct_opt_text = opt3_txt;
        }


        let selected_opt_num;

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

        gonext.addEventListener("click",()=>{
            audio.remove();
            
            if(selected_opt_num == correct_opt_num){
                oncorrect();
            }
            else{
                onmistake(selected_opt_num);
            }

            gonext.innerHTML = "Next";
        },{once: true});

        const correct_audio = new Audio("./audios/correct.mp3");
        const mistake_audio = new Audio("./audios/mistake.mp3");
        
        //正解ならtrue,不正解ならfalseを返してresolve
        function oncorrect(){
            correct_audio.play();
            
            $get("#selective_question_correctanswer_picture").src = "./images/correct.png";
            $get("#selective_question_correctanswer").innerHTML = "";
            $get("#selective_question_correctanswer_area").hidden = false;

            let score = Number(localStorage.getItem("score")) || 0;
            score++;
            localStorage.setItem("score", score.toString());

            gonext.addEventListener("click",()=>{
                _resolve(true);
            });
        }

        function onmistake(selected_opt_num){
            mistake_audio.play();

            const mistake_qestion = {
                lessonType: "vocabulary",
                data: {
                    type: "selective",
                    img_src: img_src,
                    audio_src: audio_src,
                    opt1_txt: opt1_txt,
                    opt2_txt: opt2_txt,
                    opt3_txt: opt3_txt,
                    correct_opt_num: correct_opt_num,
                },
                mistake: selected_opt_num
            }

            if(!retry){
                setMissedStack(mistake_qestion);
            }


            $get("#selective_question_correctanswer_picture").src = "./images/mistake.png";
            $get("#selective_question_correctanswer").innerHTML = "Đáp án : " + correct_opt_text;
            $get("#selective_question_correctanswer_area").hidden = false;

            gonext.addEventListener("click",()=>{
                _resolve(false);
            });
        }
    }
}


export default SelectiveQuestion;