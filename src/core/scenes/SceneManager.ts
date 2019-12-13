import Scene from "./Scene";
import Two from 'two.js';

export default class SceneManager {

	private static instance : SceneManager;
	private scenes : Scene[];
	private loadedScene : Scene;

	private constructor() {
		this.scenes = [];
	}

	static Instance() : SceneManager {
		if (!SceneManager.instance) {
			SceneManager.instance = new SceneManager();
		}
		return SceneManager.instance;
	}
	
	get GetScenes() {
		return this.scenes;
	}

	public AddScene(scene : Scene, index ?: number) {
		if (index && index >= 0) {
			this.scenes.splice(index, 0, scene);
		}
		else {
			this.scenes.push(scene);
		}
	}

	public RemoveScene(index : number) {
		this.scenes.splice(index, 1);
	}

	public Load(index : number, draw : Two) {
		this.loadedScene = this.scenes[index];
		this.scenes[index].Load(draw);
	}

	public UpdateScenes() {
		for (var i = 0, len = this.scenes.length; i < len; i++) {
			this.scenes[i].Render();
		}
	}

}