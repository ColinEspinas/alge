import Entity from '../core/Entity';
import BaseSceneManager from '../managers/BaseSceneManager';
import shortid from 'shortid';
import Engine from '../core/Engine';

export default class BaseScene {

	protected _id : number;
	protected _name : string;

	protected _manager : BaseSceneManager;

	protected loaded : boolean = false;

	protected entities : any[];
	protected loadedEntities: any[];

	constructor(manager : BaseSceneManager, name : string) {
		this._id = shortid.generate();
		this._name = name;
		this._manager = manager;
		this.entities = [];
		this.loadedEntities = [];
	}

	get id() : number {
		return this._id;
	}

	get name() : string {
		return this._name;
	}

	get engine() : Engine {
		return this._manager.engine;
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
		this.loaded = false;
		for (var i = 0, len = this.loadedEntities.length; i < len; i++) {
			const entity = this.loadedEntities[i];
			this.UnloadEntity(entity);
		}
		this.loadedEntities = [];
	}

	protected InitEntity(entity : Entity) : void {
		if (entity) {
			entity.Init();
			entity.InitComponents();
		}
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
		for (var i = 0, len = this.loadedEntities.length; i < len; i++) {
			const entity = this.loadedEntities[i];
			this.UpdateEntity(entity);
		}
		this.loaded = true;
	}

	public FixedUpdate() : void {
		for (var i = 0, len = this.loadedEntities.length; i < len; i++) {
			this.loadedEntities[i].FixedUpdate();
		}
	}

	public AddEntity<EntityType extends Entity>(e : EntityType) : EntityType {
		e.scene = this;
		e.Create();
		this.entities.push(e);
		if (this.loaded) {
			this.InitEntity(this.entities[this.entities.length - 1]);
		}
		return this.entities[this.entities.length - 1];
	}

	public GetEntity(name : string) {
		for (var i = 0, len = this.entities.length; i < len; i++) {
			if (this.entities[i].name == name) {
				return this.entities[i];
			}
		}
	}
}