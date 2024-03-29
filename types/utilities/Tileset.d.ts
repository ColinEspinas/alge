import * as PIXI from "pixi.js";
export default class Tileset {
    private src;
    private baseTexture;
    private _tiles;
    private alias;
    private size;
    private tileSize;
    get tiles(): PIXI.Texture[];
    get tileWidth(): number;
    get tileHeight(): number;
    constructor(src: string, width: number, height: number, tileWidth: number, tileHeight: number);
    /**
     * Give an alias to a tile index
     * @param index Index the alias is going to point to
     * @param name Name of the alias
     */
    setAlias(index: number, name: string): void;
    /**
     * Get a tile from the tileset
     * @param tile Tile index or name
     */
    getTile(tile: any): PIXI.Texture;
}
