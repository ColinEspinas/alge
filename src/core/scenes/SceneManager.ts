import Scene from "./Scene";
import Two from 'two.js';

export default class SceneManager {

	private static _instance : SceneManager;
	private scenes : Scene[];
	private loadedScene : Scene;

	private constructor() {
		this.scenes = [];
	}

	static get instance() : SceneManager {
		if (!SceneManager._instance) {
			SceneManager._instance = new SceneManager();
		}
		return SceneManager._instance;
	}
	
	get GetScenes() : Scene[] {
		return this.scenes;
	}

	public AddScene(scene : Scene, index ?: number) : void {
		if (index && index >= 0) {
			this.scenes.splice(index, 0, scene);
		}
		else {
			this.scenes.push(scene);
		}
	}

	public RemoveScene(index : number) : void {
		this.scenes.splice(index, 1);
	}

	public Load(index : number) : void {
		if (this.loadedScene)
			this.loadedScene.Unload();
		this.loadedScene = this.scenes[index];
		this.scenes[index].Load();
	}

	public RenderLoadedScene() : void {
		this.loadedScene.Render();
	}

}