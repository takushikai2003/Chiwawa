//Global

let score = 0;
let lesson = 1;
const missed_stack = [];

function hideAllWindow(){
    document.querySelector("#practice_window").hidden = true;
    document.querySelector("#selective_question_window").hidden = true;
    document.querySelector("#description_question_window").hidden = true;
    document.querySelector("#speak_question_window").hidden = true;   
}

const $get = function (querySelector){
    return document.querySelector(querySelector);
}