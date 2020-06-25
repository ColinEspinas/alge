export default class Vec {
    x: number;
    y: number;
    z?: number;
    constructor(x: number, y: number, z?: number);
    equals(v: Vec, tolerance: number): boolean;
    add(v: Vec): Vec;
    sub(v: Vec): Vec;
    scale(f: number): Vec;
    distance(v: Vec): number;
    squareDistance(v: Vec): number;
    simpleDistance(v: Vec): number;
    dot(v: Vec): number;
    cross(v: Vec): Vec;
    length(): number;
    normalize(): Vec;
    limit(s: number): Vec;
    lerp(v: Vec, t: number): Vec;
    toString(): string;
    static zero(): Vec;
    static one(): Vec;
    static up(): Vec;
    static down(): Vec;
    static left(): Vec;
    static right(): Vec;
    static front(): Vec;
    static back(): Vec;
    static from(v: Vec): Vec;
    static fromArray(a: number[]): Vec;
}
