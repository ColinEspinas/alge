import Entity from '../Entity';
import shortid from 'shortid';

export default class Scene {

	private id : number;
	entities : Entity[];

	constructor() {
		this.id = shortid.generate();
		this.entities = [];
	}

	get GetId() : number {
		return this.id;
	}

	Load() : void {
		for (var i = 0, len = this.entities.length; i < len; i++) {
			this.entities[i].Init();
		}
	}

	Unload() : void {
		this.entities = [];
	}

	Render() : void {
		for (var i = 0, len = this.entities.length; i < len; i++) {
			this.entities[i].Update();
		}
	}
}