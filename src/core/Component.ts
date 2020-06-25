import Entity from "./Entity";
import Engine from "./Engine";

export default abstract class Component {

	protected _parent : Entity;
	protected _name : string;
	protected _properties : Object;
	
	public constructor(parent : Entity, name : string, properties ?: Object) {
		this._parent = parent;
		this._name = name;
		this._properties = properties || {};
	}

	public get name() { return this._name; }
	public get properties() { return this._properties; }
	public get engine() { return this.parent.engine; }
	public get parent() { return this._parent; }
	public set parent(entity : Entity) { this._parent = entity; }

	public create() {};
	public init() {};
	public update() {};
	public fixedUpdate() {};
	public unload() {};
}