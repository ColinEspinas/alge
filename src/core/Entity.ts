import Transform from './Transform';
import Component from './Component';
import Engine from './Engine';
import shortid from 'shortid';

export default class Entity {

	protected _id : number;
	protected _name : string;
	protected _properties : Object;

	protected _engine : Engine;

	public shape : any;
	public transform : Transform;
	public texture : any;
	protected components : any[];

	constructor(engine : Engine, name : string, properties ?: Object) {
		this._id = shortid.generate();
		this._name = name;
		this._properties = properties || {};
		this._engine = engine;
		this.transform = new Transform();
		this.components = [];
		this.Create();
	}

	public get id() : number { return this._id; }
	public set name(name : string) { this.name = name; }
	public get name() { return this._name; }
	public get engine() { return this._engine; }
	public get properties() { return this._properties; }

	public Create() {};
	public Init() {};
	public Update() {};
	public Unload() {};

	public InitComponents() {
		for (var i = 0, len = this.components.length; i < len; i++) {
			this.components[i].Init();
		}
	}

	public UpdateComponents() {
		for (var i = 0, len = this.components.length; i < len; i++) {
			this.components[i].Update();
		}
	}

	public UnloadComponents() {
		for (var i = 0, len = this.components.length; i < len; i++) {
			this.components[i].Unload();
		}
	}

	public AddComponent<ComponentType extends Component>(c : new (...args : any[]) => ComponentType, properties ?: Object) : ComponentType {
		this.components.push(new c(this, c.name, properties));
		return this.components[this.components.length - 1];
	}

	public AddComponentWithName<ComponentType extends Component>(c : new (...args : any[]) => ComponentType, name : string, properties ?: Object) : Component {
		if (name && name !== "") {
			this.components.push(new c(this, name, properties));
			return this.components[this.components.length - 1];
		}
		else throw Error("Component name is null or empty");
	}

	public AddSharedComponent<ComponentType extends Component>(c : ComponentType) : Component {
		this.components.push(c);
		return this.components[this.components.length - 1];
	}

	public GetComponentFromName(name : string) {
		for (var i = 0, len = this.components.length; i < len; i++) {
			if (this.components[i].name == name) {
				return this.components[i];
			}
		}
	}

	public GetComponent<ComponentType extends Component>(c : new (...args : any[]) => ComponentType) : ComponentType {
		for (var i = 0, len = this.components.length; i < len; i++) {
			if (this.components[i].name === c.name) {
				return this.components[i];
			}
		}
	}


	public GetComponents<ComponentType extends Component>(c : new (...args : any[]) => ComponentType) : ComponentType[] {
		let components : Component[] = [];
		for (var i = 0, len = this.components.length; i < len; i++) {
			if (this.components[i].name === c.name) {
				components.push(this.components[i]);
			}
		}
		return components as ComponentType[];
	}

	public RemoveComponent(name : string) : void {
		for (var i = 0, len = this.components.length; i < len; i++) {
			if (this.components[i].name === name) {
				this.components.splice(i, 1);
			}
		}
	}
}