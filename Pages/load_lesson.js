import Practice from "./Practice.js";

const p1 = new Practice({
    insertTarget: document.body,
    img_src:"/images/chiwawa1.png",
    pic_txt:"こんにちは",
    audio_src:"/audios/こんにちは.mp3",
    play_txt: "こんにちは",
    supplement_txt: "こんにちは"
});

await p1.onend();

const p2 = new Practice({
    insertTarget: document.body,
    img_src:"/images/chiwawa1.png",
    pic_txt:"おはよう",
    audio_src:"/audios/こんにちは.mp3",
    play_txt: "おはよう",
    supplement_txt: "おはよう"
});

await p2.onend();
