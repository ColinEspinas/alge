import shortid from 'shortid';

export default class Entity {

	private id : number;

	constructor() {
		this.id = shortid.generate();
	}
}