import Component from "../core/Component";
import * as Matter from "matter-js";
import PIXISceneManager from "../managers/PIXISceneManager";
import PMPhysicManager from "../managers/PMPhysicsManager";
import Vec from "../utilities/Vec";
import Angle from '../utilities/Angle';
import RigidBody from "./RigidBody";
import DebugCollider from "./Debug/DebugCollider";

export default class TilemapBody extends Component {

	protected _map : number[];
	get map() { return this._map; }

	public bodies : Matter.Body[] = [];

	protected collisionCallbacks : { [event: string]: Function; } = {};

	public create() {

		this._map = this.properties["map"];
		const bodyOptions : Matter.IBodyDefinition = this.properties["options"];
		// this._body = Matter.Bodies.rectangle(position.x, position.y, scale.x, scale.y, bodyOptions);

		// this._body.component = this;

		//==== Collision Events : ====//

		Matter.Events.on(this.engine.getManager("Physics").physicsEngine, 'collisionStart', event => {
			var pairs = event.pairs;
			for (var i = 0, len = pairs.length; i < len; ++i) {
				const pair = pairs[i];
				for (let j = 0, count = this.bodies.length; j < count; ++j) {
					if (pair.bodyA === this.bodies[j] && this.collisionCallbacks['collisionStart']) {
						this.collisionCallbacks['collisionStart'](this.bodies[j], pair.bodyB);
					}
					else if (pair.bodyB === this.bodies[j] && this.collisionCallbacks['collisionStart']) {
						this.collisionCallbacks['collisionStart'](this.bodies[j], pair.bodyA);
					}
				}
			}
		});
		
		Matter.Events.on(this.engine.getManager("Physics").physicsEngine, 'collisionEnd', event => {
			var pairs = event.pairs;
			for (var i = 0, len = pairs.length; i < len; ++i) {
				const pair = pairs[i];
				for (let j = 0, count = this.bodies.length; j < count; ++j) {
					if (pair.bodyA === this.bodies[j] && this.collisionCallbacks['collisionEnd']) {
						this.collisionCallbacks['collisionEnd'](this.bodies[j], pair.bodyB);
					}
					else if (pair.bodyB === this.bodies[j] && this.collisionCallbacks['collisionEnd']) {
						this.collisionCallbacks['collisionEnd'](this.bodies[j], pair.bodyA);
					}
				}
			}
		});
		
		Matter.Events.on(this.engine.getManager("Physics").physicsEngine, 'collisionActive', event => {
			var pairs = event.pairs;
			for (var i = 0, len = pairs.length; i < len; ++i) {
				const pair = pairs[i];
				for (let j = 0, count = this.bodies.length; j < count; ++j) {
					if (pair.bodyA === this.bodies[j] && this.collisionCallbacks['collisionActive']) {
						this.collisionCallbacks['collisionActive'](this.bodies[j], pair.bodyB);
					}
					else if (pair.bodyB === this.bodies[j] && this.collisionCallbacks['collisionActive']) {
						this.collisionCallbacks['collisionActive'](this.bodies[j], pair.bodyA);
					}
				}
			}
		});
	}

	public init() {
		this.addBodiesToWorld();
	}

	public update() {
		// this.parent.transform.position.x = this.body.position.x;
		// this.parent.transform.position.y = this.body.position.y;
		// // Matter.Body.scale(this.body, this.parent.transform.scale.x, this.parent.transform.scale.x);
		// this.parent.transform.rotation = Math.floor(Angle.RadToDeg(this.body.angle));
	}

	public addBodiesToWorld() {
		for(let i = 0, len = this.bodies.length; i < len; ++i) {
			Matter.World.add(this.engine.getManager("Scene").GetLoadedScene().world, this.bodies[i]);
		}
	}

	public removeBodiesFromWorld() {
		for(let i = 0, len = this.bodies.length; i < len; ++i) {
			Matter.World.remove(this.engine.getManager("Scene").GetLoadedScene().world, this.bodies[i]);
		}
	}

	public debug() {
		for(let i = 0, len = this.bodies.length; i < len; ++i) {
			this.parent.addComponent(new DebugCollider(this.parent, "DebugCollider" + i, {
				body: this.bodies[i],
				thickness: 5,
			}));
		}
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