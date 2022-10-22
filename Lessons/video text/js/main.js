import { video_text } from "./classes.js";

const data = {
    video_src:"./data/yamadai tekuteku.mp4",
    text_data_src: "./data/yamadai tekuteku.json"
}

const vt1 = new video_text(data);
await vt1.onend();
location.href = "../boot/index.html";