import Entity from "./Entity";

export default abstract class Component {

	protected parent : Entity;
	protected _name : string;
	protected _properties : Object;
	
	public constructor(parent : Entity, name : string, properties ?: Object) {
		this.parent = parent;
		this._name = name;
		this._properties = properties || {};;
		this.Create();
	}

	public get name() { return this._name; }
	public get properties() { return this._properties; }

	public Create() {};
	public Init() {};
	public Update() {};
	public Unload() {};
}