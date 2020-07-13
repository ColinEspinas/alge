import Vec from "./Vec";

export class Rect {

	public point1 : Vec;
	public point2 : Vec;
	
	public get width() : number { return this.point1.x - this.point2.x; }
	public get height() : number{ return this.point1.y - this.point2.y; }

	constructor(point1 : Vec, point2 : Vec) {
		this.point1 = point1;
		this.point2 = point2;
	}
}

export class Circle {

	public point : Vec;
	public radius : number;

	constructor(point : Vec, radius : number) {
		this.point = point;
		this.radius = radius;
	}
}

export class Line {

	public point1 : Vec;
	public point2 : Vec;

	constructor(point1 : Vec, point2 : Vec) {
		this.point1 = point1;
		this.point2 = point2;
	}
}

export class Polygon {

	public points : Vec[];

	constructor(points : Vec[]) {
		this.points = points;
	}
}