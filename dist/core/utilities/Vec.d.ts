export default class Vec {
    x: number;
    y: number;
    z?: number;
    constructor(x: number, y: number, z?: number);
    static FromArray: (a: number[]) => Vec;
    Equals(v: Vec, tolerance: number): boolean;
    Add(v: Vec): Vec;
    Sub(v: Vec): Vec;
    Scale(f: number): Vec;
    Distance(v: Vec): number;
    SquareDistance(v: Vec): number;
    SimpleDistance(v: Vec): number;
    Dot(v: Vec): number;
    Cross(v: Vec): Vec;
    Length(): number;
    Normalize(): Vec;
    Limit(s: number): Vec;
    Lerp(v: Vec, t: number): Vec;
    ToString(): string;
    static Zero(): Vec;
    static One(): Vec;
    static Up(): Vec;
    static Down(): Vec;
    static Left(): Vec;
    static Right(): Vec;
    static Front(): Vec;
    static Back(): Vec;
}
