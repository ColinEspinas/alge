import Component from "../core/Component";
import * as PIXI from "pixi.js";
import PIXISceneManager from "../managers/PIXISceneManager";
import Vec from "../utilities/Vec";
import Tileset from "../utilities/Tileset";
import * as Matter from "matter-js";
import PIXIRenderManager from "../managers/PIXIRenderManager";
import TilemapBody from "../components/TilemapBody";

export default class Tilemap extends Component {
	
	private tileset : Tileset;
	private texture : PIXI.RenderTexture;
	private sprite : PIXI.Sprite;
	private body : TilemapBody;

	private layer : string;

	private map : any[];
	private width : number;
	private height : number;
	private tilesContainer : PIXI.Container;

	private position : Vec;
	private scale : Vec;
	private anchor : Vec;

	public create() {

		this.tileset = this.properties["tileset"];
		this.map = this.properties["map"];

		this.body = this.properties["body"];

		this.width = this.properties["width"];
		this.height = this.properties["height"];

		this.position = this.properties["position"] || this.parent.transform.position;
		this.anchor = this.properties["anchor"] || new Vec(0, 0);
		this.scale = this.properties["scale"] || new Vec(this.width * this.tileset.tileWidth * this.parent.engine.gameScale, this.height * this.tileset.tileHeight * this.parent.engine.gameScale);

		this.layer = this.properties["layer"] || "Default";

		this.sprite = new PIXI.Sprite();

		this.updateTilemap();
	}

	public init() {
		this.engine.getManager("Scene").GetLoadedScene().GetLayer("Default").container.addChild(this.sprite);
		if (this.body) this.body.removeBodiesFromWorld();
		this.updateTilemap();
		if (this.body) this.body.addBodiesToWorld();
	}

	public update() {
		// Render tiles to texture:
		this.engine.getManager("Render").renderer.render(this.tilesContainer, this.texture);
	}

	public updateTilemap() : void {

		this.tilesContainer = new PIXI.Container();
		if (this.body) {
			this.body.bodies.length = 0;
		}

		for (var i = 0, len = this.width * this.height; i < len; i++) {
			const pos = new Vec(
				(i % this.width) * this.tileset.tileWidth,
				Math.floor(i / this.width) * this.tileset.tileHeight
			);
			let tile = PIXI.Sprite.from(this.tileset.getTile(this.map[i]));
			tile.position.x = pos.x;
			tile.position.y = pos.y;
			this.tilesContainer.addChild(tile);
			
			if (this.body) {
				if (this.body.map[i] === 1) {
					this.body.bodies.push(Matter.Bodies.rectangle(
						this.position.x + (pos.x + this.tileset.tileWidth / 2) * this.engine.gameScale,
						this.position.y + (pos.y + this.tileset.tileHeight / 2) * this.engine.gameScale, 
						this.tileset.tileWidth * this.engine.gameScale, 
						this.tileset.tileHeight * this.engine.gameScale, 
						this.body.properties["options"])
					);
					let tileBody = this.body.bodies[this.body.bodies.length - 1];
					tileBody.component = this.body;
					tileBody.tileIndex = i;
				}
			}
		}

		// console.log(this.body);

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

	public replaceTile(index : any, position : Vec) : void {
		this.map[position.x + this.width * position.y] = index;
		this.updateTilemap();
	}
}
