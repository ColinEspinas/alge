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
    reload(): void;
    load(): void;
    protected unloadEntity(entity: Entity): void;
    unload(): void;
    protected initEntity(entity: Entity): void;
    protected updateEntity(entity: Entity): void;
    update(): void;
    fixedUpdate(): void;
    addEntity<EntityType extends Entity>(e: EntityType): EntityType;
    removeEntity(name: string): void;
    getEntity(name: string): any;
    getEntities(): any[];
}
