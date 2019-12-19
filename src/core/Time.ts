export default class Time {

	private static _instance : Time;

	private static lastUpdate : number;
	private static deltaTime : number;
	private static fps : number;

	private constructor() {
		Time.lastUpdate = 0;
		Time.deltaTime = 0;
		Time.fps = 0;
	}

	static get instance() : Time {
		if (!Time._instance) {
			Time._instance = new Time();
		}
		return Time._instance;
	}

	static DeltaTime() : number { return this.deltaTime; }
	static LastUpdate() : number { return this.lastUpdate; }
	static Fps() : number { return this.fps; }

	static Update() {
		this.deltaTime = (performance.now() - this.lastUpdate)/1000;
		this.lastUpdate = performance.now();
		this.fps = 1/this.deltaTime;
	}
}