import Component from "../core/Component";
import * as Matter from "matter-js";
import Vec from "../utilities/Vec";
export default class RigidBody extends Component {
    protected _body: Matter.Body;
    get body(): any;
    protected collisionCallbacks: {
        [event: string]: Function;
    };
    Create(): void;
    Init(): void;
    Update(): void;
    ApplyForce(position: Vec, force: Vec): void;
    set velocity(velocity: Vec);
    get velocity(): Vec;
    OnCollisionStart(callback: Function): void;
    OnCollisionStay(callback: Function): void;
    OnCollisionEnd(callback: Function): void;
}
