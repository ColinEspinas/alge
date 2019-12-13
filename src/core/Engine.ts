import Scene from './scenes/Scene';
import Two from 'two.js';
import SceneManager from './scenes/SceneManager';

type Options  = {
	scenes ?: Scene[];
	width ?: number;
	height ?: number;
	fullscreen ?: boolean;
}

export default class engine {

	private width : number;
	private height : number;

	private lastCall : number;
	private deltaTime : number;
	private fps : number;

	private fullscreen : boolean;

	public draw : Two;

	public sceneManager : SceneManager;

	constructor(options : Partial<Options> = {}) {

		options = Object.assign({
			scenes : [],
			width : 1280,
			height : 720,
			fullscreen : false,
		}, options);

		this.sceneManager = SceneManager.Instance();

		for (var i = 0, len = options.scenes.length; i < len; i++) {
			this.sceneManager.AddScene(options.scenes[i]);
		}
		this.width = options.width;
		this.height = options.height;
		this.fullscreen = options.fullscreen;

		if (options.scenes.length <= 0) {
			let scene = new Scene();
			this.sceneManager.AddScene(scene, 0);
		}
	}

	public Run() : number {
		this.draw = new Two({
			width: this.width,
			height: this.height,
			fullscreen: this.fullscreen,
			autostart: false,
		}).appendTo(document.body);

		console.log("Engine is running");

		this.sceneManager.Load(0, this.draw);

		requestAnimationFrame(this.Update.bind(this));
		return 0;
	}

	public Update() : void {
		this.sceneManager.UpdateScenes();
		this.draw.update();

		this.deltaTime = (performance.now() - this.lastCall)/1000;
		this.lastCall = performance.now();
		this.fps = 1/this.deltaTime;

		requestAnimationFrame(this.Update.bind(this));
	}
}