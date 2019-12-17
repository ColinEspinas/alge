import Entity from '../entities/Entity';
import Two from 'two.js';
import shortid from 'shortid';

export default class Scene {

	private id : number;
	entities : Entity[];

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
	}

	Render() : void {
		for (var i = 0, len = this.entities.length; i < len; i++) {
			this.entities[i].Update();
		}
	}
}