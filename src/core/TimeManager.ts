export default class TimeManager {

	private static _instance : TimeManager;

	private static lastUpdate : number;
	private static deltaTime : number;
	private static fps : number;

	private constructor() {
		TimeManager.lastUpdate = 0;
		TimeManager.deltaTime = 0;
		TimeManager.fps = 0;
	}

	static get instance() : TimeManager {
		if (!TimeManager._instance) {
			TimeManager._instance = new TimeManager();
		}
		return TimeManager._instance;
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