import Manager from './Manager';
import SceneManager from '../managers/SceneManager';
import RenderManager from '../managers/RenderManager';
import TimeManager from '../managers/TimeManager';
import InputManager from '../managers/InputManager';
import PhysicsManager from '../managers/PhysicsManager';

export type Options  = {
	width ?: number;
	height ?: number;
	resolution ?: number,
	fullscreen ?: boolean;
	container ?: string;
	managers ?: any[];
	renderer ?: string;
	scaleMode ?: string;
	physics ?: string;
}

export default class engine {

	private _width : number;
	private _height : number;
	private _fullscreen : boolean;
	private _resolution : number;
	private _scaleMode : string;

	private _container : string;

	private managers : Manager[];

	constructor(options : Partial<Options> = {}) {

		options = Object.assign({
			width : 1280,
			height : 720,
			resolution : 1,
			fullscreen : false,
			container : "body",
			managers: [],
			renderer: 'pixi',
			scaleMode : 'nearest',
			physics: 'matter',
		}, options);

		this.managers = [];
		
		this.managers.push(new TimeManager(this));

		if (options.renderer == 'pixi') {
			this.managers.push(new RenderManager(this));
			this.managers.push(new SceneManager(this));
		}

		if (options.physics == 'matter') {
			this.managers.push(new PhysicsManager(this));
		}

		this.managers.push(new InputManager(this));

		for (var i = 0, len = options.managers.length; i < len; i++) {
			this.AddManager(options.managers[i]);
		}

		this._width = options.width;
		this._height = options.height;
		this._resolution = options.resolution;
		this._fullscreen = options.fullscreen;
		this._container = options.container;

		this._scaleMode = options.scaleMode;

		for (var i = 0, len = this.managers.length; i < len; i++) {
			this.managers[i].PreInit(options);
		}
	}

	public get width() { return this._width; }
	public get height() { return this._height; }
	public get resolution() { return this._resolution; }
	public get fullscreen() { return this._fullscreen; }
	public get container() { return this._container; }
	public get scaleMode() { return this._scaleMode; }

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