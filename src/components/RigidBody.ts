import Component from "../core/Component";
import * as Matter from "matter-js";
import PIXISceneManager from "../managers/PIXISceneManager";
import PMPhysicManager from "../managers/PMPhysicsManager";
import Vec from "../utilities/Vec";
import Angle from '../utilities/Angle';
import { Entity } from "..";

export default class RigidBody extends Component {

	protected _body : Matter.Body;
	public get body() { return this._body; }

	protected collisionCallbacks : { [event: string]: Function; } = {};

	public create() {
		const position : Vec = this.properties["position"] || this.parent.transform.position;
		const scale : Vec = this.properties["scale"] || this.parent.transform.scale;
		const isStatic : boolean = this.properties["static"];
		const bodyOptions : Matter.IBodyDefinition = this.properties["options"];

		this._body = Matter.Bodies.rectangle(position.x, position.y, scale.x, scale.y, bodyOptions);

		this._body.component = this;

		//==== Collision Events : ====//

		Matter.Events.on(this.engine.getManager("Physics").physicsEngine, 'collisionStart', event => {
			var pairs = event.pairs;
			for (var i = 0, len = pairs.length; i < len; ++i) {
				const pair = pairs[i];
				if (pair.bodyA === this._body && this.collisionCallbacks['collisionStart']) {
					this.collisionCallbacks['collisionStart'](pair.bodyB);
				}
				else if (pair.bodyB === this._body && this.collisionCallbacks['collisionStart']) {
					this.collisionCallbacks['collisionStart'](pair.bodyA);
				}
			}
		});
		
		Matter.Events.on(this.engine.getManager("Physics").physicsEngine, 'collisionEnd', event => {
			var pairs = event.pairs;
			for (var i = 0, len = pairs.length; i < len; ++i) {
				const pair = pairs[i];
				if (pair.bodyA === this._body && this.collisionCallbacks['collisionEnd']) {
					this.collisionCallbacks['collisionEnd'](pair.bodyB);
				}
				else if (pair.bodyB === this._body && this.collisionCallbacks['collisionEnd']) {
					this.collisionCallbacks['collisionEnd'](pair.bodyA);
				}
			}
		});
		
		Matter.Events.on(this.engine.getManager("Physics").physicsEngine, 'collisionActive', event => {
			var pairs = event.pairs;
			for (var i = 0, len = pairs.length; i < len; ++i) {
				const pair = pairs[i];
				if (pair.bodyA === this._body && this.collisionCallbacks['collisionActive']) {
					this.collisionCallbacks['collisionActive'](pair.bodyB);
				}
				else if (pair.bodyB === this._body && this.collisionCallbacks['collisionActive']) {
					this.collisionCallbacks['collisionActive'](pair.bodyA);
				}
			}
		});
	}

	public init() {
		Matter.Body.setPosition(this._body, Matter.Vector.create(this.parent.transform.position.x, this.parent.transform.position.y));
		Matter.Body.setAngle(this._body, Angle.degToRad(this.parent.transform.rotation));

		Matter.World.add(this.engine.getManager("Scene").GetLoadedScene().world, this._body);
	}

	public update() {
		this.parent.transform.position.x = this.body.position.x;
		this.parent.transform.position.y = this.body.position.y;
		// Matter.Body.scale(this.body, this.parent.transform.scale.x, this.parent.transform.scale.x);
		this.parent.transform.rotation = Math.floor(Angle.radToDeg(this.body.angle));
	}

	public applyForce(position : Vec, force : Vec) : void {
		Matter.Body.applyForce(this._body, 
			Matter.Vector.create(position.x, position.y), 
			Matter.Vector.create(force.x, force.y)
		);
	}

	public set velocity(velocity : Vec) {
		Matter.Body.setVelocity(this._body, Matter.Vector.create(velocity.x, velocity.y));
	}

	public get velocity() : Vec {
		return new Vec(this._body.velocity.x, this._body.velocity.y);
	}

	public onCollisionStart(callback : Function) : void {
		this.collisionCallbacks['collisionStart'] = callback;
	}

	public onCollisionStay(callback : Function) : void {
		this.collisionCallbacks['collisionActive'] = callback;
	}

	public onCollisionEnd(callback : Function) : void {
		this.collisionCallbacks['collisionEnd'] = callback;
	}
}