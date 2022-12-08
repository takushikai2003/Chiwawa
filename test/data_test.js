import getDataAsString from "../common esm/getDataAsString.js";

let questions = [];

questions = questions.concat(
    JSON.parse(await getDataAsString("../data/talk like/lesson1.json"))
);

questions = questions.concat(
    JSON.parse(await getDataAsString("../data/vocabulary/lesson1.json"))
);

questions = questions.concat(
    JSON.parse(await getDataAsString("../data/grammar/lesson1.json"))
);

for(let i=0; i<10; i++){
    questions = questions.concat(
        JSON.parse(await getDataAsString(`../data/japanese syllabary/hiragana_a_n_${i}.json`))
    );
}
for(let i=0; i<4; i++){
    questions = questions.concat(
        JSON.parse(await getDataAsString(`../data/japanese syllabary/hiragana_ga_po_${i}.json`))
    );
}
for(let i=0; i<10; i++){
    questions = questions.concat(
        JSON.parse(await getDataAsString(`../data/japanese syllabary/hiragana_kya_pyo_${i}.json`))
    );
}
for(let i=0; i<10; i++){
    questions = questions.concat(
        JSON.parse(await getDataAsString(`../data/japanese syllabary/katakana_a_n_${i}.json`))
    );
}
for(let i=0; i<4; i++){
    questions = questions.concat(
        JSON.parse(await getDataAsString(`../data/japanese syllabary/katakana_ga_po_${i}.json`))
    );
}
for(let i=0; i<10; i++){
    questions = questions.concat(
        JSON.parse(await getDataAsString(`../data/japanese syllabary/katakana_kya_pyo_${i}.json`))
    );
}

const notFoundFileNames = [];
const checked_times_elm = document.getElementById("checked_times");
const notFoundTimes_elm = document.getElementById("not_found_times");
const notFoundFiles_elm = document.getElementById("not_found_files");
let checkedTimes = 0;
let notFoundTimes = 0;

function increaseCheckedTimes(){
    checkedTimes++;
    checked_times_elm.innerHTML = checkedTimes;
}

function increaseNotFoundTimes(){
    notFoundTimes++;
    notFoundTimes_elm.innerHTML = notFoundTimes;
}

function addNotFoundFile(name){
    if(!notFoundFileNames.includes(name)){
        notFoundFileNames.push(name);
        notFoundFiles_elm.innerHTML += "<br>" + name;
        increaseNotFoundTimes();
    }
}

for(let i=0; i<questions.length; i++){
    const question = questions[i];

    if(question.img_src != undefined && question.img_src != ""){
        if(!await existsFile("../data" + question.img_src)){
            addNotFoundFile(question.img_src);
        }
        
        increaseCheckedTimes();
    }

    if(question.audio_src != undefined && question.audio_src != ""){
        if(!await existsFile("../data" + question.audio_src)){
            addNotFoundFile(question.audio_src);
        }

        increaseCheckedTimes();
    }

    if(question.img1_src != undefined && question.img1_src != ""){
        if(!await existsFile("../data" + question.img1_src)){
            addNotFoundFile(question.img1_src);
        }
        
        increaseCheckedTimes();
    }

    if(question.img2_src != undefined && question.img2_src != ""){
        if(!await existsFile("../data" + question.img2_src)){
            addNotFoundFile(question.img2_src);
        }
        
        increaseCheckedTimes();
    }
}


//ファイルが存在するかreturn: bool
function existsFile(path){
    return new Promise(resolve=>{
        fetch(path)
        .then((res) => {
            res.ok ? resolve(true) : resolve(false);
        })
    });
}