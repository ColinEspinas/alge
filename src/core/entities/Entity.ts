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
		this.texture = new Two.Texture('https://s.ftcdn.net/v2013/pics/all/curated/RKyaEDwp8J7JKeZWQPuOVWvkUjGQfpCx_cover_580.jpg?r=1a0fc22192d0c808b8bb2b9bcfbf4a45b1793687', function() {
		});
		this.transform.position.y = 500;
		this.transform.position.x = 500;
	}

	Update() {
		var draw = DrawManager.GetDriver();
		this.shape = draw.makeCircle(this.transform.position.x, this.transform.position.y, 100);
		this.shape.fill = this.texture;
		this.shape.scale = new Two.Vector(this.transform.scale.x, this.transform.scale.y);
		this.shape.translation = new Two.Vector(this.transform.position.x, this.transform.position.y);
		this.shape.rotation = this.transform.rotation;
	}

	AddComponent<ComponentType extends Component>(c : new () => ComponentType) : Component {
		this.components.push(new c());
		return this.components[this.components.length - 1];
	}

	GetComponent<ComponentType extends Component>(c : new () => ComponentType) : Component {
		for (var i = 0, len = this.components.length; i < len; i++) {
			if (typeof this.components[i] === typeof c) {
				return this.components[i];
			}
		}
	}

	GetComponents<ComponentType extends Component>(c : new () => ComponentType) : Component[] {
		let components : Component[] = [];
		for (var i = 0, len = this.components.length; i < len; i++) {
			if (typeof this.components[i] === typeof c) {
				components.push(this.components[i]);
			}
		}
		return components;
	}

	RemoveComponent<ComponentType extends Component>(c : new () => ComponentType) : void {
		for (var i = 0, len = this.components.length; i < len; i++) {
			if (typeof this.components[i] === typeof c) {
				this.components.splice(i, 1);
			}
		}
	}
}