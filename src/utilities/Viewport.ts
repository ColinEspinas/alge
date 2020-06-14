import * as PIXI from 'pixi.js';
import Vec from './Vec';
import Entity from '../core/Entity';
import Ease from './Ease';

export default class Viewport extends PIXI.Container {

	protected viewWidth : number;
	protected viewHeight : number;

	protected _stage : PIXI.Container;
	protected stagePosition : Vec;

	protected debugGraphics : PIXI.Graphics;

	get width() { return this.viewWidth; }
	get height() { return this.viewHeight; }
	get center() { return new Vec(this.position.x + this.width / 2, this.position.y + this.height / 2); }

	constructor(options : IViewportOptions) {
		super();
		this.viewWidth = options.width;
		this.viewHeight = options.height;

		this.debugGraphics = new PIXI.Graphics;
	}

	Resize(width : number, height : number) {
		this.viewWidth = width;
		this.viewHeight = height;
	}

	Debug() {
		this.debugGraphics.clear();

		let coords = [
			this.position.x,
			this.position.y,
			this.position.x + this.viewWidth,
			this.position.y + this.viewHeight,
		];

		this.debugGraphics.position = this.position;
		this.debugGraphics.lineStyle(10, 0xFF0000)
						.lineTo(coords[2], coords[1])
						.lineTo(coords[2], coords[3])
						.lineTo(coords[0], coords[3])
						.lineTo(coords[0], coords[1]);
	}

	SetStage(stage : PIXI.Container, debug : boolean) {
		this.removeChildren();
		this.addChild(stage);
		this._stage = stage;
		if (debug) {
			this.addChild(this.debugGraphics);
		}
	}

	get stage() { return this._stage; }
}

export interface IViewportOptions {
	width : number,
	height : number,
}