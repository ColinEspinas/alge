import Manager from '../core/Manager';
import BaseScene from "../scenes/BaseScene";
import Engine, { Options } from '../core/Engine';

export default class BaseSceneManager extends Manager {

	protected _name: string = "BaseSceneManager";

	protected scenes : BaseScene[];
	protected loadedScene : BaseScene;

	constructor(engine : Engine) {
		super(engine);
		this.scenes = [];
	}

	public Init() {
		this.LoadSceneByIndex(0);
	}

	public Update() {
		this.loadedScene.Update();
	}

	public CreateScene(name : string) : BaseScene {
		if (name && name !== "") {
			try {
				this.GetScene(name);
			}
			catch {
				let scene = new BaseScene(name, this.engine);
				this.scenes.push(scene);
				return scene;
			}
			throw Error("Scene with name " + name + " already exist");
		}
		else throw Error("Cannot create scene with name " + name);
	}
	
	public GetScenes() : BaseScene[] {
		return this.scenes;
	}

	public GetScene(name : string) : BaseScene {
		for (var i = 0, len = this.scenes.length; i < len; i++) {
			if (this.scenes[i].name === name) {
				return this.scenes[i];
			}
		}
		throw Error("Cannot get scene with name " + name);
	}

	public GetLoadedScene() : BaseScene {
		return this.loadedScene;
	}

	public RemoveScene(index : number) : void {
		this.scenes.splice(index, 1);
	}

	public LoadSceneByIndex(index : number) : void {
		if (typeof this.scenes[index] !== "undefined") {
			if (this.loadedScene)
			this.loadedScene.Unload();
			this.loadedScene = this.scenes[index];
			this.scenes[index].Load();
		}
		else throw Error("Cannot load scene with index " + index);
	}

	public LoadSceneByName(name : string) : void {
		try {
			const scene = this.GetScene(name);
			if (this.loadedScene)
				this.loadedScene.Unload();
			this.loadedScene = scene;
			scene.Load();
		}
		catch(error) { 
			console.error(error);
			throw Error("Cannot load scene with name " + name)
		};
	}
}