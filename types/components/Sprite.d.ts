import Component from "../core/Component";
import * as PIXI from "pixi.js";
import Vec from "../utilities/Vec";
export default class Sprite extends Component {
    private src;
    private texture;
    sprite: PIXI.Sprite;
    private layer;
    position: Vec;
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
