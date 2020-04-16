import Vec from '../utilities/Vec'

export default class Transform {

	public position : Vec;
	public rotation : number;
	public scale : Vec;

	constructor() {
		this.Reset();
	}

	public Reset() {
		this.position = new Vec(0, 0, 0);
		this.rotation = 0;
		this.scale = new Vec(1, 1);
	}

	public WorldToLocal(position : Vec) {
		return position.Sub(this.position);
	}

	public LocalToWorld(position : Vec) {
		return position.Add(this.position);
	}
}