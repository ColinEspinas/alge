import BaseScene from './BaseScene';
import * as PIXI from 'pixi.js';
import * as Matter from 'matter-js';

export default class Scene extends BaseScene {

	protected _container : PIXI.Container = new PIXI.Container();
	protected _world : Matter.World = Matter.World.create({});

	public get container() : PIXI.Container {
		return this._container;
	}

	public get world() : Matter.World {
		return this._world;
	}

	public Unload() {
		super.Unload();
		this._container.removeChildren();
		Matter.World.clear(this._world, false);
	}
}