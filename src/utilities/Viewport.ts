import * as PIXI from 'pixi.js';
import Vec from './Vec';
import Entity from '../core/Entity';
import Ease from './Ease';

export default class Viewport extends PIXI.Container {

	protected _viewWidth : number;
	protected _viewHeight : number;

	protected _stage : PIXI.Container;
	protected stagePosition : Vec;

	protected debugGraphics : PIXI.Graphics;

	public get viewWidth () { return this._viewWidth; }
	public get viewHeight() { return this._viewHeight; }
	public get center() { return new Vec(this.position.x + this.width / 2, this.position.y + this.height / 2); }

	constructor(options : IViewportOptions) {
		super();
		this._viewHeight = options.width;
		this._viewHeight = options.height;

		this.debugGraphics = new PIXI.Graphics;
	}

	public resize(width : number, height : number) {
		this._viewHeight = width;
		this._viewHeight = height;
	}

	public debug() {
		this.debugGraphics.clear();

		let coords = [
			this.position.x,
			this.position.y,
			this.position.x + this._viewHeight,
			this.position.y + this._viewHeight,
		];

		this.debugGraphics.position = this.position;
		this.debugGraphics.lineStyle(10, 0xFF0000)
						.lineTo(coords[2], coords[1])
						.lineTo(coords[2], coords[3])
						.lineTo(coords[0], coords[3])
						.lineTo(coords[0], coords[1]);
	}

	public setStage(stage : PIXI.Container, debug : boolean) {
		this.removeChildren();
		this.addChild(stage);
		this._stage = stage;
		if (debug) {
			this.addChild(this.debugGraphics);
		}
	}

	public get stage() { return this._stage; }
}

export interface IViewportOptions {
	width : number,
	height : number,
}