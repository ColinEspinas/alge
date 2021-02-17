import Vec from '../utilities/Vec';
export default class Transform {
    position: Vec;
    rotation: number;
    scale: Vec;
    constructor();
    reset(): void;
    worldToLocal(position: Vec): Vec;
    localToWorld(position: Vec): Vec;
}
