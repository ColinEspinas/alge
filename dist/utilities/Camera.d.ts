import { Viewport } from 'pixi-viewport';
import Vec from './Vec';
import Entity from '../core/Entity';
export default class Camera {
    protected viewport: Viewport;
    protected deltaTime: number;
    protected _target: ITarget;
    protected trauma: number;
    protected traumaPower: number;
    protected traumaDecay: number;
    protected maxShakeOffset: Vec;
    protected maxShakeRoll: number;
    constructor(viewport: Viewport);
    set target(target: ITarget);
    get target(): ITarget;
    get position(): Vec;
    set position(position: Vec);
    WorldToCamera(position: Vec): Vec;
    CameraToWorld(position: Vec): Vec;
    Zoom(amount: number, position?: Vec): void;
    Move(direction: Vec, speed?: number): void;
    MoveTo(position: Vec, options: IMoveOptions): void;
    MoveToHorizontal(position: Vec, options: IMoveOptions): void;
    MoveToVertical(position: Vec, options: IMoveOptions): void;
    AddTrauma(amount: number): void;
    protected Shake(): void;
    Update(deltaTime: number): void;
}
export interface IMoveOptions {
    time?: number;
    tolerance?: number;
    duration: number;
}
export interface ITarget {
    entity?: Entity;
    position?: Vec;
    vertical: boolean;
    horizontal: boolean;
    options: IMoveOptions;
}
