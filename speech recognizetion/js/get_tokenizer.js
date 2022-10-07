import {kuromoji} from "../lib/kuromoji/kuromoji-esm.js";

function get_tokenizer(){
    return new Promise(resolve=>{
        kuromoji.builder({ dicPath: "./lib/kuromoji/dict" })
        .build((err, tokenizer) => {
            resolve(tokenizer);
        });
    });
}

const tokenizer = await get_tokenizer();

export default tokenizer;