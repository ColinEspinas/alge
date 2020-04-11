import Entity from "./Entity";
export default abstract class Component {
    protected parent: Entity;
    protected _name: string;
    constructor(parent: Entity, name: string);
    get name(): string;
    abstract Init(): any;
    abstract Update(): any;
    Unload(): void;
}
