import Scene from './scenes/Scene';
import Two from 'two.js';
import SceneManager from './scenes/SceneManager';
import DrawManager from './draw/DrawManager';
import Time from './Time';
import InputManager from './inputs/InputManager';

type Options  = {
	scenes ?: Scene[];
	width ?: number;
	height ?: number;
	fullscreen ?: boolean;
	container ?: string;
}

export default class engine {

	private width : number;
	private height : number;
	private fullscreen : boolean;

	private container : string;

	public sceneManager : SceneManager;
	public drawManager : DrawManager;
	public inputManager : InputManager;

	constructor(options : Partial<Options> = {}) {

		options = Object.assign({
			scenes : [],
			width : 1280,
			height : 720,
			fullscreen : false,
			container : "body",
		}, options);

		this.sceneManager = SceneManager.Instance();
		this.drawManager = DrawManager.Instance();
		this.inputManager = InputManager.Instance();

		for (var i = 0, len = options.scenes.length; i < len; i++) {
			this.sceneManager.AddScene(options.scenes[i]);
		}

		this.width = options.width;
		this.height = options.height;
		this.fullscreen = options.fullscreen;
		this.container = options.container;

		if (options.scenes.length <= 0) {
			let scene = new Scene();
			this.sceneManager.AddScene(scene);
		}
	}

	public Run() : number {
		DrawManager.SetContext(
			new Two({
				width: this.width,
				height: this.height,
				fullscreen: this.fullscreen,
				autostart: false,
				type: Two.Types.webgl,
			}).appendTo(document.querySelector(this.container))
		);

		this.inputManager.Init(this.container);

		console.log("Engine is running in ", document.querySelector(this.container));

		this.sceneManager.Load(0);

		requestAnimationFrame(this.Update.bind(this));
		return 0;
	}

	public Update() : void {
		Time.Update();
		this.sceneManager.RenderLoadedScene();
		DrawManager.GetContext().update();
		requestAnimationFrame(this.Update.bind(this));
	}
}