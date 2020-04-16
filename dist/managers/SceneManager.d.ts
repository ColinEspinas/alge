import BaseSceneManager from './BaseSceneManager';
import Scene from '../scenes/Scene';
export default class SceneManager extends BaseSceneManager {
    protected _name: string;
    protected scenes: Scene[];
    protected loadedScene: Scene;
    CreateScene(name: string): Scene;
    GetScenes(): Scene[];
    GetScene(name: string): Scene;
    GetLoadedScene(): Scene;
}
