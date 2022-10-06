class Vector2 {
    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }

    //大きさ
    magnitude() {
        const { x, y } = this;
        return Math.sqrt(x**2 + y**2);
    }

    //内積
    dot(other_vector) {
        return (this.x * other_vector.x + this.y * other_vector.y);
    }

    //cosθ
    cosTheta(other_vector){
        return this.dot(other_vector) / (this.magnitude() * other_vector.magnitude());
    }

    //角度
    angle(other_vector){
        const cos = this.dot(other_vector) / (this.magnitude() * other_vector.magnitude());
        const rad = Math.acos(cos);
        return rad * (180 / Math.PI);
    }
}


export default Vector2;