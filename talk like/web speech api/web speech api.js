function SpeechRecognize() {
    const SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;//最大代替案

    const colors = ["green", "red", "blue"];

    // 日本語の数字を単語として登録する
    // "#JSGF V1.0 JIS ja; grammar numbers; public <numbers> = 10 | 20 | 30 | 40 | 50 | 60 | 70 | 80 | 90 | 100 ;";
    const grammar =
    "#JSGF V1.0; grammar colors; public <color> = " + colors.join(" | ") + " ;";

    const SpeechGrammarList = window.webkitSpeechGrammarList || window.SpeechGrammarList;
    const speechRecognitionList = new SpeechGrammarList();
    speechRecognitionList.addFromString(grammar, 1);
    recognition.grammars = speechRecognitionList;

    recognition.onresult = (event) => {
        const message = event.results[0][0].transcript;
        const confidence = event.results[0][0].confidence;
        console.log(message, confidence);
    }

    recognition.onnomatch = function(event) {
        console.log("no match");
    }

    recognition.onend = (event) => {
        // 一定時間入力が無いと終了するので継続する
        recognition.start();
    }

    recognition.start();



    // --------
    // recognition.continuous = false;
    // recognition.lang = "en-US";
    // recognition.interimResults = false;
    // recognition.maxAlternatives = 1;

    // recognition.onresult = function(event) {
    //     const color = event.results[0][0].transcript;
    //     const confidence = event.results[0][0].confidence;
    //     console.log(color);
    // }

    // recognition.onspeechend = function() {
    //     recognition.stop();
    // }

    // recognition.onnomatch = function(event) {
    //     diagnostic.textContent = "I didn't recognise that color.";
    // }
}



export default SpeechRecognize;