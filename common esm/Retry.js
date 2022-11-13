import { setMissedStack, getMissedStack, removeMissedStack, getMissedStacks } from "./missedStack.js";
import random from "./Random.js";

function Retry(){
    const stacks = getMissedStacks();
    if(stacks.length == 0){
        location.href = "../../../boot/index.html?page=lesson_select";
        return;
    }
    const index = random(0, stacks.length -1);

    switch(stacks[index].lessonType){
        case "vocabulary":
            location.href = `../Lessons/vocabulary lesson/index.html?retry=true&missed_index=${index}`;
            break;
        case "talk_like":
            location.href = `../Lessons/talk like/index.html?retry=true&missed_index=${index}`;
            break;
        case "japanese_syllabary":
            location.href = `../Japanese syllabary/main/index.html?retry=true&missed_index=${index}`;
            break;
        
        default :
            console.error("lessonType ",stack.lessonType," undefined");
    
    }
}


export default Retry;