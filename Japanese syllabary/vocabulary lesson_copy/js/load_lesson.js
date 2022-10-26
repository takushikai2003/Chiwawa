import Practice from "./Practice.js";
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

const sel_dat = {
    img_src: "./test_data/あ_black.png",
    opt1_txt: "a",
    opt2_txt: "i",
    opt3_txt: "u",
    correct_opt_num: 1
}

const spk_dat = {
    img_src: "./test_data/stomatch.jpg",
    audio_src: "./test_data/あ.mp3",
    correct_txt: "い",
    supplement_txt: "dạ dày"
}

const prc = new Practice(prc_dat);
await prc.onend();
const sel_q = new SelectiveQuestion(sel_dat);
await sel_q.onend();
const spe_q = new SpeakQuestion(spk_dat);
await spe_q.onend();

console.log("test finished");
// location.href = "../boot/index.html";