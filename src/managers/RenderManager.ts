import Manager from '../core/Manager';
import * as PIXI from 'pixi.js';
import { Viewport } from 'pixi-viewport';
import Scene from '../scenes/Scene';

export default class RenderManager extends Manager{
	
	protected _name: string = "RenderManager";
	protected _renderer : PIXI.Renderer;
	protected _viewport : Viewport;

	public Init() {

		PIXI.utils.skipHello();

		const container = document.querySelector(this.engine.container)

		if (this.engine.fullscreen) {
			// Instantiate Renderer:
			this._renderer = new PIXI.Renderer({
				width: container.clientWidth,
				height: container.clientHeight,
				resolution: this.engine.resolution,
				transparent: true,
			});
			// Instantiate Viewport:
			this._viewport = new Viewport({
				screenWidth: container.clientWidth,
				screenHeight: container.clientHeight,
			});
			// Add listener to window resize to keep the rendered view the same size as the container.
			window.addEventListener('resize', () => {
				this._renderer.resize(container.clientWidth, container.clientHeight);
				this._viewport.resize(container.clientWidth, container.clientHeight);
			});
		}
		else {	
			// Instantiate Renderer:
			this._renderer = new PIXI.Renderer({ 
				width: this.engine.width, 
				height: this.engine.height,
				resolution: this.engine.resolution,
				transparent: true,
			});
			// Instantiate Viewport:
			this._viewport = new Viewport({
				screenWidth: this.engine.width,
				screenHeight: this.engine.height,
			});
		}
		container.appendChild(this.renderer.view);
		
		if (this.engine.scaleMode === "linear")
			PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.LINEAR;
		else PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;
	}

	public Update() {
		this.renderer.render(this._viewport);
	}

	public LoadSceneToViewport(scene : Scene) {
		this._viewport.removeChildren();
		this._viewport.addChild(scene.stage);
	}

	public get renderer() : PIXI.Renderer { return this._renderer; }
	public get viewport() : Viewport { return this._viewport; }
}