const SpeechRecognizer = {
    message: "",
    start: start,
    stop: stop,
};


function start() {
    const SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.lang = "ja-JP";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;//最大代替案


    recognition.onresult = (event) => {
        const message = event.results[0][0].transcript;
        // const confidence = event.results[0][0].confidence;
        SpeechRecognizer.message += message;
    }

    // recognition.onnomatch = function(event) {
    //     console.log("no match");
    // }

    recognition.onend = (event) => {
        // 一定時間入力が無いと終了するので継続する
        recognition.start();
    }

    SpeechRecognizer.recognition = recognition;

    recognition.start();
}


function stop(){
    SpeechRecognizer.recognition.stop();

    return SpeechRecognizer.message;
}


export default SpeechRecognizer;