import BaseScene from './BaseScene';
import RenderManager from '../managers/RenderManager';
import * as PIXI from 'pixi.js';
import * as Matter from 'matter-js';

export default class Scene extends BaseScene {

	protected _stage : PIXI.Container = new PIXI.Container();
	protected _layers : ILayer[] = [];

	protected _world : Matter.World = Matter.World.create({});

	public get stage() : PIXI.Container { return this._stage; }
	public get world() : Matter.World { return this._world; }
	public get layers() : ILayer[] { return this._layers; }

	public InitDefaultLayer() {
		this.AddLayer("Default");
		this.AddLayer("Debug", { fixed: true, rotation: 0 });
	}

	public AddLayer(name : string, options ?: ILayerOptions) : ILayer {
		options = options || {};
		this._layers.push({
			name: name,
			container: new PIXI.Container(),
			fixed: options.fixed || false,
			speed: (options.speed === 0) ? 0 : options.speed || 1,
			// zoom: (options.zoom === 0) ? 0 : options.zoom || 1,
			// zoomCoef: (options.zoomCoef === 0) ? 0 : options.zoomCoef || 1,
			rotation: (options.rotation === 0) ? 0 : options.rotation || 1,
		});
		this._stage.addChild(this._layers[this.layers.length - 1].container);
		return this._layers[this._layers.length - 1];
	}

	public GetLayer(name : string) : ILayer {
		for(let i = 0, len = this._layers.length; i < len; ++i) {
			if (this._layers[i].name === name) {
				return this._layers[i];
			}
		}
		return null;
	}

	public GetLayerIndex(name : string) : number {
		for(let i = 0, len = this._layers.length; i < len; ++i) {
			if (this._layers[i].name === name) {
				return i;
			}
		}
		return null;
	}

	public RemoveLayer(name : string) {
		for (var i = 0, len = this._layers.length; i < len; i++) {
			if (this._layers[i].name === name) {
				this._layers.splice(i, 1);
			}
		}
	}

	public SwapLayer(nameFirstLayer : string, nameSecondLayer : string) {
		const firstLayerIndex = this.GetLayerIndex(nameFirstLayer);
		const secondLayerIndex = this.GetLayerIndex(nameSecondLayer);
		const tempLayer : ILayer = this._layers[firstLayerIndex];
		this._layers[firstLayerIndex] = this._layers[secondLayerIndex];
		this._layers[secondLayerIndex] = tempLayer;
		this._stage.swapChildren(this._layers[firstLayerIndex].container, this._layers[secondLayerIndex].container);
	}

	public RenameLayer(currentName : string, name : string) {
		this.GetLayer(currentName).name = name;
	}

	public Load() {
		super.Load();
		if (this._layers.length <= 0) {
			this.InitDefaultLayer();
		}
		this.engine.GetManager("Render").LoadSceneToViewport(this);
	}

	public Unload() {
		super.Unload();
		for(let i = 0, len = this._layers.length; i < len; ++i) {
			this._layers[i].container.removeChildren();
		}
		Matter.World.clear(this._world, false);
	}
}

export interface ILayer {
	name : string;
	container : PIXI.Container;
	fixed : boolean;
	speed : number;
	// zoom : number;
	// zoomCoef ?: number;
	rotation : number;
}

export interface ILayerOptions {
	fixed ?: boolean;
	speed ?: number;
	// zoom ?: number;
	// zoomCoef ?: number;
	rotation ?: number;
}