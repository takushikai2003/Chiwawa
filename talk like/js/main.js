import { talk_like } from "./classes.js";

const data = {
    left_img_src: "./images/chiwawa1.png",
    right_img_src: "./images/chiwawa2.png",
    audio_src: "./data/こんにちは.mp3",
    left_html: "<h1>こんにちは</h1><img src='./images/play_icon.svg' class='icon'/>",
    right_html: "<h1>-----</h1><img src='./images/mic.png' class='icon'/>",
    correct_text: "こんにちは",
}


const tl1 = new talk_like(data);
const result = await tl1.onend();
console.log(result);
const tl2 = new talk_like(data);
console.log(await tl2.onend());