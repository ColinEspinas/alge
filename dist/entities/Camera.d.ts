import Entity from "../core/Entity";
import Viewport from "../utilities/Viewport";
import Vec from "../utilities/Vec";
import Sprite from "../components/Sprite";
import PIXIScene from "../scenes/PIXIScene";
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
    get scene(): PIXIScene;
    set scene(scene: PIXIScene);
    init(): void;
    update(): void;
    worldToCamera(position: Vec): Vec;
    cameraToWorld(position: Vec): Vec;
    move(direction: Vec, speed?: number): void;
    moveTo(position: Vec, options: IMoveOptions): void;
    moveToHorizontal(position: Vec, options: IMoveOptions): void;
    moveToVertical(position: Vec, options: IMoveOptions): void;
    addTrauma(amount: number): void;
    protected shake(): void;
    rotate(angle: number): void;
    isOnCamera(position: Vec): boolean;
}
export interface IMoveOptions {
    time?: number;
    tolerance?: number;
    duration: number;
    centered?: boolean;
    offset?: Vec;
}
export interface ITarget {
    entity?: Entity;
    position?: Vec;
    vertical: boolean;
    horizontal: boolean;
    options: IMoveOptions;
}
