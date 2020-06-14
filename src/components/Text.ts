import Component from "../core/Component";
import * as PIXI from "pixi.js";
import Vec from "../utilities/Vec";

export default class Text extends Component {
	
	private content : string;
	private style : PIXI.TextStyle;

	private text : PIXI.Text;

	private layer : string;

	public position : Vec;
	private scale : Vec;
	private anchor : Vec;

	public Create() {
		this.content = this.properties["content"];
		this.style = this.properties["style"];

		this.position = this.properties["position"] || this.parent.transform.position;
		this.anchor = this.properties["anchor"] || new Vec(0, 0);
		this.scale = this.properties["scale"];

		this.layer = this.properties["layer"] || "Default";

		this.text = new PIXI.Text(this.content, this.style);
	}

	public Init() {
		this.text.position.x = this.position.x;
		this.text.position.y = this.position.y;

		if (this.scale) {
			this.text.width = this.scale.x;
			this.text.height = this.scale.y;
		}

		this.text.angle = this.parent.transform.rotation;

		this.text.anchor.x = this.anchor.x;
		this.text.anchor.y = this.anchor.y;

		this.text.text = this.content;
		this.text.style = this.style;

		this.engine.GetManager("Scene").GetLoadedScene().GetLayer(this.layer).container.addChild(this.text);
	}

	public Update() {

		// Set text position:
		this.position = this.properties["position"] || this.parent.transform.position;
		this.text.position.x = this.position.x;
		this.text.position.y = this.position.y;

		// Set text scale:
		this.scale = this.properties["scale"];
		if (this.scale) {
			this.text.width = this.scale.x;
			this.text.height = this.scale.y;
		}

		// Set text rotation (in degrees):
		this.text.angle = this.parent.transform.rotation;

		// Set anchor point:
		this.text.anchor.x = this.anchor.x;
		this.text.anchor.y = this.anchor.y;

		// Set text content:
		this.text.text = this.content;

		// Set text style:
		this.text.style = this.style;
	}

	public SetText(content : string | number) {
		this.content = content.toString();
	}

	public SetStyle(style : PIXI.TextStyle) {
		this.style = style;
	}
	
	public SetPosition(pos : Vec) {
		this.properties["position"] = pos;
	}
}