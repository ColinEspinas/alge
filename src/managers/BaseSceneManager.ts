import Manager from '../core/Manager';
import BaseScene from "../scenes/BaseScene";
import Engine, { Options } from '../core/Engine';

export default class BaseSceneManager extends Manager {

	protected scenes : BaseScene[];
	protected loadedScene : BaseScene;

	constructor(engine : Engine, name : string) {
		super(engine, name);
		this.scenes = [];
	}

	public init() {
		this.loadSceneByIndex(0);
	}

	public update() {
		this.loadedScene.update();
	}

	public fixedUpdate() {
		this.loadedScene.fixedUpdate();
	}

	public createScene(name : string) : BaseScene {
		if (name && name !== "") {
			try {
				this.getScene(name);
			}
			catch {
				let scene = new BaseScene(this, name);
				this.scenes.push(scene);
				return scene;
			}
			throw Error("Scene with name " + name + " already exist");
		}
		else throw Error("Cannot create scene with name " + name);
	}
	
	public getScenes() : BaseScene[] {
		return this.scenes;
	}

	public getScene(name : string) : BaseScene {
		for (var i = 0, len = this.scenes.length; i < len; i++) {
			if (this.scenes[i].name === name) {
				return this.scenes[i];
			}
		}
		throw Error("Cannot get scene with name " + name);
	}

	public getLoadedScene() : BaseScene {
		return this.loadedScene;
	}

	public removeScene(index : number) : void {
		this.scenes.splice(index, 1);
	}

	public loadSceneByIndex(index : number) : void {
		if (typeof this.scenes[index] !== "undefined") {
			if (this.loadedScene)
			this.loadedScene.unload();
			this.loadedScene = this.scenes[index];
			this.scenes[index].load();
		}
		else throw Error("Cannot load scene with index " + index);
	}

	public loadScene(name : string) : void {
		try {
			const scene = this.getScene(name);
			if (this.loadedScene)
				this.loadedScene.unload();
			this.loadedScene = scene;
			scene.load();
		}
		catch(error) { 
			console.error(error);
		};
	}
}