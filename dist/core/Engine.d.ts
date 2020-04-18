import Manager from './Manager';
export declare type Options = {
    width?: number;
    height?: number;
    resolution?: number;
    fullscreen?: boolean;
    container?: string;
    managers?: any[];
    renderer?: string;
    scaleMode?: string;
    physics?: string;
};
export default class engine {
    private _width;
    private _height;
    private _fullscreen;
    private _resolution;
    private _scaleMode;
    private _container;
    private managers;
    constructor(options?: Partial<Options>);
    get width(): number;
    get height(): number;
    get resolution(): number;
    get fullscreen(): boolean;
    get container(): string;
    get scaleMode(): string;
    Run(): number;
    Update(): void;
    protected AddManager<ManagerType extends Manager>(c: new (...args: any[]) => ManagerType, ...args: any[]): Manager;
    GetManager<ManagerType extends Manager>(m: new (...args: any[]) => ManagerType): ManagerType;
    GetManagers<ManagerType extends Manager>(m: new (...args: any[]) => ManagerType): ManagerType[];
}
