import Vec from "./Vec";
export declare class Rect {
    point1: Vec;
    point2: Vec;
    get width(): number;
    get height(): number;
    constructor(point1: Vec, point2: Vec);
}
export declare class Circle {
    point: Vec;
    radius: number;
    constructor(point: Vec, radius: number);
}
export declare class Line {
    point1: Vec;
    point2: Vec;
    constructor(point1: Vec, point2: Vec);
}
export declare class Polygon {
    points: Vec[];
    constructor(points: Vec[]);
}
