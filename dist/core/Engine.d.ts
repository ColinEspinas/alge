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
    framerate?: number;
};
export default class engine {
    private _width;
    private _height;
    private _fullscreen;
    private _resolution;
    private _scaleMode;
    private _gameScale;
    private _framerate;
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
    get framerate(): number;
    run(): number;
    update(now: number): void;
    protected addManager<ManagerType extends Manager>(m: ManagerType): ManagerType;
    getManager(name: string): any;
    getManagers(name: string): any[];
}
