import { Viewport } from 'pixi-viewport';
import Vec from './Vec';
import Entity from '../core/Entity';
import TimeManager from '../managers/TimeManager';
export default class Camera {
    protected viewport: Viewport;
    protected timeManager: TimeManager;
    protected _target: ITarget;
    protected trauma: number;
    protected traumaPower: number;
    protected traumaDecay: number;
    protected maxShakeOffset: Vec;
    protected maxShakeRoll: number;
    constructor(viewport: Viewport, timeManager: TimeManager);
    set target(target: ITarget);
    get target(): ITarget;
    get position(): Vec;
    WorldToCamera(position: Vec): Vec;
    CameraToWorld(position: Vec): Vec;
    Zoom(amount: number, position?: Vec): void;
    Move(direction: Vec, speed?: number): void;
    MoveTo(position: Vec, options: IMoveOptions): void;
    MoveToHorizontal(position: Vec, options: IMoveOptions): void;
    MoveToVertical(position: Vec, options: IMoveOptions): void;
    AddTrauma(amount: number): void;
    protected Shake(): void;
    Update(): void;
}
export interface IMoveOptions {
    function: Function;
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
