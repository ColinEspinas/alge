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

	public get id() : number { return this._id; }
	public get name() : string { return this._name; }
	public get engine() : Engine { return this._manager.engine; }

	public reload() : void {
		this.unload();
		this.load();
	}

	public load() : void {
		this.loadedEntities = [];
		this.loaded = false;
		this.loadedEntities = this.entities;
	}

	protected unloadEntity(entity : Entity) : void {
		entity.unload();
		entity.unloadComponents();
	}

	public unload() : void {
		this.loaded = false;
		for (var i = 0, len = this.loadedEntities.length; i < len; i++) {
			const entity = this.loadedEntities[i];
			this.unloadEntity(entity);
		}
		this.loadedEntities = [];
	}

	protected initEntity(entity : Entity) : void {
		if (entity) {
			entity.init();
			entity.initComponents();
		}
	}

	protected updateEntity(entity : Entity) : void {
		if (entity) {
			if (this.loaded == false) {
				this.initEntity(entity);
			}
			else {
				entity.update();
				entity.updateComponents();
			}
		}
	}

	public update() : void {
		for (var i = 0, len = this.loadedEntities.length; i < len; i++) {
			const entity = this.loadedEntities[i];
			this.updateEntity(entity);
		}
		this.loaded = true;
	}

	public fixedUpdate() : void {
		for (var i = 0, len = this.loadedEntities.length; i < len; i++) {
			this.loadedEntities[i].fixedUpdate();
			this.loadedEntities[i].fixedUpdateComponents();
		}
	}

	public addEntity<EntityType extends Entity>(e : EntityType) : EntityType {
		e.scene = this;
		e.create();
		this.entities.push(e);
		if (this.loaded) {
			this.initEntity(this.entities[this.entities.length - 1]);
		}
		return this.entities[this.entities.length - 1];
	}

	public removeEntity(name : string) {
		if (this.loaded) {
			for (var i = this.loadedEntities.length - 1; i >= 0; --i) {
				if (this.loadedEntities[i].name == name) {
					this.unloadEntity(this.loadedEntities[i]);
					this.loadedEntities.splice(i, 1);
				}
			}
		}
		else {
			for (var i = this.entities.length - 1; i >= 0; --i) {
				if (this.entities[i].name == name) {
					this.entities.splice(i, 1);
				}
			}
		}
	}

	public getEntity(name : string) {
		for (var i = 0, len = this.entities.length; i < len; i++) {
			if (this.entities[i].name == name) {
				return this.entities[i];
			}
		}
	}

	public getEntities() {
		if (this.loaded) {
			return this.loadedEntities;
		}
		else {
			return this.entities;
		}
	}
}