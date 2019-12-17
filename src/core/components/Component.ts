import Entity from "../entities/Entity";

export default abstract class Component {

	public parent : Entity;

	constructor(parent : Entity) {
		this.parent = parent;
	}

	protected abstract Init();
	protected abstract Update();
	
}