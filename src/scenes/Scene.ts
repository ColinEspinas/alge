import BaseScene from './BaseScene';
import RenderManager from '../managers/RenderManager';
import * as PIXI from 'pixi.js';
import * as Matter from 'matter-js';

export default class Scene extends BaseScene {

	protected _stage : PIXI.Container = new PIXI.Container();
	protected _world : Matter.World = Matter.World.create({});

	public get stage() : PIXI.Container {
		return this._stage;
	}

	public get world() : Matter.World {
		return this._world;
	}

	public Load() {
		super.Load();
		this.engine.GetManager(RenderManager).LoadSceneToViewport(this);
	}

	public Unload() {
		super.Unload();
		this._stage.removeChildren();
		Matter.World.clear(this._world, false);
	}
}