import Engine from "../core/Engine";
import Manager from "../core/Manager";
import * as Matter from "matter-js";
import TimeManager from './TimeManager';
import SceneManager from './SceneManager';
export default class PhysicsManager extends Manager {
    protected _name: string;
    protected _physicsEngine: Matter.Engine;
    protected timeManager: TimeManager;
    protected sceneManager: SceneManager;
    get physicsEngine(): any;
    constructor(engine: Engine);
    Update(): void;
}
