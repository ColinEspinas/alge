import Two from 'two.js';

export default class DrawManager {

	private static _instance : DrawManager;
	private static driver : any;

	private constructor() {
		
	}

	static get instance() : DrawManager {
		if (!DrawManager._instance) {
			DrawManager._instance = new DrawManager();
		}
		return DrawManager._instance;
	}

	static SetContext(driver : any) {
		this.driver = driver;
	}

	static GetContext() : any { return this.driver; }
}