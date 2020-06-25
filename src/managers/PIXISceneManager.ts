import BaseSceneManager from './BaseSceneManager';
import PIXIScene from '../scenes/PIXIScene';

export default class PIXISceneManager extends BaseSceneManager {

	protected scenes : PIXIScene[];
	protected loadedScene : PIXIScene;

	public createScene(name : string) : PIXIScene {
		if (name && name !== "") {
			try {
				this.getScene(name);
			}
			catch {
				let scene = new PIXIScene(this, name);
				this.scenes.push(scene);
				return scene;
			}
			throw Error("Scene with name " + name + " already exist");
		}
		else throw Error("Cannot create scene with name " + name);
	}

	public getScenes() : PIXIScene[] {
		return this.scenes;
	}

	public getScene(name : string) : PIXIScene {
		for (var i = 0, len = this.scenes.length; i < len; i++) {
			if (this.scenes[i].name === name) {
				return this.scenes[i];
			}
		}
		throw Error("Cannot get scene with name " + name);
	}

	public getLoadedScene() : PIXIScene {
		return this.loadedScene;
	}
}