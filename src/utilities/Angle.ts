export default class Angle {

	public static DegToRad(degrees : number) {
		return degrees * Math.PI / 180;
	}

	public static RadToDeg(radians : number) {
		return radians * 180 / Math.PI;
	}
}