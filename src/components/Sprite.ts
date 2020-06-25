import Component from "../core/Component";
import * as PIXI from "pixi.js";
import PIXISceneManager from "../managers/PIXISceneManager";
import Vec from "../utilities/Vec";

export default class Sprite extends Component {
	
	private src : string;

	private texture : PIXI.Texture;
	private sprite : PIXI.Sprite;
	private layer : string;

	public position : Vec;z
	private scale : Vec;
	private anchor : Vec;
	private angle : number;

	// private stretchMode : SpriteMode;

	public create() {

		if (typeof this.properties["src"] === 'string') {
			this.src = this.properties["src"];
			this.texture = PIXI.Texture.from(this.src);
		}
		else if(this.properties["src"] instanceof PIXI.Texture) {
			this.texture = this.properties["src"];
		}

		this.texture.baseTexture.scaleMode = this.properties["scaleMode"] || PIXI.SCALE_MODES.NEAREST;

		this.position = this.properties["position"] || this.parent.transform.position;
		this.anchor = this.properties["anchor"] || new Vec(0.5, 0.5);
		this.scale = this.properties["scale"] || this.parent.transform.scale;
		this.angle = (this.properties["angle"] === 0) ? 0 : this.properties["angle"] || this.parent.transform.rotation;
		
		this.layer = this.properties["layer"] || "Default";

		this.sprite = new PIXI.Sprite();

		// this.stretchMode = this.properties["stretchMode"];
	}

	public init() {
		this.sprite.position.x = this.position.x;
		this.sprite.position.y = this.position.y;

		this.sprite.width = this.scale.x;
		this.sprite.height = this.scale.y;

		this.sprite.angle = this.angle;

		this.sprite.anchor.x = this.anchor.x;
		this.sprite.anchor.y = this.anchor.y;

		this.sprite.texture = this.texture;

		this.engine.getManager("Scene").getLoadedScene().getLayer(this.layer).container.addChild(this.sprite);
	}

	public update() {

		// Set sprite position:
		
		this.position = this.properties["position"] || this.parent.transform.position;
		this.sprite.position.x = this.position.x;
		this.sprite.position.y = this.position.y;

		// Set sprite scale:
		this.scale = this.properties["scale"] || this.parent.transform.scale;
		this.sprite.width = this.scale.x;
		this.sprite.height = this.scale.y;

		// Set sprite rotation (in degrees):
		this.angle = (this.properties["angle"] === 0) ? 0 : this.properties["angle"] || this.parent.transform.rotation;
		this.sprite.angle = this.angle;

		// Set anchor point:
		this.sprite.anchor.x = this.anchor.x;
		this.sprite.anchor.y = this.anchor.y;

		this.sprite.texture = this.texture;
	}

	public unload() {
		(this.engine.getManager("Scene").getLoadedScene().getLayer(this.layer).container as PIXI.Container).removeChild(this.sprite);
	}
}

export enum SpriteMode {
	BestFit = 0,
	Cover = 1,
	Stretch = 2,
	Unscaled = 3,
}
