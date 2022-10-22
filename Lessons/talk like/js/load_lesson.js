import { talk_like } from "./classes.js";
import getDataAsString from "../../../common esm/getDataAsString.js";

const url = new URL(window.location.href);
const params = url.searchParams;
const lesson_nuber = params.get("lesson");

const data_arr = JSON.parse(await getDataAsString(`../lessons_data/lessons/lesson${lesson_nuber}_talk.json`));

for(let i=0; i<data_arr.length; i++){
    const question = new talk_like(data_arr[i]);
    const result = await question.onend();
}

location.href = "../boot/index.html";