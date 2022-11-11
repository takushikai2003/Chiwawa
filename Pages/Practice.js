const path_to_lesson_data = ".";

const $get = function (querySelector){
    return document.querySelector(querySelector);
}

class Practice{
    constructor({insertTarget, img_src, pic_txt, audio_src, play_txt, supplement_txt}){
        const _img_src = path_to_lesson_data + img_src;
        const _audio_src = path_to_lesson_data + audio_src;

        // $get("#practice_window").hidden = false;
        // const practice_window = document.createElement("div");
        // // practice_window.setAttribute("id", "practice_window");
        // practice_window.setAttribute("class", "container");
        // practice_window.setAttribute("hidden", "true");
        // const picture_area = document.createElement("div");
        // picture_area.setAttribute("class", "row");

        const insertHTML = 
        `
        <div id="practice_window" class="container">
        <div id="practice_picture_area" class="row">
            <img id="practice_picture" class="d-block mx-auto" src=${_img_src}>
            <div id="practice_picture_text" class="display-1 text-center">${pic_txt}</div>
        </div>

        <div id="practice_playtext_area" class="row">
            <img src="./images/play_icon.svg" id="practice_play">
            <span id="practice_play_text" class="display-1 text-center">${play_txt}</span>
        </div>

        <div id="practice_supplement_area" class="row">
            <div id="practice_supplement" class="h1 text-center">
                ${supplement_txt}
            </div>
        </div>

        <div id="practice_gonext_area" class="row">
            <button id="practice_gonext" class="btn btn-lg ">Next</button>
        </div>
        </div>`;

        insertTarget.innerHTML = insertHTML;

        $get("#practice_gonext").disabled = true;
    
        const audio = new Audio(_audio_src);
        $get("#practice_playtext_area").addEventListener("click", audio_play);
    
        function audio_play(){
            console.log("audio played");
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