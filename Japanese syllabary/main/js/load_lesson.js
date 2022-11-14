import Practice from "./Practice.js";
import StrokeOrderLearn from "./StrokeOrderLearn.js";
import Trace from "./Trace.js";
import SelectiveQuestion from "./SelectiveQuestion.js";
import SpeakQuestion from "./SpeakQuestion.js";
import { setMissedStack, getMissedStack, removeMissedStack } from "../../../common esm/missedStack.js";
import getDataAsString from "../../../common esm/getDataAsString.js";

// const url = new URL(window.location.href);
// const params = url.searchParams;
// const lesson_type = params.get("type");
// const kana_index = params.get("index");
// const retry = params.get("retry");
// const missed_index = params.get("missed_index");

async function startJapaneseSyllabary(lesson_type, kana_index, retry=false, missed_index){
    if(retry){
        const data = getMissedStack(missed_index).data;
        let correct = false;
    
        switch(data.type){
            // case "practice":
            //     const prc = new Practice(document.body, data);
            //     await prc.onend();
            //     break;
            
            // case "trace":
            //     const tra_q = new Trace(document.body, data);
            //     correct = await tra_q.onend();
            //     break;
    
            // case "stroke":
            //         const str_q = new StrokeOrderLearn(document.body, data);
            //         correct = await str_q.onend();
            //         break;
    
            case "selective":
                const sel_q = new SelectiveQuestion(document.body, data, true);
                correct = await sel_q.onend();
                break;
    
            case "speak":
                const spe_q = new SpeakQuestion(document.body, data, true);
                correct = await spe_q.onend();
                break;
        }
    
        if(correct){
            removeMissedStack(missed_index);
        }
    
        // location.href = "../../../boot/index.html?retry=true";
    }
    
    else{
        const data_arr = JSON.parse(await getDataAsString(`../data/lessons/${lesson_type}_${kana_index}.json`));
    
        for(let i=0; i<data_arr.length; i++){
            switch(data_arr[i].type){
                case "practice":
                    const prc = new Practice(document.body, data_arr[i]);
                    await prc.onend();
                    break;
                
                case "trace":
                    const tra_q = new Trace(document.body, data_arr[i]);
                    await tra_q.onend();
                    break;
        
                case "stroke":
                        const str_q = new StrokeOrderLearn(document.body, data_arr[i]);
                        await str_q.onend();
                        break;
        
                case "selective":
                    const sel_q = new SelectiveQuestion(document.body, data_arr[i]);
                    await sel_q.onend();
                    break;
        
                case "speak":
                    const spe_q = new SpeakQuestion(document.body, data_arr[i]);
                    await spe_q.onend();
                    break;
            }
        }
    
        // location.href = "../../../boot/index.html?page=lesson_select";
    }
}


export default startJapaneseSyllabary;