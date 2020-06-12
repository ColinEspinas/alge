import Manager from '../core/Manager';
import * as PIXI from 'pixi.js';
import { Viewport } from 'pixi-viewport';
import Scene from '../scenes/Scene';
export default class RenderManager extends Manager {
    protected _renderer: PIXI.Renderer;
    protected _viewport: Viewport;
    protected mainContainer: PIXI.Container;
    Init(): void;
    Update(): void;
    LoadSceneToViewport(scene: Scene): void;
    get renderer(): PIXI.Renderer;
    get viewport(): Viewport;
}
