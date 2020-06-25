import Vec from "./Vec";
export default class Angle {
    static degToRad(degrees: number): number;
    static radToDeg(radians: number): number;
    static betweenPositions(u: Vec, v: Vec): number;
}
