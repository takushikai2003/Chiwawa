import {drawImageToBack, drawLineToFront} from "./canvas common.js";

const back_canvas = document.getElementById("back_canvas");
const front_canvas = document.getElementById("front_canvas");
const back_ctx = back_canvas.getContext("2d");
const front_ctx = front_canvas.getContext("2d");

let right_ImagePoints = [];//[{x:,y:,w:,h:},...]
let left_ImagePoints = [];
let connects = [];

//left,right: images Array[Image1, Image2...]
//correctConnects: Array [{right:0,left:1},...]
class ConnectDots{
    constructor(left, right, correctConnect){
        
    }
}


function drawImages(left_images, right_images){
    right_ImagePoints = [];
    left_ImagePoints = [];

    const image_w = (back_canvas.width/2) - 50;

    for(let i=0; i<left_images.length; i++){
        const h = 80;//left_images[i].naturalHeight*
        const x = 0;
        const y = h*i;
        const w = image_w;
        drawImageToBack(left_images[i], x, y, w, h);

        left_ImagePoints.push({x, y, w, h});
    }

    for(let i=0; i<right_images.length; i++){
        const h = 80;//right_images[i].naturalHeight*
        const x = back_canvas.width - image_w;
        const y = h*i;
        const w = image_w;
        drawImageToBack(right_images[i], x, y, w, h);

        right_ImagePoints.push({x, y, w, h});
    }
}



function wait_event(target, event){
    return new Promise(resolve=>{
        target.addEventListener(event,()=>{
            resolve(target);
        });
    });
}