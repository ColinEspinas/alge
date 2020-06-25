import Engine from "../core/Engine";
import Manager from "../core/Manager";

export default class TimeManager extends Manager {
	
	private _lastUpdate : number;
	private _deltaTime : number;
	private _lastDeltaTime : number;
	private _fps : number;
	private _step : number = 1 / 60;
	private _accumulator : number = 0;

	public constructor(engine : Engine, name : string) {
		super(engine, name);
		this._lastUpdate = 0;
		this._deltaTime = 0;
		this._fps = 0;
	}

	public get deltaTime() : number { return this._deltaTime; }
	public get lastDeltaTime() : number { return this._lastDeltaTime; }
	public get lastUpdate() : number { return this._lastUpdate; }
	public get fps() : number { return this._fps; }
	public get step() : number { return this._step; }
	public get accumulator() : number { return this._accumulator; }

	public update() {
		this._lastDeltaTime = this._deltaTime;
		this._deltaTime = Math.min(1, (performance.now() - this._lastUpdate)/1000);
		this._accumulator += this.deltaTime;
		this._fps = 1/this._deltaTime;
	}

	public setLastUpdate() {
		this._lastUpdate = performance.now();
	}

	public fixDelta() {
		this._accumulator -= this._step;
	}
}