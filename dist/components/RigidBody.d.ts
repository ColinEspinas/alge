import Component from "../core/Component";
import * as Matter from "matter-js";
import Vec from "../utilities/Vec";
export default class RigidBody extends Component {
    protected _body: Matter.Body;
    Create(): void;
    get body(): Matter.Body;
    Init(): void;
    Update(): void;
    ApplyForce(position: Vec, force: Vec): void;
    set velocity(velocity: Vec);
    get velocity(): Vec;
}
