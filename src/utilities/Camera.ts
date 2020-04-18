import { Viewport } from 'pixi-viewport';
import * as PIXI from 'pixi.js';
import Vec from './Vec';
import Entity from '../core/Entity';
import Ease from './Ease';

export default class Camera {
	
	protected viewport : Viewport;

	constructor(viewport : Viewport) {
		this.viewport = viewport;
	}

	public get position() { return new Vec(this.viewport.x, this.viewport.y); }

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
			this.viewport.zoom(amount, false);
		}
		else this.viewport.zoom(amount, true);
	}

	public Move(direction : Vec, speed ?: number) {
		speed = speed || 1;
		this.viewport.center.x -= direction.x * speed;
		this.viewport.center.y -= direction.y * speed;
	}

	public MoveTo(position : Vec) {

	}

	public Follow(e : Entity, options : FollowOptions) : void {
		const point : PIXI.Point = new PIXI.Point(
			options.function(options.time || 1, this.viewport.center.x, e.transform.position.x, options.duration), 
			options.function(options.time || 1, this.viewport.center.y, e.transform.position.y, options.duration)
		);
		this.viewport.moveCenter(point);
	}

	public FollowHorizontal(e : Entity, options : FollowOptions) : void {
		const point : PIXI.Point = new PIXI.Point(
			options.function(options.time || 1, this.viewport.center.x, e.transform.position.x, options.duration), 
			e.transform.position.y
		);
		this.viewport.moveCenter(point);
	}
	
	public FollowVertical(e : Entity, options : FollowOptions) : void {
		const point : PIXI.Point = new PIXI.Point(
			this.viewport.center.x, 
			options.function(options.time || 1, this.viewport.center.y, e.transform.position.y, options.duration)
		);
		this.viewport.moveCenter(point);
	}

	public Shake() : void {

	}
}

export interface FollowOptions {
	function : Function;
	time ?: number;
	duration : number;
}