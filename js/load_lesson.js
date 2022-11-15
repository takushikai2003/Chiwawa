import Practice from "../pages/Practice.js";
import SelectiveQuestion from "../pages/SelectiveQuestion.js";
// import DescriptionQuestion from "../pages/DescriptionQuestion.js";
import SpeakQuestion from "../pages/SpeakQuestion.js";
import OrderQuestion from "../pages/OrderQuestion.js";
import StrokeOrderLearn from "../pages/StrokeOrderLearn.js";
import Trace from "../pages/Trace.js";
import { VideoText } from "../pages/VideoText.js";
import { TalkLike } from "../pages/TalkLike.js";

import getDataAsString from "../common esm/getDataAsString.js";

//retryは後ほど
// if(retry){
//     const data = getMissedStack(missed_index).data;
//     let correct = false;
//     const question = new TalkLike(document.body, data, true);
//     correct = await question.onend();

//     if(correct){
//         removeMissedStack(missed_index);
//     }

//     return;
// }

async function startLesson(lesson_data_path){
    const data_arr = JSON.parse(await getDataAsString(lesson_data_path));
    
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

            case "talk":
                const t_q = new TalkLike(document.body, data_arr[i]);
                await t_q.onend();
                break;
            
            case "video":
                const vt = new VideoText(document.body, data);
                await vt.onend();
                break;
            
            case "trace":
                const tra_q = new Trace(document.body, data_arr[i]);
                await tra_q.onend();
                break;
    
            case "stroke":
                const str_q = new StrokeOrderLearn(document.body, data_arr[i]);
                await str_q.onend();
                break;

            default:
                console.error(data_arr[i].type, "undefined");
                break;
        }
    }

}


export default startLesson;