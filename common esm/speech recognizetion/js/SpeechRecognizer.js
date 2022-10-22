const SpeechRecognizer = {
    message: "",
    start: start,
    stop: stop,
    init_message: init_message,
    recording: false,
};


function start() {
    const SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.lang = "ja-JP";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;//最大代替案

    SpeechRecognizer.init_message();

    recognition.onresult = (event) => {
        const message = event.results[0][0].transcript;
        // const confidence = event.results[0][0].confidence;
        SpeechRecognizer.message += message;
    }

    // recognition.onnomatch = function(event) {
    //     console.log("no match");
    // }

    function get_message(){
        return new Promise(resolve=>{
            recognition.onend = (event) => {
                resolve(SpeechRecognizer.message);
            }
        });
    }

    SpeechRecognizer.get_message = get_message;
    SpeechRecognizer.recognition = recognition;

    recognition.start();

    SpeechRecognizer.recording = true;
}


function stop(){
    SpeechRecognizer.recognition.stop();
    SpeechRecognizer.recording = false;

    return SpeechRecognizer.message;
}


function init_message(){
    SpeechRecognizer.message = "";
}


export default SpeechRecognizer;