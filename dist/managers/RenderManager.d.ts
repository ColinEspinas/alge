import Manager from '../core/Manager';
import * as PIXI from 'pixi.js';
import { Viewport } from 'pixi-viewport';
import Scene from '../scenes/Scene';
export default class RenderManager extends Manager {
    protected _name: string;
    protected _renderer: PIXI.Renderer;
    protected _viewport: Viewport;
    Init(): void;
    Update(): void;
    LoadSceneToViewport(scene: Scene): void;
    get renderer(): PIXI.Renderer;
    get viewport(): Viewport;
}
