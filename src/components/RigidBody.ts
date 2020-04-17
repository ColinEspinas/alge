import Component from "../core/Component";
import * as Matter from "matter-js";
import SceneManager from "../managers/SceneManager";
import PhysicManager from "../managers/PhysicsManager";
import Vec from "../utilities/Vec";
import Angle from '../utilities/Angle';
import { Entity } from "..";

export default class RigidBody extends Component {

	protected _body : Matter.Body;
	public get body() { return this._body; }

	protected collisionCallbacks : { [event: string]: Function; } = {};

	public Create() {
		const position : Vec = this.properties["position"] || this.parent.transform.position;
		const scale : Vec = this.properties["scale"] || this.parent.transform.scale;
		const isStatic : boolean = this.properties["static"];
		const bodyOptions : Matter.IBodyDefinition = this.properties["options"];

		this._body = Matter.Bodies.rectangle(position.x, position.y, scale.x, scale.y, bodyOptions);

		this._body.component = this;

		//==== Collision Events : ====//

		Matter.Events.on(this.GetManager(PhysicManager).physicsEngine, 'collisionStart', event => {
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
		
		Matter.Events.on(this.GetManager(PhysicManager).physicsEngine, 'collisionEnd', event => {
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
		
		Matter.Events.on(this.GetManager(PhysicManager).physicsEngine, 'collisionActive', event => {
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

	public Init() {
		Matter.Body.setPosition(this._body, Matter.Vector.create(this.parent.transform.position.x, this.parent.transform.position.y));
		Matter.Body.setAngle(this._body, Angle.DegToRad(this.parent.transform.rotation));

		Matter.World.add(this.GetManager(SceneManager).GetLoadedScene().world, this._body);
	}

	public Update() {
		this.parent.transform.position.x = this.body.position.x;
		this.parent.transform.position.y = this.body.position.y;
		this.parent.transform.rotation = Angle.RadToDeg(this.body.angle);
	}

	public ApplyForce(position : Vec, force : Vec) : void {
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

	public OnCollisionStart(callback : Function) : void {
		this.collisionCallbacks['collisionStart'] = callback;
	}

	public OnCollisionStay(callback : Function) : void {
		this.collisionCallbacks['collisionActive'] = callback;
	}

	public OnCollisionEnd(callback : Function) : void {
		this.collisionCallbacks['collisionEnd'] = callback;
	}
}