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
    Create(): void;
    Init(): void;
    Update(): void;
    SetText(content: string | number): void;
    SetStyle(style: PIXI.TextStyle): void;
    SetPosition(pos: Vec): void;
}
