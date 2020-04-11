import Component from "../core/Component";
import Entity from "../core/Entity";
export default class SpriteRenderer extends Component {
    protected _name: string;
    image: string;
    scale: number;
    private texture;
    private shape;
    private stretchMode;
    constructor(parent: Entity, name: string, image: string, stretchMode: SpriteMode);
    Init(): void;
    Update(): void;
    Unload(): void;
}
export declare enum SpriteMode {
    BestFit = 0,
    Cover = 1,
    Stretch = 2,
    Unscaled = 3
}
