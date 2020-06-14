import Manager from '../core/Manager';
import * as PIXI from 'pixi.js';
// import { Viewport } from 'pixi-viewport';
import Viewport from '../utilities/Viewport';
import Scene from '../scenes/Scene';

export default class RenderManager extends Manager{
	
	protected _renderer : PIXI.Renderer;
	protected _viewport : Viewport;
	protected mainContainer : PIXI.Container = new PIXI.Container();

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
				width: container.clientWidth,
				height: container.clientHeight,
			});
			// Add listener to window resize to keep the rendered view the same size as the container.
			window.addEventListener('resize', () => {
				this._renderer.resize(container.clientWidth, container.clientHeight);
				this._viewport.Resize(container.clientWidth, container.clientHeight);
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
				width: this.engine.width,
				height: this.engine.height,
			});
		}

		this.mainContainer.addChild(this._viewport);
		
		container.appendChild(this.renderer.view);
		
		if (this.engine.scaleMode === "linear")
			PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.LINEAR;
		else PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;
	}

	public Update() {
		this._viewport.Debug();
		this.renderer.render(this.mainContainer);
	}

	public LoadSceneToViewport(scene : Scene) {
		this._viewport.removeChildren();
		this._viewport.SetStage(scene.stage, false);
	}

	public get renderer() : PIXI.Renderer { return this._renderer; }
	public get viewport() : Viewport { return this._viewport; }
}