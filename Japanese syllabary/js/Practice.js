import hide_all_window from "./hide_all_window.js";

const $get = function (querySelector){
    return document.querySelector(querySelector);
}

const path_to_lesson_data = "";//"../lessons_data";

class Practice{
    constructor({img_src, audio_src, play_txt, supplement_txt}){
        img_src = path_to_lesson_data + img_src;
        audio_src = path_to_lesson_data + audio_src;

        hide_all_window();
        $get("#practice_window").hidden = false;

        $get("#practice_picture").src = img_src;
        $get("#practice_audio").src = audio_src;
        $get("#practice_play_text").innerHTML = play_txt;
        $get("#practice_supplement").innerHTML = supplement_txt;
    
    
        $get("#practice_playtext_area").addEventListener("click", audio_play);
    
        function audio_play(){
            $get("#practice_audio").play();
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