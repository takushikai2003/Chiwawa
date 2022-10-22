import { video_text } from "./classes.js";
import getDataAsString from "../../../common esm/getDataAsString.js";

const url = new URL(window.location.href);
const params = url.searchParams;
const lesson_nuber = params.get("lesson");

const data = JSON.parse(await getDataAsString("../lessons_data/lessons/lesson${lesson_nuber}_video.json"));

const vt1 = new video_text(data);
await vt1.onend();
location.href = "../boot/index.html";