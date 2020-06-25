import Engine from "../core/Engine";
import Manager from "../core/Manager";
import * as Matter from "matter-js";
import TimeManager from './TimeManager';
import PMSceneManager from './PMSceneManager';

export default class PMPhysicsManager extends Manager {
	
	protected _physicsEngine: Matter.Engine;
	protected sceneManager : PMSceneManager = this.engine.getManager("Scene");

	public get physicsEngine() { return this._physicsEngine; }

	public constructor(engine : Engine, name : string) {
		super(engine, name);
		this._physicsEngine = Matter.Engine.create();
	}

	public fixedUpdate() {
		if (this.sceneManager) {
			this._physicsEngine.world = this.sceneManager.getLoadedScene().world;
			Matter.Engine.update(this._physicsEngine);
		}
	}

	public set gravity(value : number) { this._physicsEngine.world = this.sceneManager.getLoadedScene().gravity = value; }
	public get gravity() { return this._physicsEngine.world = this.sceneManager.getLoadedScene().world.gravity; }
}