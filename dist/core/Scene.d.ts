import Entity from './Entity';
import Engine from './Engine';
export default class Scene {
    private _id;
    protected _name: string;
    private engine;
    private loaded;
    private entities;
    private loadedEntities;
    constructor(name: string, engine: Engine);
    get id(): number;
    get name(): string;
    Reload(): void;
    Load(): void;
    private UnloadEntity;
    Unload(): void;
    private UpdateEntity;
    Update(): void;
    AddEntity<EntityType extends Entity>(e: new (...args: any[]) => EntityType, name: string, properties?: Object): Entity;
    GetEntity(name: string): Entity;
}
