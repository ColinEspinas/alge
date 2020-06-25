import Manager from '../core/Manager';
import BaseScene from "../scenes/BaseScene";
import Engine from '../core/Engine';
export default class BaseSceneManager extends Manager {
    protected scenes: BaseScene[];
    protected loadedScene: BaseScene;
    constructor(engine: Engine, name: string);
    init(): void;
    update(): void;
    fixedUpdate(): void;
    createScene(name: string): BaseScene;
    getScenes(): BaseScene[];
    getScene(name: string): BaseScene;
    getLoadedScene(): BaseScene;
    removeScene(index: number): void;
    loadSceneByIndex(index: number): void;
    loadSceneByName(name: string): void;
}
