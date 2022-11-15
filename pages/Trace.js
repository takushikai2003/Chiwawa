import getDataAsString from "../../../common esm/getDataAsString.js";

const insertHTML = await getDataAsString("./pages/Trace.html");

const $get = function (querySelector){
    return document.querySelector(querySelector);
}

const path_to_lesson_data = "./data";

class Trace{
    constructor(insertTarget, {img_src, supplement_txt}){
        insertTarget.innerHTML = insertHTML;
        
        img_src = path_to_lesson_data + img_src;

        $get("#trace_supplement").innerHTML = supplement_txt;

        init_canvas_draw(img_src);

        $get("#trace_delete").addEventListener("click",()=>{
            init_canvas_draw(img_src);
        })
        
        
        let _resolve;
        this.onend = function(){
            return new Promise(resolve=>{
                _resolve = resolve;
            });
        }
        

        //go next
        $get("#trace_gonext").addEventListener("click",()=>{

            let score = Number(localStorage.getItem("score")) || 0;
            score++;
            localStorage.setItem("score", score.toString());

            _resolve();
            
        },{once:true});
    }

    async init(img_src){
        init_canvas_draw(img_src)
    }
}


async function init_canvas_draw(img_src){
    const lineWidth = 10;
    const canvas = document.getElementById("trace_canvas");
    const ctx = canvas.getContext("2d");

    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientWidth;

    clear();
    canvas.removeEventListener("pointerdown", dragStart);
    canvas.removeEventListener("pointerup", dragEnd);
    canvas.removeEventListener("pointerout", dragEnd);
    canvas.removeEventListener("mousemove", onmousemove);
    canvas.removeEventListener("touchmove", ontouchmove);


    const image = new Image();
    image.src = img_src;
    await wait_event(image, "load");
    ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

    function wait_event(target, eventType){
        return new Promise(resolve=>{
            target.addEventListener(eventType,()=>{
                resolve(target);
            });
        });
    }


    let isDrag = false;
    const lastPosition = { x: null, y: null };

    function draw(x, y) {

        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.lineWidth = lineWidth;
        ctx.strokeStyle = "black";

        if (lastPosition.x === null || lastPosition.y === null) {
            ctx.moveTo(x, y);
        } 
        else {
            ctx.moveTo(lastPosition.x, lastPosition.y);
        }

        ctx.lineTo(x, y);
        ctx.stroke();

        lastPosition.x = x;
        lastPosition.y = y;
    }

    function dragStart(e) {
        ctx.beginPath();
        isDrag = true;
    }

    function dragEnd(e) {
        if(!isDrag) {
            return;
        }

        ctx.closePath();

        isDrag = false;
        lastPosition.x = null;
        lastPosition.y = null;

    }

    function clear() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    function onmousemove(event){
        if(!isDrag) {
            return;
        }
        
        event.preventDefault();
        const x = event.layerX;
        const y = event.layerY;

        draw(x, y);
    }

    function ontouchmove(event){
        if(!isDrag) {
            return;
        }
        
        event.preventDefault();
        const x = event.changedTouches[0].layerX;
        const y = event.changedTouches[0].layerY;

        if (event.layerX === undefined){
            draw(event.touches[0].pageX - canvas.offsetLeft, event.touches[0].pageY - canvas.offsetTop);
        } else{
            draw(event.layerX, event.layerY);
        }

        draw(x, y);
    }

    canvas.addEventListener("pointerdown", dragStart);
    canvas.addEventListener("pointerup", dragEnd);
    canvas.addEventListener("pointerout", dragEnd);
    canvas.addEventListener("mousemove", onmousemove);
    canvas.addEventListener("touchmove", ontouchmove);

}


export default Trace;