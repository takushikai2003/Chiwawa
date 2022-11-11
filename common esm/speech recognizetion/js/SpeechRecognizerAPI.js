const SpeechRecognition = {
    message: "",
    start: start,
    stop: stop,
    recording: false,
    // get_message: get_message,
};


let recognition;
let message = "";

function start() {
    return new Promise(resolve=>{
        const SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
        recognition = new SpeechRecognition();
        recognition.continuous = true;
        recognition.lang = "ja-JP";
        recognition.interimResults = false;
        recognition.maxAlternatives = 1;//最大代替案

        message = "";
    
        recognition.onresult = (event) => {
            const _message = event.results[0][0].transcript;
            // const confidence = event.results[0][0].confidence;
            message += _message
        }
    
        // recognition.onnomatch = function(event) {
        //     console.log("no match");
        // }
    
        recognition.start();

        recognition.addEventListener("start", resolve());
    
        SpeechRecognition.recording = true;
    });
}


function stop(){
    return new Promise(async resolve=>{
        recognition.stop();
        SpeechRecognition.recording = false;
    
        recognition.onend = (event) => {
            console.log(message);
            SpeechRecognition.message = message;
            resolve(message);
        }
        // console.log(await SpeechRecognition.get_message());
    });
}


// function get_message(){
//     return new Promise(resolve=>{
//         recognition.onend = (event) => {
//             console.log(SpeechRecognition.message);
//             resolve(SpeechRecognition.message);
//         }
//     });
// }

export default SpeechRecognition;