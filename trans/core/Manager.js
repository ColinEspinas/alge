export default class Manager {
    constructor(engine) {
        this._engine = engine;
    }
    get name() { return this._name; }
    get engine() { return this._engine; }
    /**
     * Called at the end of the engine constructor
     * @param options Engine construct options
     */
    PreInit(options) { }
    ;
    /**
     * Called on engine run
     * @param args
     */
    Init(...args) { }
    ;
    /**
     * Called on engine update
     * @param args
     */
    Update(...args) { }
    ;
}
