import { setMissedStack, getMissedStack, removeMissedStack } from "./missedStack.js";

function Retry(){
    const stack = getMissedStack(0);

    switch(stack.lessonType){
        case "vocabulary":
            location.href = `../Lessons/vocabulary lesson/index.html?retry=true&missed_index=0`;
            break;
        case "talk_like":
            location.href = `../Lessons/talk like/index.html?retry=true&missed_index=0`;
            break;
        case "japanese_syllabary":
            location.href = `../Japanese syllabary/main/index.html?retry=true&missed_index=0`;
            break;
        
        default :
            console.error("lessonType ",stack.lessonType," undefined");
    
    }
}


export default Retry;