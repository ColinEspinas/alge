import Component from "../../core/Component";
import * as PIXI from "pixi.js";
import PIXISceneManager from "../../managers/PIXISceneManager";
import Vec from "../../utilities/Vec";
import { RigidBody } from "../..";

export default class DebugCollider extends Component {

	private graphics : PIXI.Graphics;

	private position : Vec;
	private scale : Vec;
	private layer : string;

	private color : number;
	private thickness : number;

	private body;

	public create() {

		this.position = this.properties["position"] || this.parent.transform.position;
		this.scale = this.properties["scale"] || this.parent.transform.scale;

		this.color = this.properties["color"] || 0xFF0000;
		this.thickness = this.properties["thickness"] || 1;

		this.body = this.properties["body"];

		this.layer = this.properties["layer"] || "Default"; 

		this.graphics = new PIXI.Graphics();
	}

	public init() {
		this.engine.getManager("Scene").GetLoadedScene().GetLayer(this.layer).container.addChild(this.graphics);
	}

	public update() {
		this.draw();
	}

	protected draw() {
		this.graphics.clear();
		this.position = this.properties["position"] || this.parent.transform.position;
		this.scale = this.properties["scale"] || this.parent.transform.scale;

		for(let i = 0, len = this.body.vertices.length; i < len; ++i) {
			this.graphics.lineTo(this.body.vertices[i].x, this.body.vertices[i].y).lineStyle(this.thickness, this.color);
		}

		this.graphics.lineTo(this.body.vertices[0].x, this.body.vertices[0].y);
	}
}
