import hide_all_window from "./hide_all_window.js";
import {setMissedStack, getMissedStack, removeMissedStack} from "../../../common esm/missedStack.js";

const $get = function (querySelector){
    return document.querySelector(querySelector);
}

const path_to_lesson_data = "../lessons_data";


class OrderQuestion{
    constructor({img_src, audio_src, options, correct_order}){

        const _img_src = path_to_lesson_data + img_src;
        const _audio_src = path_to_lesson_data + audio_src;

        hide_all_window();
        $get("#order_question_window").hidden = false;
        $get("#order_question_picture").src = _img_src;
        $get("#order_question_correctanswer_area").hidden = true;
        $get("#order_question_audio").src = _audio_src;

        $get("#order_question_picture_area")
        .addEventListener("click", ()=>{
            $get("#order_question_audio").play();
        });

        const gonext = $get("#order_question_gonext");
        gonext.innerHTML = "OK";
        gonext.disabled = true;

        const selected_order = [];
        let correct_opt_text = "";

        for(let i=0; i<correct_order.length; i++){
            correct_opt_text += options[correct_order[i]] + " ";
        }

        for(let i=0; i<options.length; i++){
            const option = document.createElement("button");
            option.setAttribute("class", "btn btn-lg order_question_option order_question_option_unselected");
            option.innerHTML = options[i];

            option.addEventListener("click",()=>{
                option.classList.remove("order_question_option_unselected");
                option.classList.add("order_question_option_selected");
                selected_order.push(i);
                gonext.disabled = false;
            });

            $get("#order_question_area").appendChild(option);
        }


        let _resolve;
        this.onend = function(){
            return new Promise(resolve=>{
                _resolve = resolve;
            });
        }

        gonext.addEventListener("click",()=>{
            if(JSON.stringify(selected_order) == JSON.stringify(correct_order)){
                oncorrect();
            }
            else{
                onmistake(selected_order);
            }

            gonext.innerHTML = "Next";
        },{once: true});

        //正解ならtrue,不正解ならfalseを返してresolve
        function oncorrect(){
            $get("#order_question_correctanswer_picture").src = "./images/correct.png";
            $get("#order_question_correctanswer").innerHTML = "";
            $get("#order_question_correctanswer_area").hidden = false;

            let score = Number(localStorage.getItem("score")) || 0;
            score++;
            localStorage.setItem("score", score.toString());

            gonext.addEventListener("click",()=>{
                _resolve(true);
            });
        }

        function onmistake(mistake){
            const misetake_qestion = {
                lessonType: "japanese_syllabary",
                data: {
                    type: "order",
                    img_src: img_src,
                    options: options,
                    correct_order: correct_order
                },
                mistake: mistake
            }

            setMissedStack(misetake_qestion);


            $get("#order_question_correctanswer_picture").src = "./images/mistake.png";
            $get("#order_question_correctanswer").innerHTML = "Đáp án : " + correct_opt_text;
            $get("#order_question_correctanswer_area").hidden = false;

            gonext.addEventListener("click",()=>{
                _resolve(false);
            });
        }
    }
}


export default OrderQuestion;