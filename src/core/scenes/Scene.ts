import Entity from '../entities/Entity';
import Two from 'two.js';
import shortid from 'shortid';

export default class Scene {

	private id : number;
	entities : Entity[];
	rect : any;

	constructor() {
		this.id = shortid.generate();
		this.entities = [];
		console.log(this.id);
	}

	get GetId() : number {
		return this.id;
	}

	Load() : void {
		this.entities.push(new Entity());

		for (var i = 0, len = this.entities.length; i < len; i++) {
			this.entities[i].Init();
		}
		// this.rect = this.draw.makeCircle(213, 120, 100, 100);
		// this.rect.fill = '#FAE';
		// this.rect = this.draw.makeCircle(213+70, 120-15, 12, 12);
		// this.rect.fill = '#000';
		// this.rect = this.draw.makeCircle(213-70, 120-15, 12, 12);
		// this.rect.fill = '#000';
		// this.rect = this.draw.makeRectangle(213, 120+15, 120, 12);
		// this.rect.fill = '#000';
	}

	Render() : void {
		// this.rect.rotation += 0.0005;
		for (var i = 0, len = this.entities.length; i < len; i++) {
			this.entities[i].Update();
		}
	}
}