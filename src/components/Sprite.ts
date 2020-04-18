import Component from "../core/Component";
import * as PIXI from "pixi.js";
import SceneManager from "../managers/SceneManager";
import Vec from "../utilities/Vec";

export default class Sprite extends Component {
	
	private src : string;

	private texture : PIXI.Texture;
	private sprite : PIXI.Sprite;

	private position : Vec;
	private scale : Vec;
	private anchor : Vec;

	// private stretchMode : SpriteMode;

	public Create() {

		if (typeof this.properties["src"] === 'string') {
			this.src = this.properties["src"];
			this.texture = PIXI.Texture.from(this.src);
		}
		else if(this.properties["src"] instanceof PIXI.Texture) {
			this.texture = this.properties["src"];
		}

		this.position = this.properties["position"] || this.parent.transform.position;
		this.anchor = this.properties["anchor"] || new Vec(0.5, 0.5);
		this.scale = this.properties["scale"] || this.parent.transform.scale;

		this.sprite = new PIXI.Sprite();

		// this.stretchMode = this.properties["stretchMode"];
	}

	public Init() {
		this.sprite.position.x = this.position.x;
		this.sprite.position.y = this.position.y;

		this.sprite.width = this.scale.x;
		this.sprite.height = this.scale.y;

		this.sprite.angle = this.parent.transform.rotation;

		this.sprite.anchor.x = this.anchor.x;
		this.sprite.anchor.y = this.anchor.y;

		this.sprite.texture = this.texture;

		this.GetManager(SceneManager).GetLoadedScene().stage.addChild(this.sprite);
	}

	public Update() {

		// Set sprite position:
		this.position = this.properties["position"] || this.parent.transform.position;
		this.sprite.position.x = this.position.x;
		this.sprite.position.y = this.position.y;

		// Set sprite scale:
		this.scale = this.properties["scale"] || this.parent.transform.scale;
		this.sprite.width = this.scale.x;
		this.sprite.height = this.scale.y;

		// Set sprite rotation (in degrees):
		this.sprite.angle = this.parent.transform.rotation;

		// Set anchor point:
		this.sprite.anchor.x = this.anchor.x;
		this.sprite.anchor.y = this.anchor.y;

		this.sprite.texture = this.texture;
	}
}

export enum SpriteMode {
	BestFit = 0,
	Cover = 1,
	Stretch = 2,
	Unscaled = 3,
}
