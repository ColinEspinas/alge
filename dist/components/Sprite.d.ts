import Component from "../core/Component";
export default class Sprite extends Component {
    private src;
    private texture;
    private sprite;
    private layer;
    private position;
    private scale;
    private anchor;
    Create(): void;
    Init(): void;
    Update(): void;
}
export declare enum SpriteMode {
    BestFit = 0,
    Cover = 1,
    Stretch = 2,
    Unscaled = 3
}
