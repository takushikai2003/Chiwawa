import SpeechRecognizer from "../common esm/speech recognizetion/SpeechRecognizer.js";
import {setMissedStack, getMissedStack, removeMissedStack} from "../common esm/missedStack.js";
import getDataAsString from "../common esm/getDataAsString.js";
import { correct_audio, mistake_audio } from "../common esm/Audios.js";

const insertHTML = await getDataAsString("./pages/TalkLike.html");

let old_tippy = [];


const path_to_lesson_data = "./data";
class TalkLike{
    constructor(insertTarget, {left_img_src, right_img_src, audio_src, left_html, right_html, correct_text}, retry=false){
        insertTarget.innerHTML = insertHTML;

        const _left_img_src = path_to_lesson_data + left_img_src;
        const _right_img_src = path_to_lesson_data + right_img_src;
        const _audio_src = path_to_lesson_data + audio_src;

        const left_img = document.getElementById("image_left");
        const right_img = document.getElementById("image_right");
        const gonext = document.getElementById("talk_like_gonext");
        const correctanswer_picture = document.getElementById("talk_like_correctanswer_picture");
        const correctanswer = document.getElementById("talk_like_correctanswer");
        const correctanswer_area = document.getElementById("talk_like_correctanswer_area");

        left_img.src = _left_img_src;
        right_img.src = _right_img_src;
        const audio = new Audio(_audio_src);
        gonext.hidden = true;
        correctanswer_area.hidden = true;

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

        async function rec_start(){
            await SpeechRecognizer.start();
            right_tippy.popper.style.border = "solid 5px red";
            setTimeout(() => {
                if(recording){
                    rec_stop();
                }
            }, 10000);
        }

        async function rec_stop(){

            const judgment_result = await SpeechRecognizer.stop(correct_text);
            
            right_tippy.popper.style.border = "";
            right_tippy.setContent(`<h1>${judgment_result.message}</h1><img src='./images/mic.png' class='icon'/>`);

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

            correctanswer_picture.src = "./images/correct.png";
            correctanswer.innerHTML = "";
            correctanswer_area.hidden = false;
            gonext.hidden = false;

            let score = Number(localStorage.getItem("score")) || 0;
            score++;
            localStorage.setItem("score", score.toString());

            gonext.addEventListener("click",function(){
                _resolve(true);
            }, {once: true});
        }

        function onmistake(mistake){
            mistake_audio.play();
            
            const mistake_qestion = {
                data: {
                    type: "talk",
                    left_img_src: left_img_src,
                    right_img_src: right_img_src,
                    audio_src: audio_src,
                    left_html: left_html,
                    right_html: right_html,
                    correct_text: correct_text
                },
                mistake: mistake
            }

            if(!retry){
                setMissedStack(mistake_qestion);
            }


            correctanswer_picture.src = "./images/mistake.png";
            correctanswer.innerHTML = "Đáp án : " + correct_text;
            correctanswer_area.hidden = false;
            gonext.hidden = false;

            gonext.addEventListener("click",function(){
                _resolve(false);
            }, {once: true});
        }

        // left_tippy.setContent("string");

    }
}


export {TalkLike};