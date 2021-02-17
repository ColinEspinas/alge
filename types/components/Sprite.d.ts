import Component from "../core/Component";
import Vec from "../utilities/Vec";
export default class Sprite extends Component {
    private src;
    private texture;
    private sprite;
    private layer;
    position: Vec;
    z: any;
    private scale;
    private anchor;
    private angle;
    create(): void;
    init(): void;
    update(): void;
    unload(): void;
}
export declare enum SpriteMode {
    BestFit = 0,
    Cover = 1,
    Stretch = 2,
    Unscaled = 3
}
