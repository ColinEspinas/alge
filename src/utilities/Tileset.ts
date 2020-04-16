import * as PIXI from "pixi.js";
import Vec from "./Vec";

export default class Tileset {
	
	private src : string;

	private baseTexture : PIXI.BaseTexture;
	private _tiles : PIXI.Texture[];

	private alias : Object = {};

	private size : Vec;
	private tileSize : Vec;

	public get tiles() { return this._tiles; }

	public constructor(src : string, width : number, height : number, tileWidth : number, tileHeight : number) {
		this.src = src;

		this.size = new Vec(width, height);

		this.tileSize = new Vec(tileWidth, tileHeight);

		this.baseTexture = PIXI.BaseTexture.from(this.src);
		this._tiles = [];
		
		for (var y = 0, yMax = this.size.y; y < yMax; y++) {
			for (var x = 0, xMax = this.size.x; x < xMax; x++) {
				this._tiles.push(new PIXI.Texture(
					this.baseTexture, 
					new PIXI.Rectangle(
						x * this.tileSize.x,
						y * this.tileSize.y,
						this.tileSize.x, 
						this.tileSize.y
					)
				));
			}
		}
	}

	/**
	 * Give an alias to a tile index
	 * @param index Index the alias is going to point to
	 * @param name Name of the alias
	 */
	public SetAlias(index : number, name : string) {
		if (index >= 0 && name && name !== '')
			this.alias[name] = index;
	}

	/**
	 * Get a tile from the tileset
	 * @param tile Tile index or name
	 */
	public GetTile(tile : any) {
		if (typeof tile === 'number') {
			return this.tiles[tile];
		}
		if (typeof tile === 'string') {
			return this.tiles[this.alias[tile]];
		}
	}
}