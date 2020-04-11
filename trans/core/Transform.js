import Vec from './utilities/Vec';
export default class Transform {
    constructor() {
        this.Reset();
    }
    Reset() {
        this.position = new Vec(0, 0, 0);
        this.rotation = 0;
        this.scale = new Vec(1, 1);
    }
}
