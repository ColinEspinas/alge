import Entity from "../entities/Entity";

export default abstract class Component {

	protected parent : Entity;

	public constructor(parent : Entity) {
		this.parent = parent;
	}
	public abstract Init();
	public abstract Update();
}