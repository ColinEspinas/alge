import Manager from '../Manager';
import Scene from "./Scene";
import Engine, { Options } from '../Engine';
export default class SceneManager extends Manager {
    protected _name: string;
    private scenes;
    private loadedScene;
    constructor(engine: Engine);
    PreInit(options: Options): void;
    Init(): void;
    Update(): void;
    CreateScene(name: string): void;
    GetScenes(): Scene[];
    GetScene(name: string): Scene;
    RemoveScene(index: number): void;
    LoadScene(index: number): void;
    UpdateLoadedScene(): void;
}
