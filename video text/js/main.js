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

// const data =  [
//     {
//         text: "こんにちは",
//         tip: "hello"
//     },
//     {
//         text: "こんばんわ",
//         tip: "good evening"
//     },
//     {
//         text: "おはよう",
//         tip: "good morning"
//     }
// ];

// setTimeout(() => {
//     replace_text(data);
// }, 3000);


async function getDataAsString(path){
    return new Promise(resolve=>{
        const xhr = new XMLHttpRequest();

        xhr.open("get", path);
        xhr.send();
        xhr.onreadystatechange = function() {
            if( xhr.readyState === 4 && xhr.status === 200) {
                resolve(this.responseText);
            }
        }
    });
}


let subtitle_data;

const video_element = document.getElementById("video_element");
let view_updated = false;

video_element.addEventListener("play", async ()=>{
    view_updated = false;
    subtitle_data = JSON.parse(await getDataAsString("./data/yamadai tekuteku.json"));
});


video_element.addEventListener("timeupdate", ()=>{
    const currentTime = video_element.currentTime;
    if(subtitle_data.length == 0){
        return;
    }

    if(
        subtitle_data[0].startTime <= currentTime &&
        currentTime <= subtitle_data[0].endTime &&
        !view_updated
    ){
        replace_text(subtitle_data[0].data);
        view_updated = true;
        return;
    }

    if(currentTime >= subtitle_data[0].endTime){
        subtitle_data.shift();
        document.getElementById("text_area").innerHTML = "";
        view_updated = false;
        return;
    }
}); 