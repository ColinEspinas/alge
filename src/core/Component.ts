import Entity from "./Entity";

export default abstract class Component {

	protected parent : Entity;
	protected _name : string;
	
	public constructor(parent : Entity, name : string) {
		this.parent = parent;
		this._name = name;
	}

	public get name() { return this._name; }

	public abstract Init();
	public abstract Update();

	public Unload() {};
}