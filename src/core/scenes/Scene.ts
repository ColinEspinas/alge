import Entity from '../entities/Entity';
import Two from 'two.js';
import shortid from 'shortid';

export default class Scene {

	private id : number;
	entities : Entity[];
	draw : Two;

	constructor() {
		this.id = shortid.generate();
		console.log(this.id);
	}

	get GetId() {
		return this.id;
	}

	Load(draw : Two) {
		this.draw = draw;
		var rect = this.draw.makeRectangle(213, 100, 100, 100);
		rect.fill = '#FF0000';
		this.draw.bind('update', function() {
			rect.rotation += 0.05;
		});
	}

	Render() : void {

	}
}