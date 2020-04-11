import Two from 'two.js';
import SceneManager from '../managers/SceneManager';
import DrawManager from '../managers/DrawManager';
import TimeManager from '../managers/TimeManager';
import InputManager from '../managers/InputManager';
import Manager from './Manager';

export type Options  = {
	width ?: number;
	height ?: number;
	fullscreen ?: boolean;
	container ?: string;
	managers ?: any[];
}

export default class engine {

	private _width : number;
	private _height : number;
	private _fullscreen : boolean;

	private _container : string;

	private managers : Manager[];

	constructor(options : Partial<Options> = {}) {

		options = Object.assign({
			width : 1280,
			height : 720,
			fullscreen : false,
			container : "body",
			managers: [],
		}, options);

		this.managers = [];

		this.managers.push(new TimeManager(this));
		this.managers.push(new SceneManager(this));
		this.managers.push(new DrawManager(this));
		this.managers.push(new InputManager(this));

		for (var i = 0, len = options.managers.length; i < len; i++) {
			this.AddManager(options.managers[i]);
		}

		this._width = options.width;
		this._height = options.height;
		this._fullscreen = options.fullscreen;
		this._container = options.container;

		for (var i = 0, len = this.managers.length; i < len; i++) {
			this.managers[i].PreInit(options);
		}
	}

	public get width() { return this._width; }
	public get height() { return this._height;  }
	public get fullscreen() { return this._fullscreen; }
	public get container() { return this._container; }

	public Run() : number {

		for (var i = 0, len = this.managers.length; i < len; i++) {
			this.managers[i].Init();
		}

		console.log("Engine is running in ", document.querySelector(this._container));

		requestAnimationFrame(this.Update.bind(this));
		return 0;
	}

	public Update() : void {
		for (var i = 0, len = this.managers.length; i < len; i++) {
			this.managers[i].Update();
		}
		requestAnimationFrame(this.Update.bind(this));
	}

	protected AddManager<ManagerType extends Manager>(c : new (...args : any[]) => ManagerType, ...args : any[]) : Manager {
		if (name && name !== "") {
			this.managers.push(new c(this, ...args));
			return this.managers[this.managers.length - 1];
		}
		else throw Error("Manager name is null or empty");
	}

	public GetManager<ManagerType extends Manager>(m : new (...args : any[]) => ManagerType) : ManagerType {
		for (var i = 0, len = this.managers.length; i < len; i++) {
			if (this.managers[i].name === m.name) {
				return this.managers[i] as ManagerType;
			}
		}
	}

	public GetManagers<ManagerType extends Manager>(m : new (...args : any[]) => ManagerType) : ManagerType[] {
		let managers : Manager[] = [];
		for (var i = 0, len = this.managers.length; i < len; i++) {
			if (this.managers[i].name === m.name) {
				managers.push(this.managers[i]);
			}
		}
		return managers as ManagerType[];
	}
}