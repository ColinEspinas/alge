import Entity from '../entities/Entity';
import Two from 'two.js';
import shortid from 'shortid';

export default class Scene {

	private id : number;
	entities : Entity[];
	draw : Two;
	rect : any;

	constructor() {
		this.id = shortid.generate();
		console.log(this.id);
	}

	get GetId() : number {
		return this.id;
	}

	Load(draw : Two) : void {
		this.draw = draw;
		this.rect = this.draw.makeRectangle(213, 100, 100, 100);
		this.rect.fill = '#FF0000';
	}

	Render() : void {
		this.rect.rotation += 0.05;
	}
}