import Engine from "../core/Engine";
import Manager from "../core/Manager";
export default class TimeManager extends Manager {
    protected _name: string;
    private _lastUpdate;
    private _deltaTime;
    private _lastDeltaTime;
    private _fps;
    private _step;
    constructor(engine: Engine);
    get deltaTime(): number;
    get lastDeltaTime(): number;
    get lastUpdate(): number;
    get fps(): number;
    get step(): number;
    Update(): void;
    SetLastUpdate(): void;
    FixDelta(): void;
}
