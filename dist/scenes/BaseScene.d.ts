import Entity from '../core/Entity';
import Engine from '../core/Engine';
export default class BaseScene {
    protected _id: number;
    protected _name: string;
    protected engine: Engine;
    protected loaded: boolean;
    protected entities: Entity[];
    protected loadedEntities: Entity[];
    constructor(name: string, engine: Engine);
    get id(): number;
    get name(): string;
    Reload(): void;
    Load(): void;
    protected UnloadEntity(entity: Entity): void;
    Unload(): void;
    protected InitEntity(entity: Entity): void;
    protected UpdateEntity(entity: Entity): void;
    Update(): void;
    AddEntity<EntityType extends Entity>(e: new (...args: any[]) => EntityType, name: string, properties?: Object): Entity;
    GetEntity(name: string): Entity;
}
