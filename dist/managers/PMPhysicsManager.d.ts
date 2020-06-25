import Engine from "../core/Engine";
import Manager from "../core/Manager";
import * as Matter from "matter-js";
import PMSceneManager from './PMSceneManager';
export default class PMPhysicsManager extends Manager {
    protected _physicsEngine: Matter.Engine;
    protected sceneManager: PMSceneManager;
    get physicsEngine(): any;
    constructor(engine: Engine, name: string);
    fixedUpdate(): void;
    set gravity(value: number);
    get gravity(): number;
}
