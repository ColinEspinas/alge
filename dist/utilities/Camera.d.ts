import { Viewport } from 'pixi-viewport';
import Vec from './Vec';
import Entity from '../core/Entity';
export default class Camera {
    protected viewport: Viewport;
    constructor(viewport: Viewport);
    get position(): Vec;
    WorldToCamera(position: Vec): Vec;
    CameraToWorld(position: Vec): Vec;
    Zoom(amount: number, position?: Vec): void;
    Move(direction: Vec, speed?: number): void;
    MoveTo(position: Vec): void;
    Follow(e: Entity, options: FollowOptions): void;
    FollowHorizontal(e: Entity, options: FollowOptions): void;
    FollowVertical(e: Entity, options: FollowOptions): void;
    Shake(): void;
}
export interface FollowOptions {
    function: Function;
    time?: number;
    duration: number;
}
