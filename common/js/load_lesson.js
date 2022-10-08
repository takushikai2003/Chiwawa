// window.addEventListener("load", ()=>{
const url = new URL(window.location.href);
const params = url.searchParams;
const lesson_nuber = params.get("lesson");

const script = document.createElement("script");
script.src = `./js/lesson${lesson_nuber}.js`;
script.type = "module";
document.body.appendChild(script);
// });