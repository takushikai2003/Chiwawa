// import Practice from "../pages/Practice.js";
import SelectiveQuestion from "../pages/SelectiveQuestion.js";
// import DescriptionQuestion from "../pages/DescriptionQuestion.js";
import SpeakQuestion from "../pages/SpeakQuestion.js";
import OrderQuestion from "../pages/OrderQuestion.js";
// import StrokeOrderLearn from "../pages/StrokeOrderLearn.js";
// import Trace from "../pages/Trace.js";
// import { VideoText } from "../pages/VideoText.js";
import { TalkLike } from "../pages/TalkLike.js";

import { setMissedStack, getMissedStack, removeMissedStack, getMissedStacks } from "./missedStack.js";
import random from "./Random.js";

async function Retry(){
    const stacks = getMissedStacks();
    if(stacks.length == 0){
        // location.href = "../../../boot/index.html?page=lesson_select";
        return;
    }

    const url = new URL(window.location.href);
    const params = url.searchParams;
    const page = params.get("page");
    if(page != "retry"){
        history.pushState(null, null, "./index.html?page=retry");   
    }

    const index = random(0, stacks.length -1);

    const data = stacks[index].data;
    let result = false;

    switch(data.type){
        // case "practice":
        //     const prc = new Practice(document.body, data);
        //     result = await prc.onend();
        //     break;

        case "selective":
            const sel_q = new SelectiveQuestion(document.body, data, true);
            result = await sel_q.onend();
            break;

        // case "description":
        //     const des_q = new DescriptionQuestion(document.body, data);
        //     result = await des_q.onend();
        //     break;

        case "speak":
            const spe_q = new SpeakQuestion(document.body, data, true);
            result = await spe_q.onend();
            break;
        
        case "order":
            const ord_q = new OrderQuestion(document.body, data, true);
            result = await ord_q.onend();
            break;

        case "talk":
            const t_q = new TalkLike(document.body, data, true);
            result = await t_q.onend();
            break;
        
        // case "video":
        //     const vt = new VideoText(document.body, data);
        //     result = await vt.onend();
        //     break;
        
        // case "trace":
        //     const tra_q = new Trace(document.body, data);
        //     result = await tra_q.onend();
        //     break;

        // case "stroke":
        //     const str_q = new StrokeOrderLearn(document.body, data);
        //     result = await str_q.onend();
        //     break;

        default:
            console.error(data.type, "undefined");
            break;
    }


    if(result){
        removeMissedStack(index);
    }
}


export default Retry;