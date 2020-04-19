import Component from "../core/Component";
import * as PIXI from "pixi.js";
import SceneManager from "../managers/SceneManager";
import Vec from "../utilities/Vec";
import Tileset from "../utilities/Tileset";
import RenderManager from "../managers/RenderManager";

export default class Tilemap extends Component {
	
	private tileset : Tileset;
	private texture : PIXI.RenderTexture;
	private sprite : PIXI.Sprite;

	private map : any[];
	private width : number;
	private height : number;
	private tilesContainer : PIXI.Container;

	private position : Vec;
	private scale : Vec;
	private anchor : Vec;

	public Create() {

		this.tileset = this.properties["tileset"];
		this.map = this.properties["map"];

		this.width = this.properties["width"];
		this.height = this.properties["height"];

		this.position = this.properties["position"] || this.parent.transform.position;
		this.anchor = this.properties["anchor"] || new Vec(0.5, 0.5);
		this.scale = this.properties["scale"] || new Vec(this.width * this.tileset.tileWidth, this.height * this.tileset.tileHeight);

		this.sprite = new PIXI.Sprite();

		this.UpdateTilemap();
	}

	public Init() {
		this.GetManager(SceneManager).GetLoadedScene().stage.addChild(this.sprite);
	}

	public Update() {
		// Render tiles to texture:
		this.GetManager(RenderManager).renderer.render(this.tilesContainer, this.texture);
	}

	public UpdateTilemap() : void {
		this.tilesContainer = new PIXI.Container();
		
		for (var i = 0, len = this.width * this.height; i < len; i++) {
			let tile = PIXI.Sprite.from(this.tileset.GetTile(this.map[i]));
			tile.position.x = (i % this.width) * this.tileset.tileWidth;
			tile.position.y = Math.floor(i / this.width) * this.tileset.tileHeight;
			this.tilesContainer.addChild(tile);
		}

		this.texture = new PIXI.RenderTexture(
			new PIXI.BaseRenderTexture({
				width: this.width * this.tileset.tileWidth, 
				height: this.height * this.tileset.tileHeight,
				resolution: 1,
				scaleMode: (this.parent.engine.scaleMode == "linear") ? PIXI.SCALE_MODES.LINEAR : PIXI.SCALE_MODES.NEAREST,
			})
		);

		// Set sprite position:
		this.sprite.position.x = this.position.x;
		this.sprite.position.y = this.position.y;

		// Set sprite scale:
		this.sprite.width = this.scale.x;
		this.sprite.height = this.scale.y;
		this.parent.transform.scale = this.scale;

		// Set sprite rotation (in degrees):
		this.sprite.angle = this.parent.transform.rotation;

		// Set anchor point:
		this.sprite.anchor.x = this.anchor.x;
		this.sprite.anchor.y = this.anchor.y;

		this.sprite.texture = this.texture;
	}

	public ReplaceTile(index : any, position : Vec) : void {
		this.map[position.x + this.width * position.y] = index;
		this.UpdateTilemap();
	}
}
