import Engine, { Options } from './Engine';

export default abstract class Manager {

	protected abstract _name : string;
	protected _engine : Engine;

	public get name() { return this._name; }
	public get engine() { return this._engine; }

	constructor(engine : Engine) {
		this._engine = engine;
	}

	/**
	 * Called at the end of the engine constructor
	 * @param options Engine construct options
	 */
	public PreInit(options : Options) {};

	/**
	 * Called on engine run
	 * @param args 
	 */
	public Init(...args : any[]) {};

	/**
	 * Called on engine update
	 * @param args 
	 */
	public Update(...args : any[]) {};
}