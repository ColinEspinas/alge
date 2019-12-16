import Vec from '../utilities/Vec'

export default class Transform {

	public position : Vec;
	public rotation : number;

	constructor() {
		this.position = new Vec(0, 0, 0);
		this.rotation = 0;
	}
}