import BaseScene from './BaseScene';
import PIXIRenderManager from '../managers/PIXIRenderManager';
import * as PIXI from 'pixi.js';
import * as Matter from 'matter-js';
import Vec from '../utilities/Vec';

export default class PIXIMatterScene extends BaseScene {

	protected _stage : PIXI.Container = new PIXI.Container();
	protected _layers : ILayer[] = [];

	protected _world : Matter.World = Matter.World.create({});

	public get stage() : PIXI.Container { return this._stage; }
	public get world() : Matter.World { return this._world; }
	public get gravity() { return this.world.gravity; }
	public set gravity(value : number) { this.world.gravity = value; }
	public get layers() : ILayer[] { return this._layers; }

	public initDefaultLayer() {
		this.addLayer("Default");
		this.addLayer("Debug", { fixed: true, rotation: 0 });
	}

	public addLayer(name : string, options ?: ILayerOptions) : ILayer {
		options = options || {};
		this._layers.push({
			name: name,
			container: new PIXI.Container(),
			fixed: options.fixed || false,
			speed: options.speed || Vec.one(),
			rotation: (options.rotation === 0) ? 0 : options.rotation || 1,
		});
		this._stage.addChild(this._layers[this.layers.length - 1].container);
		return this._layers[this._layers.length - 1];
	}

	public getLayer(name : string) : ILayer {
		for(let i = 0, len = this._layers.length; i < len; ++i) {
			if (this._layers[i].name === name) {
				return this._layers[i];
			}
		}
		return null;
	}

	public getLayerIndex(name : string) : number {
		for(let i = 0, len = this._layers.length; i < len; ++i) {
			if (this._layers[i].name === name) {
				return i;
			}
		}
		return null;
	}

	public removeLayer(name : string) {
		for (var i = 0, len = this._layers.length; i < len; i++) {
			if (this._layers[i].name === name) {
				this._layers.splice(i, 1);
			}
		}
	}

	public swapLayer(nameFirstLayer : string, nameSecondLayer : string) {
		const firstLayerIndex = this.getLayerIndex(nameFirstLayer);
		const secondLayerIndex = this.getLayerIndex(nameSecondLayer);
		const tempLayer : ILayer = this._layers[firstLayerIndex];
		this._layers[firstLayerIndex] = this._layers[secondLayerIndex];
		this._layers[secondLayerIndex] = tempLayer;
		this._stage.swapChildren(this._layers[firstLayerIndex].container, this._layers[secondLayerIndex].container);
	}

	public renameLayer(currentName : string, name : string) {
		this.getLayer(currentName).name = name;
	}

	public load() {
		super.load();
		if (this._layers.length <= 0) {
			this.initDefaultLayer();
		}
		this.engine.getManager("Render").loadSceneToViewport(this);
	}

	public unload() {
		super.unload();
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
	speed : Vec;
	rotation : number;
}

export interface ILayerOptions {
	fixed ?: boolean;
	speed ?: Vec;
	rotation ?: number;
}