import Two from 'two.js';

export default class DrawManager {

	private static instance : DrawManager;
	private static driver : any;

	private constructor() {
		
	}

	static Instance() : DrawManager {
		if (!DrawManager.instance) {
			DrawManager.instance = new DrawManager();
		}
		return DrawManager.instance;
	}

	static SetDriver(driver : any) {
		this.driver = driver;
	}

	static GetDriver() : any { return this.driver; }
}