import {practice, selective_question, description_question, speak_question} from "./classes.js";


const practice_data = {
    img_src: "./images/図1.jpg",
    pic_txt: "chào buổi trưa",
    audio_src: "./こんにちは.mp3",
    play_txt: "こんにちは",
    supplement_txt: "Nghe và nói theo 3 lần nhé!\n(聞きながら３回繰り返しましょう）"
}

const selective_question_data = {
    img_src: "./images/図1.jpg",
    audio_src: "./こんにちは.mp3",
    opt1_txt: "こにちは",
    opt2_txt: "こんにちは",
    opt3_txt: "こんちは",
    correct_opt_num: 2,
}

const description_question_data = {
    img_src: "./images/図1.jpg",
    audio_src: "./こんにちは.mp3",
    play_txt: "こんにちは",
    supplement_txt: "ベトナム語を書こう",
    correct_txt: "chào buổi trưa",
}

const speak_question_data = {
    img_src: "./images/図1.jpg",
    pic_txt: "こんにちは",
    correct_txt: "こんにちは",
}


const prc = new practice(practice_data);
await prc.onend();
const sel_q = new selective_question(selective_question_data);
await sel_q.onend();
const des_q = new description_question(description_question_data);
await des_q.onend();
const spe_q = new speak_question(speak_question_data);
await spe_q.onend();
location.href = "../boot/index.html";