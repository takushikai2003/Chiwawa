import Practice from "./Practice.js";
import StrokeOrderLearn from "./StrokeOrderLearn.js";
import Trace from "./Trace.js";
import SelectiveQuestion from "./SelectiveQuestion.js";
import SpeakQuestion from "./SpeakQuestion.js";

// import getDataAsString from "../../../common esm/getDataAsString.js";

const url = new URL(window.location.href);
const params = url.searchParams;
const lesson_nuber = params.get("lesson");


// const data_arr = JSON.parse(await getDataAsString(`../lessons_data/lessons/lesson${lesson_nuber}_vocabulary.json`));

// for(let i=0; i<data_arr.length; i++){
//     switch(data_arr[i].type){
//         case "practice":
//             const prc = new practice(data_arr[i]);
//             await prc.onend();
//             break;

//         case "selective":
//             const sel_q = new selective_question(data_arr[i]);
//             await sel_q.onend();
//             break;

//         case "speak":
//             const spe_q = new speak_question(data_arr[i]);
//             await spe_q.onend();
//             break;
//     }
// }



//test code--------------------
const prc_dat = {
    img_src: "./test_data/あ_black.png",
    audio_src: "./test_data/あ.mp3",
    play_txt: "a",
    supplement_txt: ""
}

const str_dat = {
    img1_src: "./test_data/あ_animation.gif",
    img2_src: "./test_data/あ_white.png",
    supplement_txt: "a"
}

const trace_dat = {
    img_src: "./test_data/あ_white.png",
    supplement_txt: "a"
}

const sel_dat = {
    img_src: "./test_data/あ_black.png",
    options: ["a","i","u","e","o"],
    correct_opt_num: 1
}

const spk_dat = {
    img_src: "./test_data/あ_black.png",
    correct_txt: "あ"
}

const prc = new Practice(prc_dat);
await prc.onend();
const str_l = new StrokeOrderLearn(str_dat);
await str_l.onend();
const trace_l = new Trace(trace_dat);
await trace_l.onend();
const sel_q = new SelectiveQuestion(sel_dat);
await sel_q.onend();
const spe_q = new SpeakQuestion(spk_dat);
await spe_q.onend();

console.log("test finished");
// location.href = "../boot/index.html";