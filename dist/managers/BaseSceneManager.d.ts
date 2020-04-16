import Manager from '../core/Manager';
import BaseScene from "../scenes/BaseScene";
import Engine from '../core/Engine';
export default class BaseSceneManager extends Manager {
    protected _name: string;
    protected scenes: BaseScene[];
    protected loadedScene: BaseScene;
    constructor(engine: Engine);
    Init(): void;
    Update(): void;
    CreateScene(name: string): BaseScene;
    GetScenes(): BaseScene[];
    GetScene(name: string): BaseScene;
    GetLoadedScene(): BaseScene;
    RemoveScene(index: number): void;
    LoadSceneByIndex(index: number): void;
    LoadSceneByName(name: string): void;
}
