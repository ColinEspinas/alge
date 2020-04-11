import Transform from './Transform';
import Component from './Component';
import Engine from './Engine';
export default class Entity {
    protected _id: number;
    protected _name: string;
    protected _engine: Engine;
    shape: any;
    transform: Transform;
    texture: any;
    protected components: Component[];
    constructor(engine: Engine, name: string);
    get id(): number;
    set name(name: string);
    get name(): string;
    get engine(): Engine;
    Init(): void;
    Update(): void;
    Unload(): void;
    AddComponent<ComponentType extends Component>(c: new (...args: any[]) => ComponentType, name: string, ...args: any[]): Component;
    GetComponent(name: string): Component;
    GetComponents<ComponentType extends Component>(c: new (...args: any[]) => ComponentType): ComponentType[];
    RemoveComponent(name: string): void;
}
