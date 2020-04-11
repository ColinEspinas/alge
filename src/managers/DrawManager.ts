import Two from 'two.js';
import Manager from '../core/Manager';

export default class DrawManager  extends Manager{
	
	protected _name: string = "DrawManager";

	private driver : Two;

	public Init() {
		this.SetContext(
			new Two({
				width: this.engine.width,
				height: this.engine.height,
				fullscreen: this.engine.fullscreen,
				autostart: false,
				type: Two.Types.webgl,
			}).appendTo(document.querySelector(this.engine.container))
		);
	}

	public Update() {
		this.driver.update();
	}

	public SetContext(driver : any) {
		this.driver = driver;
	}

	public GetContext() : any { return this.driver; }
}