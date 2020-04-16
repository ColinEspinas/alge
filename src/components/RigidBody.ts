import Component from "../core/Component";
import * as Matter from "matter-js";
import SceneManager from "../managers/SceneManager";
import Vec from "../utilities/Vec";
import Angle from '../utilities/Angle';

export default class RigidBody extends Component {

	protected _body : Matter.Body;

	public Create() {
		const position : Vec = this.properties["position"] || this.parent.transform.position;
		const scale : Vec = this.properties["scale"] || this.parent.transform.scale;
		const isStatic : boolean = this.properties["static"];
		const bodyOptions : Matter.IBodyDefinition = this.properties["options"];

		this._body = Matter.Bodies.rectangle(position.x, position.y, scale.x, scale.y, bodyOptions);
	}

	public get body() { return this._body; }

	public Init() {
		Matter.World.add(this.GetManager(SceneManager).GetLoadedScene().world, this._body)

		this.parent.transform.position.x = this.body.position.x;
		this.parent.transform.position.y = this.body.position.y;
		this.parent.transform.rotation = Angle.RadToDeg(this.body.angle);
	}

	public Update() {
		this.parent.transform.position.x = this.body.position.x;
		this.parent.transform.position.y = this.body.position.y;
		this.parent.transform.rotation = Angle.RadToDeg(this.body.angle);
	}

	public ApplyForce(position : Vec, force : Vec) {
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
}