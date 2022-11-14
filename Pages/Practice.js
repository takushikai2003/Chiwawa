import getDataAsString from "../common esm/getDataAsString.js";

const insertHTML = await getDataAsString("./Practice.html");

const path_to_lesson_data = ".";

const $get = function (querySelector){
    return document.querySelector(querySelector);
}

class Practice{
    constructor({insertTarget, img_src, pic_txt, audio_src, play_txt, supplement_txt}){
        const _img_src = path_to_lesson_data + img_src;
        const _audio_src = path_to_lesson_data + audio_src;

        insertTarget.innerHTML = insertHTML;
        $get("#practice_picture").src = _img_src;
        $get("#practice_picture_text").innerHTML = pic_txt;
        $get("#practice_play_text").innerHTML = play_txt;
        $get("#practice_supplement").innerHTML = supplement_txt;


        $get("#practice_gonext").disabled = true;
    
        const audio = new Audio(_audio_src);
        $get("#practice_playtext_area").addEventListener("click", audio_play);
    
        function audio_play(){
            // console.log("audio played");
            audio.play();
        }
    
        audio.addEventListener("ended", onplayended);
    
        let played_times = 0;
        function onplayended(){
            played_times++;
    
            if(played_times >= 2){
                $get("#practice_gonext").disabled = false;
            }
        }
    
        let _resolve;
        this.onend = function(){
            return new Promise(resolve=>{
                _resolve = resolve;
            });
        }
    

        //go next
        $get("#practice_gonext").addEventListener("click",()=>{
            $get("#practice_playtext_area").removeEventListener("click", audio_play);
            audio.remove();
    
            let score = Number(localStorage.getItem("score")) || 0;
            score++;
            localStorage.setItem("score", score.toString());

            _resolve();
            
        },{once:true});
    }
}


export default Practice;