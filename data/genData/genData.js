//use node.js

const hiragana_table_data_a_n = [
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
    ["ん",""],
];

const hiragana_table_data_ga_po = [
    ["が","ぎ","ぐ","げ","ご"],
    ["ざ","じ","ず","ぜ","ぞ"],
    ["だ","ぢ","づ","で","ど"],
    ["ば","び","ぶ","べ","ぼ"],
    ["ぱ","ぴ","ぷ","ぺ","ぽ"],
];

const hiragana_table_data_kya_pyo = [
    ["きゃ","きゅ","きょ"],
    ["しゃ","しゅ","しょ"],
    ["ちゃ","ちゅ","ちょ"],
    ["にゃ","にゅ","にょ"],
    ["ひゃ","ひゅ","ひょ"],
    ["みゃ","みゅ","みょ"],
    ["りゃ","りゅ","りょ"],
    ["ぎゃ","ぎゅ","ぎょ"],
    ["じゃ","じゅ","じょ"],
    ["びゃ","びゅ","びょ"],
    ["ぴゃ","ぴゅ","ぴょ"],
];


const katakana_table_data_a_n = [
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
    ["ン",""],
];

const katakana_table_data_ga_po = [
    ["ガ","ギ","グ","ゲ","ゴ"],
    ["ザ","ジ","ズ","ゼ","ゾ"],
    ["ダ","ヂ","ヅ","デ","ド"],
    ["バ","ビ","ブ","ベ","ボ"],
    ["パ","ピ","プ","ペ","ポ"],
];

const katakana_table_data_kya_pyo = [
    ["キャ","キュ","キョ"],
    ["シャ","シュ","ショ"],
    ["チャ","チュ","チョ"],
    ["ニャ","ニュ","ニョ"],
    ["ヒャ","ヒュ","ヒョ"],
    ["ミャ","ミュ","ミョ"],
    ["リャ","リュ","リョ"],
    ["ギャ","ギュ","ギョ"],
    ["ジャ","ジュ","ジョ"],
    ["ビャ","ビュ","ビョ"],
    ["ピャ","ピュ","ピョ"],
];

const romaji_data_a_n = [
    ["a","i","u","e","o"],
    ["ka","ki","ku","ke","ko"],
    ["sa","shi","su","se","so"],
    ["ta","chi","tsu","te","to"],
    ["na","ni","nu","ne","no"],
    ["ha","hi","fu","he","ho"],
    ["ma","mi","mu","me","mo"],
    ["ya","yu","yo"],
    ["ra","ri","ru","re","ro"],
    ["wa","wo"],
    ["n"],
];

const romaji_table_data_ga_po = [
    ["ga","gi","gu","ge","go"],
    ["za","ji","zu","ze","zo"],
    ["da","di","du","de","do"],
    ["ba","bi","bu","be","bo"],
    ["pa","pi","pu","pe","po"],
];

const romaji_table_data_kya_pyo = [
    ["kya","kyu","kyo"],
    ["sha","shu","sho"],
    ["cha","chu","cho"],
    ["nya","nyu","nyo"],
    ["hya","hyu","hyo"],
    ["mya","myu","myo"],
    ["rya","ryu","ryo"],
    ["gya","gyu","gyo"],
    ["ja","ju","jo"],
    ["bya","byu","byo"],
    ["pya","pyu","pyo"],
];


const fs = require("fs");

//name: a_nなど
function genData(kana_data, romaji_data, name, withMatome=false){
    for(let i=0; i<kana_data.length; i++){
        const data = [];
    
        for(let j=0; j<kana_data[i].length; j++){
            const chara = kana_data[i][j];
            const romaji = romaji_data[i][j];
    
            const practice = {
                type: "practice",
                img_src: `/images/${chara}_black.png`,
                audio_src: `/audios/${chara}.mp3`,
                play_txt: romaji,
                supplement_txt: "Nghe và nói theo 2 lần để đi tiếp. <br>(聞きながら２回繰り返してから次へ）"
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

            const selective2 = {
                type: "selective",
                img_src: `/images/${romaji}_romaji.png`,
                options: kana_data[i],
                correct_opt_num: j+1
            }
    
            const speak = {
                type: "speak",
                img_src: `/images/${chara}_black.png`,
                correct_txt: chara
            }
    
            if(name=="hiragana_a_n" || name=="katakana_a_n"){
                data.push(practice, stroke, trace, selective, selective2, speak);
            }
            else{
                data.push(practice, selective, selective2, speak);
            }
            
        }
    
        if(withMatome){
            try{
                const _data = JSON.parse(fs.readFileSync(`./matome/matome_${romaji_data[i][0]}_${romaji_data[i][romaji_data[i].length -1]}.json`));
                _data.forEach(element => {
                    data.push(element);
                });
            }
            catch{

            }
            
        }

        fs.writeFileSync(`../japanese syllabary/${name}_${i}.json`, JSON.stringify(data));
    }
}


genData(hiragana_table_data_a_n, romaji_data_a_n, "hiragana_a_n", true);
genData(hiragana_table_data_ga_po, romaji_table_data_ga_po, "hiragana_ga_po", true);
genData(hiragana_table_data_kya_pyo, romaji_table_data_kya_pyo, "hiragana_kya_pyo");
genData(katakana_table_data_a_n, romaji_data_a_n, "katakana_a_n");
genData(katakana_table_data_ga_po, romaji_table_data_ga_po, "katakana_ga_po");
genData(katakana_table_data_kya_pyo, romaji_table_data_kya_pyo, "katakana_kya_pyo");