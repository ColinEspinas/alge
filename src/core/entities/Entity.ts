import DrawManager from '../draw/DrawManager';
import Transform from './Transform';
import shortid from 'shortid';
import Two from 'two.js';

export default class Entity {

	private id : number;
	public shape : any;
	public transform : Transform;
	public texture : any;

	constructor() {
		this.id = shortid.generate();
		this.transform = new Transform();
	}

	get GetId() : number {
		return this.id;
	}

	Init() {
		this.texture = new Two.Texture('https://s.ftcdn.net/v2013/pics/all/curated/RKyaEDwp8J7JKeZWQPuOVWvkUjGQfpCx_cover_580.jpg?r=1a0fc22192d0c808b8bb2b9bcfbf4a45b1793687', function() {
		});
	}

	Update() {
		var draw = DrawManager.GetDriver();

		this.shape = draw.makeCircle(300, 300, 100);
		this.shape.fill = this.texture;

		this.transform.position.x += 1;
		this.transform.rotation += 0.1;
		this.shape.translation = new Two.Vector(this.transform.position.x, this.transform.position.y);
		this.shape.rotation = this.transform.rotation;
	}
}