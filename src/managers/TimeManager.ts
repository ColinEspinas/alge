import Engine from "../core/Engine";
import Manager from "../core/Manager";

export default class TimeManager extends Manager {
	
	protected _name: string = "TimeManager";

	private _lastUpdate : number;
	private _deltaTime : number;
	private _lastDeltaTime : number;
	private _fps : number;
	private _step : number = 1 / 60;

	public constructor(engine : Engine) {
		super(engine);
		this._lastUpdate = 0;
		this._deltaTime = 0;
		this._fps = 0;
	}

	public get deltaTime() : number { return this._deltaTime; }
	public get lastDeltaTime() : number { return this._lastDeltaTime; }
	public get lastUpdate() : number { return this._lastUpdate; }
	public get fps() : number { return this._fps; }
	public get step() : number { return this._step; }

	public Update() {
		this._lastDeltaTime = this._deltaTime;
		this._deltaTime += Math.min(1, (performance.now() - this._lastUpdate)/1000);
		this._fps = 1/this._deltaTime;
	}

	public SetLastUpdate() {
		this._lastUpdate = performance.now();
	}

	public FixDelta() {
		this._deltaTime -= this._step;
	}
}