import Manager from '../core/Manager';
import Scene from "../core/Scene";
export default class SceneManager extends Manager {
    constructor(engine) {
        super(engine);
        this._name = "SceneManager";
        this.scenes = [];
    }
    Init() {
        this.LoadSceneByIndex(0);
    }
    Update() {
        this.loadedScene.Update();
    }
    CreateScene(name) {
        if (name && name !== "") {
            try {
                this.GetScene(name);
            }
            catch (_a) {
                let scene = new Scene(name, this.engine);
                this.scenes.push(scene);
                return scene;
            }
            throw Error("Scene with name " + name + " already exist");
        }
        else
            throw Error("Cannot create scene with name " + name);
    }
    GetScenes() {
        return this.scenes;
    }
    GetScene(name) {
        for (var i = 0, len = this.scenes.length; i < len; i++) {
            if (this.scenes[i].name === name) {
                return this.scenes[i];
            }
        }
        throw Error("Cannot get scene with name " + name);
    }
    RemoveScene(index) {
        this.scenes.splice(index, 1);
    }
    LoadSceneByIndex(index) {
        if (typeof this.scenes[index] !== "undefined") {
            if (this.loadedScene)
                this.loadedScene.Unload();
            this.loadedScene = this.scenes[index];
            this.scenes[index].Load();
        }
        else
            throw Error("Cannot load scene with index " + index);
    }
    LoadSceneByName(name) {
        try {
            const scene = this.GetScene(name);
            if (this.loadedScene)
                this.loadedScene.Unload();
            this.loadedScene = scene;
            scene.Load();
        }
        catch (_a) {
            throw Error("Cannot load scene with name " + name);
        }
        ;
    }
}
