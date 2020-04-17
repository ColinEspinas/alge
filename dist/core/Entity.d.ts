import Transform from './Transform';
import Component from './Component';
import Engine from './Engine';
export default class Entity {
    protected _id: number;
    protected _name: string;
    protected _properties: Object;
    protected _engine: Engine;
    shape: any;
    transform: Transform;
    texture: any;
    protected components: any[];
    constructor(engine: Engine, name: string, properties?: Object);
    get id(): number;
    set name(name: string);
    get name(): string;
    get engine(): Engine;
    get properties(): Object;
    Create(): void;
    Init(): void;
    Update(): void;
    Unload(): void;
    InitComponents(): void;
    UpdateComponents(): void;
    UnloadComponents(): void;
    AddComponent<ComponentType extends Component>(c: new (...args: any[]) => ComponentType, properties?: Object): ComponentType;
    AddSharedComponent<ComponentType extends Component>(c: ComponentType): Component;
    GetComponentFromName(name: string): any;
    GetComponent<ComponentType extends Component>(c: new (...args: any[]) => ComponentType): ComponentType;
    GetComponents<ComponentType extends Component>(c: new (...args: any[]) => ComponentType): ComponentType[];
    RemoveComponent(name: string): void;
}
