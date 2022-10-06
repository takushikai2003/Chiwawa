const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let isDrag = false;
const lastPosition = { x: null, y: null };
const position = {
    data: [],
}

const positionDataEvent = new CustomEvent("positionDataAvailable", {detail: position});


function draw(x, y) {

    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.lineWidth = 3;
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
    position.data = [];

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

    canvas.dispatchEvent(positionDataEvent);
}

function clear() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}


canvas.addEventListener("mousedown", dragStart);
canvas.addEventListener("mouseup", dragEnd);
canvas.addEventListener("mouseout", dragEnd);
canvas.addEventListener("mousemove", (event) => {
    
    if(!isDrag) {
        return;
    }

    const x = event.layerX;
    const y = event.layerY;

    if(position.data.length!=0){
        const beforeData = position.data[position.data.length-1];
        if(
            beforeData.x == x
            &&
            beforeData.y == y
        ){
            return;//前のデータと同じ値ならpushしない
        }
    }

    position.data.push({x:x, y:y});

    draw(x, y);
});
 