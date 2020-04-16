import Entity from "./Entity";
import Engine from "./Engine";
export default abstract class Component {
    protected parent: Entity;
    protected _name: string;
    protected _properties: Object;
    GetManager: typeof Engine.prototype.GetManager;
    constructor(parent: Entity, name: string, properties?: Object);
    get name(): string;
    get properties(): Object;
    Create(): void;
    Init(): void;
    Update(): void;
    Unload(): void;
}
