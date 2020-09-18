import Manager from '../core/Manager';
import * as PIXI from 'pixi.js';
import Viewport from '../utilities/Viewport';
import PIXIScene from '../scenes/PixiScene';
export default class PIXIRenderManager extends Manager {
    protected _renderer: PIXI.Renderer;
    protected _viewport: Viewport;
    protected mainContainer: PIXI.Container;
    init(): void;
    update(): void;
    loadSceneToViewport(scene: PIXIScene): void;
    resize(width?: number, height?: number): void;
    get renderer(): PIXI.Renderer;
    get viewport(): Viewport;
}
