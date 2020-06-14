import Component from "../../core/Component";
import * as PIXI from "pixi.js";
import SceneManager from "../../managers/SceneManager";
import Vec from "../../utilities/Vec";
import { RigidBody } from "../..";

export default class DebugCollider extends Component {

	private graphics : PIXI.Graphics;

	private position : Vec;
	private scale : Vec;
	private layer : string;

	private color : number;
	private thickness : number;

	private rb;

	// private stretchMode : SpriteMode;

	public Create() {

		this.position = this.properties["position"] || this.parent.transform.position;
		this.scale = this.properties["scale"] || this.parent.transform.scale;

		this.color = this.properties["color"] || 0xFF0000;
		this.thickness = this.properties["thickness"] || 1;

		this.rb = this.properties["body"];

		this.layer = this.properties["layer"] || "Default"; 

		this.graphics = new PIXI.Graphics();

		// this.stretchMode = this.properties["stretchMode"];
	}

	public Init() {
		this.engine.GetManager("Scene").GetLoadedScene().GetLayer(this.layer).container.addChild(this.graphics);
	}

	public Update() {
		this.Draw();
	}

	Draw() {
		this.graphics.clear();
		this.position = this.properties["position"] || this.parent.transform.position;
		this.scale = this.properties["scale"] || this.parent.transform.scale;

		let x1 = this.position.x - this.scale.x / 2;
		let y1 = this.position.y - this.scale.y / 2;

		let x2 = this.position.x + this.scale.x / 2;
		let y2 = this.position.y + this.scale.y / 2;

		for(let i = 0, len = this.rb.body.vertices.length; i < len; ++i) {
			this.graphics.lineTo(this.rb.body.vertices[i].x, this.rb.body.vertices[i].y).lineStyle(this.thickness, this.color);
		}

		this.graphics.lineTo(this.rb.body.vertices[0].x, this.rb.body.vertices[0].y)
	}
}
