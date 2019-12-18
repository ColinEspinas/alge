import DrawManager from '../draw/DrawManager';
import Transform from './Transform';
import Component from '../components/Component'
import shortid from 'shortid';
import Two from 'two.js';

export default class Entity {

	private id : number;
	public shape : any;
	public transform : Transform;
	public texture : any;
	public components : Component[];

	constructor() {
		this.id = shortid.generate();
		this.transform = new Transform();
		this.components = [];
	}

	get GetId() : number {
		return this.id;
	}

	Init() {
		for (var i = 0, len = this.components.length; i < len; i++) {
			this.components[i].Init();
		}
	}

	Update() {
		for (var i = 0, len = this.components.length; i < len; i++) {
			this.components[i].Update();
		}
	}

	AddComponent<ComponentType extends Component>(c : new (...args : any[]) => ComponentType, ...args : any[]) : Component {
		this.components.push(new c(this, args));
		return this.components[this.components.length - 1];
	}

	GetComponent<ComponentType extends Component>(c : ComponentType) : Component {
		for (var i = 0, len = this.components.length; i < len; i++) {
			if (typeof this.components[i] === typeof c) {
				return this.components[i];
			}
		}
	}

	GetComponents<ComponentType extends Component>(c : ComponentType) : Component[] {
		let components : Component[] = [];
		for (var i = 0, len = this.components.length; i < len; i++) {
			if (typeof this.components[i] === typeof c) {
				components.push(this.components[i]);
			}
		}
		return components;
	}

	RemoveComponent<ComponentType extends Component>(c : ComponentType) : void {
		for (var i = 0, len = this.components.length; i < len; i++) {
			if (typeof this.components[i] === typeof c) {
				this.components.splice(i, 1);
			}
		}
	}
}