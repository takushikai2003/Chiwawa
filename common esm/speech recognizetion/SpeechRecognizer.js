import SpeechRecognition from "./js/SpeechRecognizerAPI.js";
import FuzzySet from "./lib/FuzzySet/FuzzySet.esm.js";
import get_kana from "./js/get_kana.js";

//arg search_message: string
const SpeechRecognizer = {
    start: start,
    stop: stop,
    recognized_message: "",
}

function start(){
    return new Promise(async resolve=>{
        await SpeechRecognition.start();
        resolve();
    });
}

//return: bool
function stop(search_message){
    return new Promise(async resolve=>{
        const message = await SpeechRecognition.stop();
        
        const result = judge(message, search_message);//bool
        resolve({correct: result, message: message});
    });
}



function judge(message, search_message){

    const threshold = 0.8;

    const search_message_kana = get_kana(search_message).join("");
    const message_kana = get_kana(message).join("");

    console.log("speech recognizetion result:",
    {
        recognized: message,
        search: search_message,
        recgnized_kana: message_kana,
        search_kana: search_message_kana
    });

    const fs = FuzzySet([message_kana]);
    const fs_result = fs.get(search_message_kana);

    if(fs_result == null){
        return false;
    }

    const fs_confidence = fs_result[0];

    if(fs_confidence < threshold){
        return false;
    }
    else{
        return true;
    }

}


export default SpeechRecognizer;