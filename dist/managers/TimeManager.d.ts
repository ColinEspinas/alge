import Engine from "../core/Engine";
import Manager from "../core/Manager";
export default class TimeManager extends Manager {
    private _lastUpdate;
    private _deltaTime;
    private _lastDeltaTime;
    private _fps;
    private _step;
    private _accumulator;
    constructor(engine: Engine, name: string);
    get deltaTime(): number;
    get lastDeltaTime(): number;
    get lastUpdate(): number;
    get fps(): number;
    get step(): number;
    get accumulator(): number;
    update(): void;
    setLastUpdate(): void;
    fixDelta(): void;
}
