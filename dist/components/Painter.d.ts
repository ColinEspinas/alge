import Component from "../core/Component";
import * as PIXI from "pixi.js";
import Vec from "../utilities/Vec";
export default class Painter extends Component {
    private layer;
    position: Vec;
    private scale;
    private angle;
    graphics: PIXI.Graphics;
    create(): void;
    init(): void;
    update(): void;
    unload(): void;
}
