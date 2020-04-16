import BaseScene from './BaseScene';
import * as PIXI from 'pixi.js';
import * as Matter from 'matter-js';
export default class Scene extends BaseScene {
    protected _container: PIXI.Container;
    protected _world: Matter.World;
    get container(): PIXI.Container;
    get world(): Matter.World;
    Unload(): void;
}
