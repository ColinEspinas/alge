import Vec from './utilities/Vec'

export default class Transform {

	public position : Vec;
	public rotation : number;
	public scale : Vec;

	constructor() {
		this.position = new Vec(0, 0, 0);
		this.rotation = 0;
		this.scale = new Vec(1, 1);
	}
}