import Practice from "./Practice.js";
import SelectiveQuestion from "./SelectiveQuestion.js";
import DescriptionQuestion from "./DescriptionQuestion.js";
import SpeakQuestion from "./SpeakQuestion.js";
import getDataAsString from "../../../common esm/getDataAsString.js";

const url = new URL(window.location.href);
const params = url.searchParams;
const lesson_nuber = params.get("lesson");

const data_arr = JSON.parse(await getDataAsString(`../lessons_data/lessons/lesson${lesson_nuber}_vocabulary.json`));

for(let i=0; i<data_arr.length; i++){
    switch(data_arr[i].type){
        case "practice":
            const prc = new Practice(data_arr[i]);
            console.log("読み込み時間：",performance.now());
            await prc.onend();
            break;

        case "selective":
            const sel_q = new SelectiveQuestion(data_arr[i]);
            await sel_q.onend();
            break;

        case "description":
            const des_q = new DescriptionQuestion(data_arr[i]);
            await des_q.onend();
            break;

        case "speak":
            const spe_q = new SpeakQuestion(data_arr[i]);
            await spe_q.onend();
            break;
    }
}



location.href = "../../../boot/index.html?page=lesson_select";