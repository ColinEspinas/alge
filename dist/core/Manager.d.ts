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
    PreInit(options: Options): void;
    /**
     * Called on engine run
     * @param args
     */
    Init(...args: any[]): void;
    /**
     * Called on engine update
     * @param args
     */
    Update(...args: any[]): void;
    /**
     * Called on engine update at fixed timesteps
     * @param args
     */
    FixedUpdate(...args: any[]): void;
}
