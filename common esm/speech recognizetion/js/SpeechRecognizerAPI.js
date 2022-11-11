const SpeechRecognition = {
    // message: "",
    start: start,
    stop: stop,
    recording: false,
};


let recognition;
let message = "";

function start() {
    return new Promise(resolve=>{
        const _SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
        recognition = new _SpeechRecognition();
        recognition.continuous = true;
        recognition.lang = "ja-JP";
        recognition.interimResults = false;
        recognition.maxAlternatives = 1;//最大代替案

        message = "";
    
        recognition.onresult = (event) => {
            const _message = event.results[0][0].transcript;
            // const confidence = event.results[0][0].confidence;
            message += _message;
            console.log(message);
        }
    
        // recognition.onnomatch = function(event) {
        //     console.log("no match");
        // }
    
        recognition.start();

        recognition.addEventListener("start", resolve());
    
        SpeechRecognition.recording = true;

        recognition.onend = (event) => {
            SpeechRecognition.recording = false;
        }
    });
}


function stop(){
    return new Promise(async resolve=>{
        
        if(SpeechRecognition.recording){
            recognition.stop();
            SpeechRecognition.recording = false;
        
            recognition.onend = (event) => {
                // SpeechRecognition.message = message;
                resolve(message);
            }
        }
        else{
            resolve(message);
        }
    });
}


export default SpeechRecognition;