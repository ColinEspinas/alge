import BaseSceneManager from './BaseSceneManager';
import PIXIScene from '../scenes/PixiScene';
export default class PIXISceneManager extends BaseSceneManager {
    protected scenes: PIXIScene[];
    protected loadedScene: PIXIScene;
    createScene(name: string): PIXIScene;
    getScenes(): PIXIScene[];
    getScene(name: string): PIXIScene;
    getLoadedScene(): PIXIScene;
}
