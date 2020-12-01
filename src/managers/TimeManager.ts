import Engine from "../core/Engine";
import Manager from "../core/Manager";

export default class TimeManager extends Manager {
	
	private _now : number;
	private _lastUpdate : number;
	private _deltaTime : number;
	private _fps : number;
	private _step : number = 1000 / 60;
	private _tolerance : number = 0.1;

	public constructor(engine : Engine, name : string) {
		super(engine, name);
		this._lastUpdate = 0;
		this._deltaTime = 0;
		this._now = 0;
		this._fps = 0;
	}

	public get deltaTime() : number { return this._deltaTime; }
	public get lastUpdate() : number { return this._lastUpdate; }
	public get fps() : number { return this._fps; }
	public get step() : number { return this._step; }
	public get now() : number { return this._now; }
	public get tolerance() : number { return this._tolerance; }
	public get milliDelta() { return this.deltaTime / 1000; }

	public init() {
		this.setLastUpdate();
	}

	public update() {
		this._fps = 1 / this.milliDelta;
	}

	public setNow(now : number) {
		this._now = now;
	}

	public setDeltaTime(now ?: number) {
		this._now = now || this._now;
		this._deltaTime = this._now - this._lastUpdate;
	}

	public setLastUpdate(value ?: number) {
		this._lastUpdate = value || performance.now();
	}

	public setTargetFps(value : number) {
		this._step = 1000 / value;
	}
}