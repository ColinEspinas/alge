import Engine, { Options } from './Engine';
export default abstract class Manager {
    protected _name: string;
    protected _engine: Engine;
    get name(): string;
    get engine(): Engine;
    set engine(engine: Engine);
    constructor(engine: Engine, name: string);
    /**
     * Called at the end of the engine constructor
     * @param options Engine construct options
     */
    preInit(options: Options): void;
    /**
     * Called on engine run
     * @param args
     */
    init(...args: any[]): void;
    /**
     * Called on engine update
     * @param args
     */
    update(...args: any[]): void;
    /**
     * Called on engine update at fixed timesteps
     * @param args
     */
    fixedUpdate(...args: any[]): void;
}
