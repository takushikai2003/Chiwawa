const lineWidth = 10;
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = 500;
canvas.height = 500;

const white_a = new Image();
white_a.src = "./images/あ_white.png";
await wait_event(white_a, "load");
ctx.drawImage(white_a, 0, 0, canvas.width, canvas.height);

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


canvas.addEventListener("pointerdown", dragStart);
canvas.addEventListener("pointerup", dragEnd);
canvas.addEventListener("pointerout", dragEnd);
canvas.addEventListener("mousemove", (event) => {
    if(!isDrag) {
        return;
    }
    
    event.preventDefault();
    const x = event.layerX;
    const y = event.layerY;

    draw(x, y);
});
canvas.addEventListener("touchmove", (event) => {
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
});
