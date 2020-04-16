import Manager from '../core/Manager';
import SceneManager from './SceneManager';
import * as PIXI from 'pixi.js';
export default class PixiRenderManager extends Manager {
    protected _name: string;
    protected _renderer: PIXI.Renderer;
    protected sceneManager: SceneManager;
    Init(): void;
    Update(): void;
    get renderer(): PIXI.Renderer;
}
