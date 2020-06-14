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
	gameScale ?: number;
}

export default class engine {

	private _width : number;
	private _height : number;
	private _fullscreen : boolean;
	private _resolution : number;
	private _scaleMode : string;
	private _gameScale : number;

	private _container : string;

	private managers : any[];

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
			gameScale: 1,
		}, options);

		this.managers = [];
		
		this.managers.push(new TimeManager(this, "Time"));

		if (options.renderer === 'pixi') {
			this.managers.push(new RenderManager(this, "Render"));
			this.managers.push(new SceneManager(this, "Scene"));
		}

		if (options.physics === 'matter') {
			this.managers.push(new PhysicsManager(this, "Physics"));
		}

		this.managers.push(new InputManager(this, "Input"));

		for (var i = 0, len = options.managers.length; i < len; i++) {
			this.AddManager(options.managers[i]);
		}

		this._width = options.width;
		this._height = options.height;
		this._resolution = options.resolution;
		this._fullscreen = options.fullscreen;
		this._container = options.container;

		this._scaleMode = options.scaleMode;
		this._gameScale = options.gameScale;

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
	public get gameScale() { return this._gameScale; }

	public Run() : number {

		for (var i = 0, len = this.managers.length; i < len; i++) {
			this.managers[i].Init();
		}

		console.log("Engine is running in ", document.querySelector(this._container));

		requestAnimationFrame(this.Update.bind(this));
		return 0;
	}

	public Update() : void {
		while(this.GetManager("Time").accumulator > this.GetManager("Time").step) {
			this.GetManager("Time").FixDelta();
			for (var i = 0, len = this.managers.length; i < len; i++) {
				this.managers[i].FixedUpdate();
			}
		}
		for (var i = 0, len = this.managers.length; i < len; i++) {
			this.managers[i].Update();
		}
		this.GetManager("Time").SetLastUpdate();
		requestAnimationFrame(this.Update.bind(this));
	}

	protected AddManager<ManagerType extends Manager>(m : ManagerType) : ManagerType {
		m.engine = this;
		this.managers.push(m);
		return this.managers[this.managers.length - 1];
	}

	public GetManager(name : string) {
		for (var i = 0, len = this.managers.length; i < len; i++) {
			if (this.managers[i].name === name) {
				return this.managers[i];
			}
		}
	}

	public GetManagers(name : string) {
		let managers = [];
		for (var i = 0, len = this.managers.length; i < len; i++) {
			if (this.managers[i].name === name) {
				managers.push(this.managers[i]);
			}
		}
		return managers;
	}
}