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
    gameScale?: number;
};
export default class engine {
    private _width;
    private _height;
    private _fullscreen;
    private _resolution;
    private _scaleMode;
    private _gameScale;
    private _container;
    private managers;
    constructor(options?: Partial<Options>);
    get width(): number;
    get height(): number;
    get resolution(): number;
    get fullscreen(): boolean;
    get container(): string;
    get scaleMode(): string;
    get gameScale(): number;
    Run(): number;
    Update(): void;
    protected AddManager<ManagerType extends Manager>(m: ManagerType): ManagerType;
    GetManager(name: string): any;
    GetManagers(name: string): any[];
}
