import Entity from '../core/Entity';
import shortid from 'shortid';
import Engine from '../core/Engine';

export default class BaseScene {

	protected _id : number;
	protected _name : string;

	protected engine : Engine;

	protected loaded : boolean = false;

	protected entities : Entity[];
	protected loadedEntities: Entity[];

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
		this.Unload();
		this.Load();
	}

	public Load() : void {
		this.loadedEntities = [];
		this.loaded = false;
		this.loadedEntities = this.entities;
	}

	protected UnloadEntity(entity : Entity) : void {
		entity.Unload();
		entity.UnloadComponents();
	}

	public Unload() : void {
		this.loadedEntities = [];
		this.loaded = false;
		for (var i = 0, len = this.entities.length; i < len; i++) {
			const entity = this.entities[i];
			this.UnloadEntity(entity);
		}
	}

	protected InitEntity(entity : Entity) : void {
		entity.Init();
		entity.InitComponents();
	}

	protected UpdateEntity(entity : Entity) : void {
		if (this.loaded == false) {
			this.InitEntity(entity);
		}
		else {
			entity.Update();
			entity.UpdateComponents();
		}
	}

	public Update() : void {
		for (var i = 0, len = this.entities.length; i < len; i++) {
			const entity = this.loadedEntities[i];
			this.UpdateEntity(entity);
		}
		this.loaded = true;
	}

	public AddEntity<EntityType extends Entity>(e : new (...args : any[]) => EntityType, name : string, properties ?: Object) : Entity {
		if (name && name !== "") {
			this.entities.push(new e(this.engine, name, properties));
			if (this.loaded) {
				this.InitEntity(this.entities[this.entities.length - 1]);
			}
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