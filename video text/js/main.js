function add_text(data){
    const text_area = document.getElementById("text_area");

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
    
}

const data = [
    {
        text: "こんにちは",
        tip: "hello",
    },
    {
        text: "こんばんわ",
        tip: "good evening",
    },
    {
        text: "おはよう",
        tip: "good morning",
    },
];

add_text(data);
