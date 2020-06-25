import Component from "../core/Component";
import * as Matter from "matter-js";
export default class TilemapBody extends Component {
    protected _map: number[];
    get map(): number[];
    bodies: Matter.Body[];
    protected collisionCallbacks: {
        [event: string]: Function;
    };
    create(): void;
    init(): void;
    update(): void;
    addBodiesToWorld(): void;
    removeBodiesFromWorld(): void;
    debug(): void;
    onCollisionStart(callback: Function): void;
    onCollisionStay(callback: Function): void;
    onCollisionEnd(callback: Function): void;
}
