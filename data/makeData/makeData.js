const hiragana_data = [
    ["あ","い","う","え","お"],
    ["か","き","く","け","こ"],
    ["さ","し","す","せ","そ"],
    ["た","ち","つ","て","と"],
    ["な","に","ぬ","ね","の"],
    ["は","ひ","ふ","へ","ほ"],
    ["ま","み","む","め","も"],
    ["や","ゆ","よ"],
    ["ら","り","る","れ","ろ"],
    ["わ","を"],
    ["ん"],
];


const katakana_data = [
    ["ア","イ","ウ","エ","オ"],
    ["カ","キ","ク","ケ","コ"],
    ["サ","シ","ス","セ","ソ"],
    ["タ","チ","ツ","テ","ト"],
    ["ナ","ニ","ヌ","ネ","ノ"],
    ["ハ","ヒ","フ","へ","ホ"],
    ["マ","ミ","ム","メ","モ"],
    ["ヤ","ユ","ヨ"],
    ["ラ","リ","ル","レ","ロ"],
    ["ワ","ヲ"],
    ["ン"],
];

const romaji_data = [
    ["a","i","u","e","o"],
    ["ka","ki","ku","ke","ko"],
    ["sa","si","su","se","so"],
    ["ta","ti","tu","te","to"],
    ["na","ni","nu","ne","no"],
    ["ha","hi","hu","he","ho"],
    ["ma","mi","mu","me","mo"],
    ["ya","yu","yo"],
    ["ra","ri","ru","re","ro"],
    ["wa","wo"],
    ["n"],
];


const zip = new JSZip();
// const folder = zip.folder("data");


for(let i=0; i<hiragana_data.length; i++){
    const data = [];

    for(let j=0; j<hiragana_data[i].length; j++){
        const chara = hiragana_data[i][j];
        const romaji = romaji_data[i][j];

        const practice = {
            type: "practice",
            img_src: `/images/${chara}_black.png`,
            audio_src: `/audios/${chara}.mp3`,
            play_txt: romaji,
            supplement_txt: "Nghe và nói theo 2 lần để đi tiếp.(聞きながら2 回繰り返してから次へ)"
        }

        const stroke = {
            type: "stroke",
            img1_src: `/images/${chara}_animation.gif`,
            img2_src: `/images/${chara}_white.png`,
            supplement_txt: romaji
        }

        const trace = {
            type: "trace",
            img_src: `/images/${chara}_white.png`,
            supplement_txt: romaji
        }

        const selective = {
            type: "selective",
            img_src: `/images/${chara}_black.png`,
            options: romaji_data[i],
            correct_opt_num: j+1
        }

        const speak = {
            type: "speak",
            img_src: `/images/${chara}_black.png`,
            correct_txt: chara
        }

        data.push(practice,stroke,trace,selective,speak);
    }


    // downloadText(`hiragana_${i}.json`, JSON.stringify(data));
    zip.file(`hiragana_${i}.json`, JSON.stringify(data));
}



for(let i=0; i<katakana_data.length; i++){
    const data = [];

    for(let j=0; j<katakana_data[i].length; j++){
        const chara = katakana_data[i][j];
        const romaji = romaji_data[i][j];

        const practice = {
            type: "practice",
            img_src: `/images/${chara}_black.png`,
            audio_src: `/audios/${chara}.mp3`,
            play_txt: romaji,
            supplement_txt: ""
        }

        const stroke = {
            type: "stroke",
            img1_src: `/images/${chara}_animation.gif`,
            img2_src: `/images/${chara}_white.png`,
            supplement_txt: romaji
        }

        const trace = {
            type: "trace",
            img_src: `/images/${chara}_white.png`,
            supplement_txt: romaji
        }

        const selective = {
            type: "selective",
            img_src: `/images/${chara}_black.png`,
            options: romaji_data[i],
            correct_opt_num: j+1
        }

        const speak = {
            type: "speak",
            img_src: `/images/${chara}_black.png`,
            correct_txt: chara
        }

        data.push(practice,stroke,trace,selective,speak);
    }

    
    // downloadText(`katakana_${i}.json`, JSON.stringify(data));
    zip.file(`katakana_${i}.json`, JSON.stringify(data));
}



// function downloadText(fileName, text) {
//     const blob = new Blob([text], { type: 'text/plain' });
//     const aTag = document.createElement('a');
//     aTag.href = URL.createObjectURL(blob);
//     aTag.target = '_blank';
//     aTag.download = fileName;
//     aTag.click();
//     URL.revokeObjectURL(aTag.href);
// }


zip.generateAsync({ type: "blob" }).then(blob => {

    const a = document.createElement("a");
    const dataUrl = URL.createObjectURL(blob);
    a.href = dataUrl;
    a.download = "japanese_syllabary_data.zip";
    a.click();
    a.remove();

    setTimeout(function() {
        window.URL.revokeObjectURL(dataUrl);
    }, 1000);
});