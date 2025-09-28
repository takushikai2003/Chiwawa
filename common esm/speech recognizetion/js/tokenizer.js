import {kuromoji} from "../lib/kuromoji/kuromoji-esm.js";
import getDataAsString from "../../getDataAsString.js";
//htmlと同じ階層に、kuromoji_dict_path.txtを設置する必要あり

function get_tokenizer(){
    return new Promise(async resolve =>{
        // const dict_path = await get_dict_path();
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

// async function get_dict_path(){
//     const regexp = new RegExp(".*/(.*?)$");
//     const html_name = location.href.match(regexp)[1];
//     // console.log(location.href.slice( 0, -html_name.length) + "/kuromoji_dict_path.txt");
//     return await getDataAsString(location.href.slice( 0, -html_name.length) + "/kuromoji_dict_path.txt");
// }

const tokenizer = await get_tokenizer();

export default tokenizer;