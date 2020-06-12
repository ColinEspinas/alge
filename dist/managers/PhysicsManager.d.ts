import Engine from "../core/Engine";
import Manager from "../core/Manager";
import * as Matter from "matter-js";
import SceneManager from './SceneManager';
export default class PhysicsManager extends Manager {
    protected _physicsEngine: Matter.Engine;
    protected sceneManager: SceneManager;
    get physicsEngine(): any;
    constructor(engine: Engine, name: string);
    FixedUpdate(): void;
}
