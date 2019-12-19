import DrawManager from '../draw/DrawManager';
import Transform from './Transform';
import Component from '../components/Component'
import shortid from 'shortid';
import Two from 'two.js';
import SpriteRenderer from '../components/SpriteRenderer';

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

	AddComponent<ComponentType extends Component>(c : new (...args : any[]) => ComponentType, ...args : any[]) {
		this.components.push(new c(this, args));
		return this.components[this.components.length - 1];
	}

	GetComponent<ComponentType extends Component>(c : new (...args : any[]) => ComponentType) : ComponentType {
		for (var i = 0, len = this.components.length; i < len; i++) {
			if (this.components[i].name === new c(this).name) {
				return this.components[i] as ComponentType;
			}
		}
	}

	GetComponents<ComponentType extends Component>(c : new (...args : any[]) => ComponentType) : ComponentType[] {
		let components : Component[] = [];
		for (var i = 0, len = this.components.length; i < len; i++) {
			if (this.components[i].name === new c(this).name) {
				components.push(this.components[i]);
			}
		}
		return components as ComponentType[];
	}

	RemoveComponent<ComponentType extends Component>(c : new (...args : any[]) => ComponentType) : void {
		for (var i = 0, len = this.components.length; i < len; i++) {
			if (this.components[i].name === new c(this).name) {
				this.components.splice(i, 1);
			}
		}
	}
}