import Engine from "../core/Engine";
import Manager from "../core/Manager";
import * as Matter from "matter-js";
import TimeManager from './TimeManager';
import SceneManager from './SceneManager';

export default class PhysicsManager extends Manager {
	
	protected _name: string = "PhysicsManager";

	protected _physicEngine: Matter.Engine;
	protected timeManager: TimeManager = this.engine.GetManager(TimeManager);
	protected sceneManager : SceneManager = this.engine.GetManager(SceneManager);

	public constructor(engine : Engine) {
		super(engine);
		this._physicEngine = Matter.Engine.create();
	}

	public Update() {
		if (this.sceneManager && this.timeManager) {
			this._physicEngine.world = this.sceneManager.GetLoadedScene().world;
			const delta = this.timeManager.deltaTime * 1000;
			const lastdelta = this.timeManager.lastDeltaTime * 1000;
			Matter.Engine.update(
				this._physicEngine, 
				// Not working even with the documentation pointing to that solution using default fixed instead
				// delta, 
				// delta / lastdelta,
				1000/60
			);
		}
	}
}