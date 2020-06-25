import Transform from './Transform';
import Component from './Component';
import Engine from './Engine';
import shortid from 'shortid';

export default class Entity {

	protected _id : number;
	protected _name : string;
	protected _properties : Object;

	protected _scene;

	public shape : any;
	public transform : Transform;
	public texture : any;
	protected components : any[];

	protected _tags : string[];

	constructor(name : string, properties ?: Object) {
		this._id = shortid.generate();
		this._name = name;
		this._properties = properties || {};
		this.transform = new Transform();
		this.components = [];
		this._tags = (properties) ? properties["tags"] : [] || [];
		// this.Create();
	}

	public get id() : number { return this._id; }
	public set name(name : string) { this.name = name; }
	public get name() { return this._name; }
	public get engine() : Engine { return this._scene.engine; }
	public get properties() { return this._properties; }
	public get scene() { return this._scene; }

	public set scene(scene) { this._scene = scene; }

	public create() {};
	public init() {};
	public update() {};
	public fixedUpdate() {};
	public unload() {};

	public initComponents() {
		for (var i = 0, len = this.components.length; i < len; i++) {
			this.components[i].init();
		}
	}

	public updateComponents() {
		for (var i = 0, len = this.components.length; i < len; i++) {
			this.components[i].update();
		}
	}

	public fixedUpdateComponents() {
		for (var i = 0, len = this.components.length; i < len; i++) {
			this.components[i].fixedUpdate();
		}
	}

	public unloadComponents() {
		for (var i = 0, len = this.components.length; i < len; i++) {
			this.components[i].unload();
		}
	}

	// public AddComponent<ComponentType extends Component>(c : new (...args : any[]) => ComponentType, properties ?: Object) : ComponentType {
	// 	let name : string;
	// 	if (properties && properties["name"]) name = properties["name"];
	// 	else name = c.name;
	// 	this.components.push(new c(this, name, properties));
	// 	return this.components[this.components.length - 1];
	// }

	public addComponent<ComponentType extends Component>(c : ComponentType) : ComponentType {
		c.parent = this;
		c.create();
		this.components.push(c);
		return this.components[this.components.length - 1];
	}

	public getComponent(name : string) {
		for (var i = 0, len = this.components.length; i < len; i++) {
			if (this.components[i].name == name) {
				return this.components[i];
			}
		}
	}

	public removeComponent(name : string) : void {
		for (var i = 0, len = this.components.length; i < len; i++) {
			if (this.components[i].name === name) {
				this.components.splice(i, 1);
			}
		}
	}

	public hasTag(tag : string) {
		return this._tags.includes(tag);
	}

	public getTagIndex(tag : string) {
		return this._tags.indexOf(tag);
	}

	public addTag(tag : string) {
		this._tags.push(tag);
	}

	public removeTag(tag : string) {
		this._tags.splice(this.getTagIndex(tag), 1);
	}
}