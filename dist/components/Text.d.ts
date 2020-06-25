import Component from "../core/Component";
import * as PIXI from "pixi.js";
import Vec from "../utilities/Vec";
export default class Text extends Component {
    private content;
    private style;
    private text;
    private layer;
    position: Vec;
    private scale;
    private anchor;
    create(): void;
    init(): void;
    update(): void;
    setText(content: string | number): void;
    setStyle(style: PIXI.TextStyle): void;
    setPosition(pos: Vec): void;
}
