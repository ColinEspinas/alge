import Component from "../core/Component";
import Vec from "../utilities/Vec";
export default class Tilemap extends Component {
    private tileset;
    private texture;
    private sprite;
    private body;
    private layer;
    private map;
    private width;
    private height;
    private tilesContainer;
    private position;
    private scale;
    private anchor;
    create(): void;
    init(): void;
    update(): void;
    updateTilemap(): void;
    replaceTile(index: any, position: Vec): void;
}
