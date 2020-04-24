import BaseSceneManager from './BaseSceneManager';
import Scene from '../scenes/Scene';

export default class SceneManager extends BaseSceneManager {

	protected _name: string = "SceneManager";

	protected scenes : Scene[];
	protected loadedScene : Scene;

	public CreateScene(name : string) : Scene {
		if (name && name !== "") {
			try {
				this.GetScene(name);
			}
			catch {
				let scene = new Scene(this.engine, name);
				this.scenes.push(scene);
				return scene;
			}
			throw Error("Scene with name " + name + " already exist");
		}
		else throw Error("Cannot create scene with name " + name);
	}

	public GetScenes() : Scene[] {
		return this.scenes;
	}

	public GetScene(name : string) : Scene {
		for (var i = 0, len = this.scenes.length; i < len; i++) {
			if (this.scenes[i].name === name) {
				return this.scenes[i];
			}
		}
		throw Error("Cannot get scene with name " + name);
	}

	public GetLoadedScene() : Scene {
		return this.loadedScene;
	}
}