import SpeechRecognition from "./js/SpeechRecognizerAPI.js";
import FuzzySet from "./lib/FuzzySet/FuzzySet.esm.js";
import get_kana from "./js/get_kana.js";

//arg seek_message: string
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
function stop(seek_message){
    return new Promise(async resolve=>{
        const message = await SpeechRecognition.stop();
    
        const result = judge(message, seek_message);//bool
        resolve({correct: result, message: message});
    });
}



function judge(message, seek_message){
    const threshold = 0.7;

    const message_kana = get_kana(message);

    const fs = FuzzySet(message_kana);
    const fs_result = fs.get(seek_message);

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