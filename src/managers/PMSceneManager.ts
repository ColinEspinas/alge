import BaseSceneManager from './BaseSceneManager';
import PMScene from '../scenes/PMScene';

export default class PMSceneManager extends BaseSceneManager {

	protected scenes : PMScene[];
	protected loadedScene : PMScene;

	public createScene(name : string) : PMScene {
		if (name && name !== "") {
			try {
				this.getScene(name);
			}
			catch {
				let scene = new PMScene(this, name);
				this.scenes.push(scene);
				return scene;
			}
			throw Error("Scene with name " + name + " already exist");
		}
		else throw Error("Cannot create scene with name " + name);
	}

	public getScenes() : PMScene[] {
		return this.scenes;
	}

	public getScene(name : string) : PMScene {
		for (var i = 0, len = this.scenes.length; i < len; i++) {
			if (this.scenes[i].name === name) {
				return this.scenes[i];
			}
		}
		throw Error("Cannot get scene with name " + name);
	}

	public getLoadedScene() : PMScene {
		return this.loadedScene;
	}
}