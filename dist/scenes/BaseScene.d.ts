import Entity from '../core/Entity';
import BaseSceneManager from '../managers/BaseSceneManager';
import Engine from '../core/Engine';
export default class BaseScene {
    protected _id: number;
    protected _name: string;
    protected _manager: BaseSceneManager;
    protected loaded: boolean;
    protected entities: any[];
    protected loadedEntities: any[];
    constructor(manager: BaseSceneManager, name: string);
    get id(): number;
    get name(): string;
    get engine(): Engine;
    Reload(): void;
    Load(): void;
    protected UnloadEntity(entity: Entity): void;
    Unload(): void;
    protected InitEntity(entity: Entity): void;
    protected UpdateEntity(entity: Entity): void;
    Update(): void;
    FixedUpdate(): void;
    AddEntity<EntityType extends Entity>(e: EntityType): EntityType;
    GetEntity(name: string): any;
}
