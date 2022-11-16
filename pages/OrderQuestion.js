import {setMissedStack, getMissedStack, removeMissedStack} from "../common esm/missedStack.js";
import getDataAsString from "../common esm/getDataAsString.js";

const insertHTML = await getDataAsString("./pages/Order.html");

const $get = function (querySelector){
    return document.querySelector(querySelector);
}

const path_to_lesson_data = "./data";


class OrderQuestion{
    constructor(insertTarget, {img_src, audio_src, options, correct_order}, retry=false){
        insertTarget.innerHTML = insertHTML;
        
        const _img_src = path_to_lesson_data + img_src;
        const _audio_src = path_to_lesson_data + audio_src;

        $get("#order_question_picture").src = _img_src;
        $get("#order_question_correctanswer_area").hidden = true;
        
        const audio = new Audio(_audio_src);
        $get("#order_question_picture_area")
        .addEventListener("click", ()=>{
            audio.play();
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

        
        const correct_audio = new Audio("./audios/correct.mp3");
        const mistake_audio = new Audio("./audios/mistake.mp3");

        //正解ならtrue,不正解ならfalseを返してresolve
        function oncorrect(){
            correct_audio.play();
            
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
            mistake_audio.play();
            
            const mistake_qestion = {
                data: {
                    type: "order",
                    img_src: img_src,
                    options: options,
                    correct_order: correct_order
                },
                mistake: mistake
            }

            if(!retry){
                setMissedStack(mistake_qestion);
            }


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