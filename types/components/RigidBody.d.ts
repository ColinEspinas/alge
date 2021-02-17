import Component from "../core/Component";
import * as Matter from "matter-js";
import Vec from "../utilities/Vec";
export default class RigidBody extends Component {
    protected _body: Matter.Body;
    get body(): any;
    protected collisionCallbacks: {
        [event: string]: Function;
    };
    create(): void;
    init(): void;
    update(): void;
    applyForce(position: Vec, force: Vec): void;
    set velocity(velocity: Vec);
    get velocity(): Vec;
    onCollisionStart(callback: Function): void;
    onCollisionStay(callback: Function): void;
    onCollisionEnd(callback: Function): void;
}
