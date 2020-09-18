import Component from "../core/Component";
import * as PIXI from "pixi.js";
import Vec from "../utilities/Vec";

export default class Painter extends Component {
	
	private layer : string;

	public position : Vec;
	private scale : Vec;
	private angle : number;

	public graphics : PIXI.Graphics;

	public create() {
		this.position = this.properties["position"] || this.parent.transform.position;
		this.scale = this.properties["scale"] || this.parent.transform.scale;
		this.angle = (this.properties["angle"] === 0) ? 0 : this.properties["angle"] || this.parent.transform.rotation;
		
		this.layer = this.properties["layer"] || "Default";

		this.graphics = new PIXI.Graphics();
	}

	public init() {
		this.graphics.position.x = this.position.x;
		this.graphics.position.y = this.position.y;

		this.graphics.scale = new PIXI.Point(this.scale.x, this.scale.y);

		this.graphics.angle = this.angle;

		this.engine.getManager("Scene").getLoadedScene().getLayer(this.layer).container.addChild(this.graphics);
	}

	public update() {

		// Set sprite position:
		this.position = this.properties["position"] || this.parent.transform.position;
		this.graphics.moveTo(this.position.x, this.position.y);

		// Set sprite scale:
		this.scale = this.properties["scale"] || this.parent.transform.scale;
		this.graphics.scale = new PIXI.Point(this.scale.x, this.scale.y);

		// Set sprite rotation (in degrees):
		this.angle = (this.properties["angle"] === 0) ? 0 : this.properties["angle"] || this.parent.transform.rotation;
		this.graphics.angle = this.angle;
	}

	public unload() {
		(this.engine.getManager("Scene").getLoadedScene().getLayer(this.layer).container as PIXI.Container).removeChild(this.graphics);
	}
}