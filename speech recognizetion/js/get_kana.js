import tokenizer from "./tokenizer.js";

function get_kana(message){
    const morpheme = tokenizer.tokenize(message);//形態素

    let message_kana = [];
    morpheme.forEach(element => {
        message_kana.push(element.reading);
    });

    return message_kana;//Array
}


export default get_kana;