import Entity from "../entities/Entity";

export default abstract class Component {

	protected parent : Entity;
	protected abstract _name : string;

	public constructor(parent : Entity) {
		this.parent = parent;
	}
	public abstract Init();
	public abstract Update();
	public get name() { return this._name; }
}