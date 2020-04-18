import BaseScene from './BaseScene';
import * as PIXI from 'pixi.js';
import * as Matter from 'matter-js';
export default class Scene extends BaseScene {
    protected _stage: PIXI.Container;
    protected _world: Matter.World;
    get stage(): PIXI.Container;
    get world(): Matter.World;
    Load(): void;
    Unload(): void;
}
