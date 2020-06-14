import BaseScene from './BaseScene';
import * as PIXI from 'pixi.js';
import * as Matter from 'matter-js';
export default class Scene extends BaseScene {
    protected _stage: PIXI.Container;
    protected _layers: ILayer[];
    protected _world: Matter.World;
    get stage(): PIXI.Container;
    get world(): Matter.World;
    get layers(): ILayer[];
    InitDefaultLayer(): void;
    AddLayer(name: string, options?: ILayerOptions): ILayer;
    GetLayer(name: string): ILayer;
    GetLayerIndex(name: string): number;
    RemoveLayer(name: string): void;
    SwapLayer(nameFirstLayer: string, nameSecondLayer: string): void;
    RenameLayer(currentName: string, name: string): void;
    Load(): void;
    Unload(): void;
}
export interface ILayer {
    name: string;
    container: PIXI.Container;
    fixed: boolean;
    speed: number;
    rotation: number;
}
export interface ILayerOptions {
    fixed?: boolean;
    speed?: number;
    rotation?: number;
}
