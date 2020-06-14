import Entity from "../core/Entity";
import Viewport from "../utilities/Viewport";
import Vec from "../utilities/Vec";
import Sprite from "../components/Sprite";
import Scene from "../scenes/Scene";
import TimeManager from "../managers/TimeManager";
export default class Camera extends Entity {
    protected _viewport: Viewport;
    protected _center: Vec;
    protected sprite: Sprite;
    protected time: TimeManager;
    protected _target: ITarget;
    protected trauma: number;
    protected traumaPower: number;
    protected traumaDecay: number;
    protected maxShakeOffset: Vec;
    protected maxShakeRoll: number;
    protected _bounds: Vec[];
    get bounds(): Vec[];
    get center(): Vec;
    get viewport(): Viewport;
    set target(target: ITarget);
    get target(): ITarget;
    get scene(): Scene;
    set scene(scene: Scene);
    Init(): void;
    Update(): void;
    WorldToCamera(position: Vec): Vec;
    CameraToWorld(position: Vec): Vec;
    Move(direction: Vec, speed?: number): void;
    MoveTo(position: Vec, options: IMoveOptions): void;
    MoveToHorizontal(position: Vec, options: IMoveOptions): void;
    MoveToVertical(position: Vec, options: IMoveOptions): void;
    AddTrauma(amount: number): void;
    protected Shake(): void;
    Rotate(angle: number): void;
    IsOnCamera(position: Vec): boolean;
}
export interface IMoveOptions {
    time?: number;
    tolerance?: number;
    duration: number;
    centered?: boolean;
}
export interface ITarget {
    entity?: Entity;
    position?: Vec;
    vertical: boolean;
    horizontal: boolean;
    options: IMoveOptions;
}
