import Engine from "../core/Engine";
import Manager from "../core/Manager";

export default class TimeManager extends Manager {
	
	protected _name: string = "TimeManager";

	private _lastUpdate : number;
	private _deltaTime : number;
	private _fps : number;

	public constructor(engine : Engine) {
		super(engine);
		this._lastUpdate = 0;
		this._deltaTime = 0;
		this._fps = 0;
	}

	public get deltaTime() : number { return this._deltaTime; }
	public get lastUpdate() : number { return this._lastUpdate; }
	public get fps() : number { return this._fps; }

	public Update() {
		this._deltaTime = (performance.now() - this._lastUpdate)/1000;
		this._lastUpdate = performance.now();
		this._fps = 1/this._deltaTime;
	}
}