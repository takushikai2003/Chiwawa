import Practice from "./Practice.js";
import SelectiveQuestion from "./SelectiveQuestion.js";
// import DescriptionQuestion from "./DescriptionQuestion.js";
import SpeakQuestion from "./SpeakQuestion.js";
import OrderQuestion from "./OrderQuestion.js";
import getDataAsString from "../../../common esm/getDataAsString.js";
import {setMissedStack, getMissedStack, removeMissedStack} from "../../../common esm/missedStack.js";

// const url = new URL(window.location.href);
// const params = url.searchParams;
// const lesson_nuber = params.get("lesson");
// const retry = params.get("retry");
// const missed_index = params.get("missed_index");


async function startVocabularyLesson(lesson_nuber, retry=false, missed_index){
    if(retry){
        const data = getMissedStack(missed_index).data;
        let correct = false;
    
        switch(data.type){
            // case "practice":
            //     const prc = new Practice(document.body, data);
            //     console.log("読み込み時間：",performance.now());
            //     correct = await prc.onend();
            //     break;
    
            case "selective":
                const sel_q = new SelectiveQuestion(document.body, data, true);
                correct = await sel_q.onend();
                break;
    
            // case "description":
            //     const des_q = new DescriptionQuestion(document.body, data);
            //     correct = await des_q.onend();
            //     break;
    
            case "speak":
                const spe_q = new SpeakQuestion(document.body, data, true);
                correct = await spe_q.onend();
                break;
            
            case "order":
                const ord_q = new OrderQuestion(document.body, data, true);
                correct = await ord_q.onend();
                break;
        }
    
    
        if(correct){
            removeMissedStack(missed_index);
        }
    
        // location.href = "../../../boot/index.html?retry=true";
    }
    
    else{
        const data_arr = JSON.parse(await getDataAsString(`../lessons_data/lessons/lesson${lesson_nuber}_vocabulary.json`));
    
        for(let i=0; i<data_arr.length; i++){
            switch(data_arr[i].type){
                case "practice":
                    const prc = new Practice(document.body, data_arr[i]);
                    console.log("読み込み時間：", performance.now());
                    await prc.onend();
                    break;
        
                case "selective":
                    const sel_q = new SelectiveQuestion(document.body, data_arr[i]);
                    await sel_q.onend();
                    break;
        
                // case "description":
                //     const des_q = new DescriptionQuestion(document.body, data_arr[i]);
                //     await des_q.onend();
                //     break;
        
                case "speak":
                    const spe_q = new SpeakQuestion(document.body, data_arr[i]);
                    await spe_q.onend();
                    break;
                
                case "order":
                    const ord_q = new OrderQuestion(document.body, data_arr[i]);
                    await ord_q.onend();
                    break;
            }
        }
    
        
        // location.href = "../../../boot/index.html?page=lesson_select";
    }
}

export default startVocabularyLesson;