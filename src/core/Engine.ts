import Manager from './Manager';
import PIXISceneManager from '../managers/PIXISceneManager';
import PIXIRenderManager from '../managers/PIXIRenderManager';
import TimeManager from '../managers/TimeManager';
import InputManager from '../managers/InputManager';
import PMPhysicsManager from '../managers/PMPhysicsManager';
import PMSceneManager from '../managers/PMSceneManager';
import AudioManager from '../managers/AudioManager';

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
	framerate ?: number;
}

export default class engine {

	private _width : number;
	private _height : number;
	private _fullscreen : boolean;
	private _resolution : number;
	private _scaleMode : string;
	private _gameScale : number;
	private _framerate : number;

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
			physics: null,
			gameScale: 1,
			framerate: 60,
		}, options);

		this.managers = [];
		
		this.managers.push(new TimeManager(this, "Time"));

		if (options.renderer === 'pixi') {
			this.managers.push(new PIXIRenderManager(this, "Render"));

			if (options.physics === 'matter') {
				this.managers.push(new PMPhysicsManager(this, "Physics"));
				this.managers.push(new PMSceneManager(this, "Scene"));
			}
			else {
				this.managers.push(new PIXISceneManager(this, "Scene"));
			}
		}

		this.managers.push(new InputManager(this, "Input"));
		this.managers.push(new AudioManager(this, "Audio"));

		for (var i = 0, len = options.managers.length; i < len; i++) {
			this.addManager(options.managers[i]);
		}

		this._width = options.width;
		this._height = options.height;
		this._resolution = options.resolution;
		this._fullscreen = options.fullscreen;
		this._container = options.container;

		this._scaleMode = options.scaleMode;
		this._gameScale = options.gameScale;
		this._framerate = options.framerate;

		for (var i = 0, len = this.managers.length; i < len; i++) {
			this.managers[i].preInit(options);
		}
	}

	public get width() { return this._width; }
	public get height() { return this._height; }
	public get resolution() { return this._resolution; }
	public get fullscreen() { return this._fullscreen; }
	public get container() { return this._container; }
	public get scaleMode() { return this._scaleMode; }
	public get gameScale() { return this._gameScale; }
	public get framerate() { return this._framerate; }

	public run() : number {

		for (var i = 0, len = this.managers.length; i < len; i++) {
			this.managers[i].init();
		}

		this.getManager("Time").setTargetFps(this.framerate);

		console.log("Engine is running in ", document.querySelector(this._container));

		requestAnimationFrame(this.update.bind(this));
		return 0;
	}

	public update(now : number) : void {
		
		requestAnimationFrame(this.update.bind(this));

		this.getManager("Time").setDeltaTime(now);

		if (this.getManager("Time").deltaTime >= (this.getManager("Time").step - this.getManager("Time").tolerance)) {
			this.getManager("Time").setLastUpdate(this.getManager("Time").now - (this.getManager("Time").deltaTime % this.getManager("Time").step));
			for (var i = 0, len = this.managers.length; i < len; i++) {
				this.managers[i].fixedUpdate();
			}
		}
		for (var i = 0, len = this.managers.length; i < len; i++) {
			this.managers[i].update();
		}
	}

	protected addManager<ManagerType extends Manager>(m : ManagerType) : ManagerType {
		m.engine = this;
		this.managers.push(m);
		return this.managers[this.managers.length - 1];
	}

	public getManager(name : string) {
		for (var i = 0, len = this.managers.length; i < len; i++) {
			if (this.managers[i].name === name) {
				return this.managers[i];
			}
		}
	}

	public getManagers(name : string) {
		let managers = [];
		for (var i = 0, len = this.managers.length; i < len; i++) {
			if (this.managers[i].name === name) {
				managers.push(this.managers[i]);
			}
		}
		return managers;
	}
}