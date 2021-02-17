import Entity from "./Entity";
import Engine from "./Engine";
export default abstract class Component {
    protected _parent: Entity;
    protected _name: string;
    protected _properties: Object;
    constructor(parent: Entity, name: string, properties?: Object);
    get name(): string;
    get properties(): Object;
    get engine(): Engine;
    get parent(): Entity;
    set parent(entity: Entity);
    create(): void;
    init(): void;
    update(): void;
    fixedUpdate(): void;
    unload(): void;
}
