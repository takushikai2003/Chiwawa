import getDataAsString from "../../../common esm/getDataAsString.js";

const insertHTML = await getDataAsString("./pages/Practice.html");

const $get = function (querySelector){
    return document.querySelector(querySelector);
}

const path_to_lesson_data = "../data";

class Practice{
    constructor(insertTarget, {img_src, audio_src, play_txt, supplement_txt}){

        insertTarget.innerHTML = insertHTML;
        
        img_src = path_to_lesson_data + img_src;
        audio_src = path_to_lesson_data + audio_src;

        $get("#practice_picture").src = img_src;
        $get("#practice_play_text").innerHTML = play_txt;
        $get("#practice_supplement").innerHTML = supplement_txt;
    
        const audio = new Audio(audio_src);
        $get("#practice_playtext_area").addEventListener("click", audio_play);
    
        function audio_play(){
            audio.play();
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
    
            let score = Number(localStorage.getItem("score")) || 0;
            score++;
            localStorage.setItem("score", score.toString());

            _resolve();
            
        },{once:true});
    }
}


export default Practice;