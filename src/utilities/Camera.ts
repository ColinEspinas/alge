import { Viewport } from 'pixi-viewport';
import * as PIXI from 'pixi.js';
import Vec from './Vec';
import Entity from '../core/Entity';
import Ease from './Ease';
import TimeManager from '../managers/TimeManager';
import Noise from './Noise';
import RenderManager from '../managers/RenderManager';

export default class Camera {
	
	protected viewport : Viewport;
	protected deltaTime : number;

	protected _target : ITarget;

	protected trauma : number = 0;
	protected traumaPower : number = 2;
	protected traumaDecay : number = 0.8;
	protected maxShakeOffset : Vec = new Vec(100, 75);
	protected maxShakeRoll : number = 10;

	constructor(viewport : Viewport) {
		this.viewport = viewport;
		// this.CenterPivot();
	}

	public set target(target : ITarget) { this._target = target; }
	public get target() { return this._target; }

	public get position() { return new Vec(this.viewport.center.x, this.viewport.center.y); }
	public set position(position : Vec) { this.viewport.center = new PIXI.Point(position.x, position.y); }

	public WorldToCamera(position : Vec) : Vec {
		const point = this.viewport.toLocal(new PIXI.Point(position.x, position.y));
		return new Vec(point.x, point.y);
	}

	public CameraToWorld(position : Vec) : Vec {
		const point = this.viewport.toGlobal(new PIXI.Point(position.x, position.y));
		return new Vec(point.x, point.y);
	}

	public Zoom(amount : number, position ?: Vec) : void {
		if (position) {
			this.viewport.moveCenter(new PIXI.Point(position.x, position.y));
			this.viewport.setZoom(amount, false);
		}
		else this.viewport.setZoom(amount, true);
	}

	// public CenterPivot() {

	// 	this.viewport.pivot = this.viewport.center;

	// 	this.viewport.x = -this.viewport.pivot.x;
	// 	this.viewport.y = -this.viewport.pivot.y;

	// 	const debug = new PIXI.Graphics();

	// 	// Set the fill color
	// 	debug.beginFill(0xe74c3c); // Red

	// 	// Draw a circle
	// 	debug.drawCircle(this.viewport.pivot.x, this.viewport.pivot.y, 10); // drawCircle(x, y, radius)

	// 	// Applies fill to lines and shapes since the last call to beginFill.
	// 	debug.endFill();

	// 	this.viewport.addChild(debug);
	// }

	public Move(direction : Vec, speed ?: number) {
		speed = speed || 1;
		this.viewport.x -= direction.x * speed * this.deltaTime * 100;
		this.viewport.y -= direction.y * speed * this.deltaTime * 100;
	}

	public MoveTo(position : Vec, options : IMoveOptions) : void {
		const tolerance = options.tolerance || 0.5;
		if (position.Distance(this.position) > tolerance) {
			const point : PIXI.Point = new PIXI.Point(
				Math.floor(Ease.lerp(this.viewport.center.x, position.x, options.duration * (this.deltaTime * 100))), 
				Math.floor(Ease.lerp(this.viewport.center.y, position.y, options.duration * (this.deltaTime * 100)))
			);
			this.viewport.moveCenter(point);
		}
	}

	public MoveToHorizontal(position : Vec, options : IMoveOptions) : void {
		const tolerance = options.tolerance || 0.5;
		if (position.Distance(this.position) > tolerance) {
			const point : PIXI.Point = new PIXI.Point(
				Math.floor(Ease.lerp(this.viewport.center.x, position.x, options.duration * (this.deltaTime * 100))), 
				this.viewport.center.y,
			);
			this.viewport.moveCenter(point);
		}
	}
	
	public MoveToVertical(position : Vec, options : IMoveOptions) : void {
		const tolerance = options.tolerance || 0.5;
		if (position.Distance(this.position) > tolerance) {
			const point : PIXI.Point = new PIXI.Point(
				this.viewport.center.x, 
				Math.floor(Ease.lerp(this.viewport.center.y, position.y, options.duration * (this.deltaTime * 100)))
			);
			this.viewport.moveCenter(point);
		}
	}

	public AddTrauma(amount : number) : void {
		this.trauma = Math.min(this.trauma + amount, 1);
	}

	protected Shake() : void {
		const amount = Math.pow(this.trauma, this.traumaPower);
		// Waiting for viewport centered pivot solution:
		// this.viewport.angle = this.maxShakeRoll * amount * Math.random();
		const shakeOffset = new Vec(
			this.maxShakeOffset.x * amount * ((Math.random() * 2) - 1),
			this.maxShakeOffset.y * amount * ((Math.random() * 2) - 1)
		);
		this.viewport.moveCenter(this.viewport.center.x + shakeOffset.x, this.viewport.center.y + shakeOffset.y);
	}

	public Update(deltaTime : number) : void {
		this.deltaTime = deltaTime;

		if (this._target && this._target.position && this._target.position instanceof Vec) {
			if (this.target.horizontal && this.target.vertical) {
				this.MoveTo(this.target.position, this.target.options);
			}
			else if (this.target.horizontal) {
				this.MoveToHorizontal(this.target.position, this.target.options);
			}
			else if (this.target.vertical) {
				this.MoveToVertical(this.target.position, this.target.options);
			}
		}
		if (this._target && this._target.entity && this._target.entity instanceof Entity) {
			if (this.target.horizontal && this.target.vertical) {
				this.MoveTo(this.target.entity.transform.position, this.target.options);
			}
			else if (this.target.horizontal) {
				this.MoveToHorizontal(this.target.entity.transform.position, this.target.options);
			}
			else if (this.target.vertical) {
				this.MoveToVertical(this.target.entity.transform.position, this.target.options);
			}
		}
		if (this.trauma > 0) {
			this.trauma = Math.max(this.trauma - this.traumaDecay * this.deltaTime, 0);
			this.Shake();
		}
	}
}

export interface IMoveOptions {
	time ?: number;
	tolerance ?: number;
	duration : number;
}

export interface ITarget {
	entity ?: Entity;
	position ?: Vec;
	vertical : boolean;
	horizontal : boolean;
	options : IMoveOptions;
}