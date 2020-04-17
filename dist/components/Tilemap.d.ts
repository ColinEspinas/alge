import Component from "../core/Component";
import Vec from "../utilities/Vec";
export default class Tilemap extends Component {
    private tileset;
    private texture;
    private sprite;
    private map;
    private width;
    private height;
    private tilesContainer;
    private position;
    private scale;
    private anchor;
    Create(): void;
    Init(): void;
    Update(): void;
    UpdateTilemap(): void;
    ReplaceTile(index: any, position: Vec): void;
}
