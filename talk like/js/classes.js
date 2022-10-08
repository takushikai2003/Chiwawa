import SpeechRecognizer from "../../speech recognizetion/js/SpeechRecognizer.js";
import get_kana from "../../speech recognizetion/js/get_kana.js";
import FuzzySet from "../../speech recognizetion/lib/FuzzySet/FuzzySet.esm.js";

const left_img = document.getElementById("image_left");
const right_img = document.getElementById("image_right");
const audio = document.getElementById("audio");

let old_tippy = [];

class talk_like{
    constructor({left_img_src, right_img_src, audio_src, left_html, right_html, correct_text}){
        left_img.src = left_img_src;
        right_img.src = right_img_src;
        audio.src = audio_src;

        old_tippy.forEach(element=>{
            element.destroy();
        });

        const left_tippy = tippy("#image_left", {
            content: left_html,
            allowHTML: true,
            theme: "left",
            onHide(instance) {
                return false;
            },
        })[0];
        
        const right_tippy = tippy("#image_right", {
            content: right_html,
            allowHTML: true,
            backgroundColor: "yellow",
            theme: "right",
            onHide(instance) {
                return false;
            },
        })[0];

        //常時表示は、show()とfn onHide:return false
        left_tippy.show();
        right_tippy.show();

        old_tippy = [left_tippy, right_tippy];

        //ポインターイベントを有効にする
        left_tippy.popper.style.cssText += "pointer-events: initial";
        right_tippy.popper.style.cssText += "pointer-events: initial";


        //音声再生
        left_tippy.popper.addEventListener("pointerdown",()=>{
            audio.play();
        });


        //音声認識
        let recording = false;
        right_tippy.popper.addEventListener("pointerdown",()=>{
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
            right_tippy.popper.style.border = "solid 5px red";
            setTimeout(() => {
                rec_stop();
            }, 10000);
        }

        async function rec_stop(){
            if(!SpeechRecognizer.recording){
                return;
            }

            right_tippy.popper.style.border = "";

            SpeechRecognizer.stop();
            const message = await SpeechRecognizer.get_message();

            right_tippy.setContent(`<h1>${message}</h1><img src='./images/mic.png' class='icon'/>`);
            
            const judgment_result = judge(message, get_kana(correct_text).join("")); //bool
            
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
            // $get("#speak_question_correctanswer_picture").src = "./images/correct.png";
            // $get("#speak_question_correctanswer").innerHTML = "ĐÚNG";
            // $get("#speak_question_correctanswer_area").hidden = false;
            // gonext.disabled = false;

            // gonext.addEventListener("click",function(){
            //     _resolve(true);
            // }, {once: true});
        }

        function onmistake(){
            // $get("#speak_question_correctanswer_picture").src = "./images/mistake.png";
            // $get("#speak_question_correctanswer").innerHTML = "SAI rồi bạn ơi!\nĐáp án :\n" + correct_txt;
            // $get("#speak_question_correctanswer_area").hidden = false;
            // gonext.disabled = false;

            // gonext.addEventListener("click",function(){
            //     _resolve(false);
            // }, {once: true});
        }

        // left_tippy.setContent("string");

    }
}


export {talk_like};