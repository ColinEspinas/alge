import Component from "../core/Component";
export default class SpriteRenderer extends Component {
    protected _name: string;
    image: string;
    scale: number;
    private texture;
    private shape;
    private stretchMode;
    Create(): void;
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
