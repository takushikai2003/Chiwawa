import { kuromoji } from "../lib/kuromoji/kuromoji-esm.js";

function get_tokenizer(){
    return new Promise(async resolve =>{
        const dict_path = get_dict_path();
        console.log(dict_path);

        kuromoji.builder({ dicPath: dict_path})
        .build((err, tokenizer) => {
            resolve(tokenizer);
        });
    });
}

function get_dict_path(){
    return new URL("../lib/kuromoji/dict", import.meta.url).pathname;
}

const tokenizer = await get_tokenizer();

export default tokenizer;