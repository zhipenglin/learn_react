export default class {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    angleTo(p) {
        return Math.atan2(p.y - this.y, p.x - this.x);
    }

    applyTransform(v) {
        let xp = this.x * v[0] + this.y * v[2] + v[4],
            yp = this.x * v[1] + this.y * v[3] + v[5];
        this.x = xp;
        this.y = yp;
    }
}