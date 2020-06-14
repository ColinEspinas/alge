import * as PIXI from 'pixi.js';
import Vec from './Vec';
export default class Viewport extends PIXI.Container {
    protected viewWidth: number;
    protected viewHeight: number;
    protected _stage: PIXI.Container;
    protected stagePosition: Vec;
    protected debugGraphics: PIXI.Graphics;
    get width(): number;
    get height(): number;
    get center(): Vec;
    constructor(options: IViewportOptions);
    Resize(width: number, height: number): void;
    Debug(): void;
    SetStage(stage: PIXI.Container, debug: boolean): void;
    get stage(): PIXI.Container;
}
export interface IViewportOptions {
    width: number;
    height: number;
}
