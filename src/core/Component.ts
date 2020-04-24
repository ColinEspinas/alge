import Entity from "./Entity";
import Engine from "./Engine";

export default abstract class Component {

	protected parent : Entity;
	protected _name : string;
	protected _properties : Object;

	// Shortcut for this.parent.engine.GetManager
	public GetManager : typeof Engine.prototype.GetManager;
	
	public constructor(parent : Entity, name : string, properties ?: Object) {
		this.parent = parent;
		this._name = name;
		this._properties = properties || {};

		this.GetManager = this.parent.engine.GetManager.bind(this.parent.engine);

		this.Create();
	}

	public get name() { return this._name; }
	public get properties() { return this._properties; }

	public Create() {};
	public Init() {};
	public Update() {};
	public FixedUpdate() {};
	public Unload() {};
}