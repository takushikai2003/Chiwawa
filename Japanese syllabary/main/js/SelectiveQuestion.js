import {setMissedStack, getMissedStack, removeMissedStack} from "../../../common esm/missedStack.js";
import getDataAsString from "../../../common esm/getDataAsString.js";

const insertHTML = await getDataAsString("./pages/Selective.html");

const $get = function (querySelector){
    return document.querySelector(querySelector);
}

const path_to_lesson_data = "../data";


class SelectiveQuestion{
    constructor(insertTarget, {img_src, options, correct_opt_num}, retry=false){
        insertTarget.innerHTML = insertHTML;

        const _img_src = path_to_lesson_data + img_src;

        $get("#selective_question_picture").src = _img_src;
        $get("#selective_question_correctanswer_area").hidden = true;

        const gonext = $get("#selective_question_gonext");
        gonext.innerHTML = "OK";
        gonext.disabled = true;

        let selected_opt_num;
        let correct_opt_text;

        for(let i=0; i<options.length; i++){
            const option = document.createElement("button");
            option.setAttribute("class", "btn btn-lg selective_question_option");
            option.innerHTML = options[i];
            
            if(correct_opt_num == i + 1){
                correct_opt_text =  options[i];
            }

            option.addEventListener("click",()=>{
                selected_opt_num = i + 1;
                gonext.disabled = false;
            });

            $get("#selective_question_area").appendChild(option);
        }


        let _resolve;
        this.onend = function(){
            return new Promise(resolve=>{
                _resolve = resolve;
            });
        }

        gonext.addEventListener("click",()=>{
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

        function onmistake(mistake){
            mistake_audio.play();

            const mistake_qestion = {
                lessonType: "japanese_syllabary",
                data: {
                    type: "selective",
                    img_src: img_src,
                    options: options,
                    correct_opt_num: correct_opt_num
                },
                mistake: mistake
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