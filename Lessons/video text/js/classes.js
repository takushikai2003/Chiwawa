import getDataAsString from "../../../common esm/getDataAsString.js";

const video_element = document.getElementById("video_element");
let subtitle_data = [];
let text_replaced = false;

const path_to_lesson_data = "../lessons_data";
class video_text{
    constructor({video_src, subtitles}){

        video_src = path_to_lesson_data + video_src;
        
        video_element.src = video_src;
        // video_element.pause();
        
        subtitle_data = subtitles;
       
        let _resolve;
        this.onend = function(){
            return new Promise(resolve=>{
                _resolve = resolve;
            });
        }

        video_element.addEventListener("ended",()=>{
            _resolve();
        },{once: true});
    }
}

let subtitle_data_copy = [];
video_element.addEventListener("play", ()=>{
    text_replaced = false;
    subtitle_data_copy = Array.from(subtitle_data);
});


video_element.addEventListener("timeupdate", ()=>{
    const currentTime = video_element.currentTime;
    if(subtitle_data_copy.length == 0){
        return;
    }

    if(
        subtitle_data_copy[0].startTime <= currentTime &&
        currentTime <= subtitle_data_copy[0].endTime &&
        !text_replaced
    ){
        replace_text(subtitle_data_copy[0].data);
        text_replaced = true;
        return;
    }

    if(currentTime >= subtitle_data_copy[0].endTime){
        subtitle_data_copy.shift();
        document.getElementById("text_area").innerHTML = "";
        text_replaced = false;
        return;
    }
});


let old_tippy = tippy(".meaning_word", {
    onTrigger: (instance, event) => {
        instance.setContent(instance.reference.dataset.tip);
    },
    allowHTML: true,
    placement: "bottom",
});

function replace_text(data){
    const text_area = document.getElementById("text_area");
    text_area.innerHTML = "";

    for(let i=0; i<old_tippy.length; i++){
        old_tippy[i].destroy();
    }

    for(let i=0; i<data.length; i++){
        const text = data[i].text;
        const tip = data[i].tip;

        const span = document.createElement("span");
        span.innerHTML = text;

        if(tip.length != 0 || tip == undefined){
            span.setAttribute("class", "meaning_word");
            span.dataset.tip = tip;
        }

        text_area.appendChild(span);
    }


    old_tippy = tippy(".meaning_word", {
        onTrigger: (instance, event) => {
            instance.setContent(instance.reference.dataset.tip);
        },
        allowHTML: true,
        placement: "bottom",
    });
}


export {video_text};