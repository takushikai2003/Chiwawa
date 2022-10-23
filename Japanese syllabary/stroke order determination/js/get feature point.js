import Vector2 from "./Vector2.js";

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");


canvas.addEventListener("positionDataAvailable",(e)=>{
    const position_data = JSON.parse(JSON.stringify(e.detail.data));
    console.log("length: ",position_data.length);
    get_feature_point(position_data);

    //始点終点を塗る
    draw_point(position_data[0].x, position_data[0].y, "blue");
    draw_point(position_data[position_data.length-1].x, position_data[position_data.length-1].y, "blue");
});

const angle_threshold = 30;//角度のしきい値

function get_feature_point(position_data){
    for(let i=3; i<position_data.length-3; i++){
        const beforePoint = position_data[i-3];
        const point = position_data[i];
        const afterPoint = position_data[i+3];

        const v1 = new Vector2(point.x-beforePoint.x, point.y-beforePoint.y);
        const v2 = new Vector2(afterPoint.x-point.x, afterPoint.y-point.y);
        
        if(v1.angle(v2) >= angle_threshold){
            draw_point(point.x, point.y);
        }
    }
}


function draw_point(x, y, color="red"){
    ctx.fillStyle = color;
    ctx.fillRect(x-2, y-2, 4, 4);
}