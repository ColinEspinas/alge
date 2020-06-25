import Vec from "./Vec";

export default class Intersects {

	public static lineToLine(p1 : Vec, p2 : Vec, p3 : Vec, p4 : Vec, includePoints : boolean) {

		// let x1 = p1.x;
		// let y1 = p1.y;

		// let x2 = p2.x;
		// let y2 = p2.y;
		
		// let x3 = p3.x;
		// let y3 = p3.y;
		
		// let x4 = p4.x;
		// let y4 = p4.y;

		let s1_x = p2.x - p1.x;
		let s1_y = p2.y - p1.y;
		let s2_x = p4.x - p3.x;
		let s2_y = p4.y - p3.y;
		let s = (-s1_y * (p1.x - p3.x) + s1_x * (p1.y - p3.y)) / (-s2_x * s1_y + s1_x * s2_y)
		let t = (s2_x * (p1.y - p3.y) - s2_y * (p1.x - p3.x)) / (-s2_x * s1_y + s1_x * s2_y)
		if (includePoints) return s >= 0 && s <= 1 && t >= 0 && t <= 1
		else return s > 0 && s < 1 && t > 0 && t < 1
	}
}