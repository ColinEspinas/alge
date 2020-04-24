import Entity from '../core/Entity';
import Engine from '../core/Engine';
export default class BaseScene {
    protected _id: number;
    protected _name: string;
    protected engine: Engine;
    protected loaded: boolean;
    protected entities: any[];
    protected loadedEntities: any[];
    constructor(engine: Engine, name: string);
    get id(): number;
    get name(): string;
    Reload(): void;
    Load(): void;
    protected UnloadEntity(entity: Entity): void;
    Unload(): void;
    protected InitEntity(entity: Entity): void;
    protected UpdateEntity(entity: Entity): void;
    Update(): void;
    FixedUpdate(): void;
    AddEntity<EntityType extends Entity>(e: new (...args: any[]) => EntityType, name: string, properties?: Object): EntityType;
    GetEntity<EntityType extends Entity>(name: string): EntityType;
}
