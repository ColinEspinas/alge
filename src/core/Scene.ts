import Entity from './Entity';
import shortid from 'shortid';
import Engine from './Engine';

export default class Scene {

	private _id : number;
	protected _name : string;

	private engine : Engine;

	private loaded : boolean = false;

	private entities : Entity[];
	private loadedEntities: Entity[];

	constructor(name : string, engine : Engine) {
		this._id = shortid.generate();
		this._name = name;
		this.engine = engine;
		this.entities = [];
		this.loadedEntities = [];
	}

	get id() : number {
		return this._id;
	}

	get name() : string {
		return this._name;
	}

	public Reload() : void {
		this.loadedEntities = [];
		this.loaded = false;
		this.loadedEntities = this.entities;
	}

	public Load() : void {
		this.loadedEntities = [];
		this.loaded = false;
		this.loadedEntities = this.entities;
	}

	public Unload() : void {
		this.loadedEntities = [];
		this.loaded = false;
		for (var i = 0, len = this.entities.length; i < len; i++) {
			this.entities[i].Unload();
		}
	}

	public Update() : void {
		for (var i = 0, len = this.entities.length; i < len; i++) {
			if (this.loaded == false) { this.loadedEntities[i].Init(); }
			else { this.loadedEntities[i].Update(); }
		}
		this.loaded = true;
	}

	public AddEntity<EntityType extends Entity>(e : new (...args : any[]) => EntityType, name : string, ...args : any[]) : Entity {
		if (name && name !== "") {
			this.entities.push(new e(this.engine, name, ...args));
			return this.entities[this.entities.length - 1];
		}
		else throw Error("Entity name is null or empty");
	}

	public GetEntity(name : string) : Entity {
		for (var i = 0, len = this.entities.length; i < len; i++) {
			if (this.entities[i].name == name) {
				return this.entities[i];
			}
		}
	}
}