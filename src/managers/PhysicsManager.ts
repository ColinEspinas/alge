import Engine from "../core/Engine";
import Manager from "../core/Manager";
import * as Matter from "matter-js";
import TimeManager from './TimeManager';
import SceneManager from './SceneManager';

export default class PhysicsManager extends Manager {
	
	protected _name: string = "PhysicsManager";

	protected _physicsEngine: Matter.Engine;
	protected timeManager: TimeManager = this.engine.GetManager(TimeManager);
	protected sceneManager : SceneManager = this.engine.GetManager(SceneManager);

	public get physicsEngine() { return this._physicsEngine; }

	public constructor(engine : Engine) {
		super(engine);
		this._physicsEngine = Matter.Engine.create();
	}

	public FixedUpdate() {
		if (this.sceneManager && this.timeManager) {
			this._physicsEngine.world = this.sceneManager.GetLoadedScene().world;
			Matter.Engine.update(this._physicsEngine);
		}
	}
}