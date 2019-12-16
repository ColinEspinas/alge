export default class Time {

	private static instance : Time;

	private static lastUpdate : number;
	private static deltaTime : number;
	private static fps : number;

	private constructor() {
		Time.lastUpdate = 0;
		Time.deltaTime = 0;
		Time.fps = 0;
	}

	static Instance() : Time {
		if (!Time.instance) {
			Time.instance = new Time();
		}
		return Time.instance;
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