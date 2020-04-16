import Manager from '../core/Manager';
import SceneManager from './SceneManager';
import * as PIXI from 'pixi.js';

export default class PixiRenderManager extends Manager{
	
	protected _name: string = "PixiRenderManager";
	protected _renderer : PIXI.Renderer;
	protected sceneManager : SceneManager = this.engine.GetManager(SceneManager);

	public Init() {

		PIXI.utils.skipHello();

		const container = document.querySelector(this.engine.container)

		if (this.engine.fullscreen) {
			this._renderer = new PIXI.Renderer({
				width: container.clientWidth,
				height: container.clientHeight,
				resolution: this.engine.resolution,
				transparent: true,
			});
			// Add listener to window resize to keep the rendered view the same size as the container.
			window.addEventListener('resize', () => {
				this._renderer.resize(container.clientWidth, container.clientHeight);
			});
		}
		else {	
			this._renderer = new PIXI.Renderer({ 
				width: this.engine.width, 
				height: this.engine.height,
				resolution: this.engine.resolution,
				transparent: true,
			});
		}
		container.appendChild(this.renderer.view);

		PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;
	}

	public Update() {
		if (this.sceneManager) {
			let stage = this.sceneManager.GetLoadedScene().container;
			this.renderer.render(stage);
		}
	}

	public get renderer() : PIXI.Renderer { return this._renderer; }
}