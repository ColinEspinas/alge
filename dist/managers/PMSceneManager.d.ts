import BaseSceneManager from './BaseSceneManager';
import PMScene from '../scenes/PMScene';
export default class PMSceneManager extends BaseSceneManager {
    protected scenes: PMScene[];
    protected loadedScene: PMScene;
    createScene(name: string): PMScene;
    getScenes(): PMScene[];
    getScene(name: string): PMScene;
    getLoadedScene(): PMScene;
}
