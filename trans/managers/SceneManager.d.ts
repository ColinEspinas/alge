import Manager from '../core/Manager';
import Scene from "../core/Scene";
import Engine from '../core/Engine';
export default class SceneManager extends Manager {
    protected _name: string;
    private scenes;
    private loadedScene;
    constructor(engine: Engine);
    Init(): void;
    Update(): void;
    CreateScene(name: string): Scene;
    GetScenes(): Scene[];
    GetScene(name: string): Scene;
    RemoveScene(index: number): void;
    LoadSceneByIndex(index: number): void;
    LoadSceneByName(name: string): void;
}
