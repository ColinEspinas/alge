import Vec from "./Vec";

export default class Angle {

	public static degToRad(degrees : number) {
		return degrees * Math.PI / 180;
	}

	public static radToDeg(radians : number) {
		return radians * 180 / Math.PI;
	}

	public static betweenPositions(u : Vec, v : Vec) {
		return Math.atan2(v.y - u.y, v.x - u.x);
	}
}