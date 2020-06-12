import Engine from "../core/Engine";
import Manager from "../core/Manager";
import * as Matter from "matter-js";
import TimeManager from './TimeManager';
import SceneManager from './SceneManager';

export default class PhysicsManager extends Manager {
	
	protected _physicsEngine: Matter.Engine;
	protected sceneManager : SceneManager = this.engine.GetManager("Scene");

	public get physicsEngine() { return this._physicsEngine; }

	public constructor(engine : Engine, name : string) {
		super(engine, name);
		this._physicsEngine = Matter.Engine.create();
	}

	public FixedUpdate() {
		if (this.sceneManager) {
			this._physicsEngine.world = this.sceneManager.GetLoadedScene().world;
			Matter.Engine.update(this._physicsEngine);
		}
	}
}