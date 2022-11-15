import { TalkLike } from "./TalkLike.js";
import getDataAsString from "../common esm/getDataAsString.js";
import { setMissedStack, getMissedStack, removeMissedStack } from "../common esm/missedStack.js";

async function startTalkLike(lesson_nuber, retry=false, missed_index){
    if(retry){
        const data = getMissedStack(missed_index).data;
        let correct = false;
        const question = new TalkLike(document.body, data, true);
        correct = await question.onend();
    
        if(correct){
            removeMissedStack(missed_index);
        }
    
        location.href = "../../../boot/index.html?retry=true";
    }
    
    else{
        const data_arr = JSON.parse(await getDataAsString(`../lessons_data/lessons/lesson${lesson_nuber}_talk.json`));
        
        for(let i=0; i<data_arr.length; i++){
            const question = new TalkLike(document.body, data_arr[i]);
            const result = await question.onend();
        }
    
        location.href = "../../../boot/index.html?page=lesson_select";
    }
    
}


export default startTalkLike;