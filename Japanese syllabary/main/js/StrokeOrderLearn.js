import getDataAsString from "../../../common esm/getDataAsString.js";

const insertHTML = await getDataAsString("./pages/StrokeOrder.html");

const $get = function (querySelector){
    return document.querySelector(querySelector);
}

const path_to_lesson_data = "../data";

class StrokeOrderLearn{
    constructor(insertTarget, {img1_src, img2_src, supplement_txt}){
        insertTarget.innerHTML = insertHTML;
        
        img1_src = path_to_lesson_data + img1_src;
        img2_src = path_to_lesson_data + img2_src;

        $get("#stroke_order_learn_window").hidden = false;

        $get("#stroke_order_learn_picture1").src = img1_src;
        $get("#stroke_order_learn_picture2").src = img2_src;
        $get("#stroke_order_learn_supplement").innerHTML = supplement_txt;
        
        let _resolve;
        this.onend = function(){
            return new Promise(resolve=>{
                _resolve = resolve;
            });
        }
    
        //go next
        $get("#stroke_order_learn_gonext").addEventListener("click",()=>{
            let score = Number(localStorage.getItem("score")) || 0;
            score++;
            localStorage.setItem("score", score.toString());

            _resolve();
            
        },{once:true});
    }
}


export default StrokeOrderLearn;