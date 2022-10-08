import {kuromoji} from "../lib/kuromoji/kuromoji-esm.js";
//htmlと同じ階層に、kuromoji_dict_path.txtを設置する必要あり

function get_tokenizer(){
    return new Promise(async resolve =>{
        kuromoji.builder({ dicPath:  await get_dict_path()})
        .build((err, tokenizer) => {
            resolve(tokenizer);
        });
    });
}

async function get_dict_path(){
    const regexp = new RegExp(".*/(.*?)$");

    return await getDataAsString(location.href.match(regexp)[0] + "/kuromoji_dict_path.txt");
}

async function getDataAsString(path){
    return new Promise(resolve=>{
        const xhr = new XMLHttpRequest();

        xhr.open("get", path);
        xhr.send();
        xhr.onreadystatechange = function() {
            if( xhr.readyState === 4 && xhr.status === 200) {
                resolve(this.responseText);
            }
        }
    });
}

const tokenizer = await get_tokenizer();

export default tokenizer;