import BaseScene from './BaseScene';
import * as PIXI from 'pixi.js';
import Vec from '../utilities/Vec';
export default class Scene extends BaseScene {
    protected _stage: PIXI.Container;
    protected _layers: ILayer[];
    get stage(): PIXI.Container;
    get layers(): ILayer[];
    initDefaultLayer(): void;
    addLayer(name: string, options?: ILayerOptions): ILayer;
    getLayer(name: string): ILayer;
    getLayerIndex(name: string): number;
    removeLayer(name: string): void;
    swapLayer(nameFirstLayer: string, nameSecondLayer: string): void;
    renameLayer(currentName: string, name: string): void;
    load(): void;
    unload(): void;
}
export interface ILayer {
    name: string;
    container: PIXI.Container;
    fixed: boolean;
    speed: Vec;
    rotation: number;
}
export interface ILayerOptions {
    fixed?: boolean;
    speed?: Vec;
    rotation?: number;
}
