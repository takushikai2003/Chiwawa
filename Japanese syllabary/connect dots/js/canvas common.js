const back_canvas = document.getElementById("back_canvas");
const front_canvas = document.getElementById("front_canvas");
const back_ctx = back_canvas.getContext("2d");
const front_ctx = front_canvas.getContext("2d");


function drawImageToBack(image, x, y, w, h){
    back_ctx.drawImage(image, x, y, w, h);
}


function drawLineToFront(x1, y1, x2, y2, color="red", lineWidth=5){
    front_ctx.strokeStyle = color;
    front_ctx.lineWidth = lineWidth;

    front_ctx.beginPath();
    front_ctx.moveTo(x1, y1);
    front_ctx.lineTo(x2, y2);
    front_ctx.stroke();
}


export {drawImageToBack, drawLineToFront};