import {practice, selective_question, description_question, speak_question} from "./classes.js";
import getDataAsString from "../../../common esm/getDataAsString.js";

const url = new URL(window.location.href);
const params = url.searchParams;
const lesson_nuber = params.get("lesson");


const data_arr = Array.from(JSON.parse(await getDataAsString(`../lessons_data/lessons/lesson${lesson_nuber}_vocabulary.json`)));


for(let i=0; i<data_arr.length; i++){
    switch(data_arr[i].type){
        case "practice":
            // const prc = new practice(data_arr[i]);
            // await prc.onend();
            break;

        case "selective":
            const sel_q = new selective_question(data_arr[i]);
            await sel_q.onend();
            break;

        case "description":
            const des_q = new description_question(data_arr[i]);
            await des_q.onend();
            break;

        case "speak":
            const spe_q = new speak_question(data_arr[i]);
            await spe_q.onend();
            break;
    }
}



location.href = "../boot/index.html";