import Engine from "../core/Engine";
import Manager from "../core/Manager";
export default class TimeManager extends Manager {
    private _now;
    private _lastUpdate;
    private _deltaTime;
    private _fps;
    private _step;
    private _tolerance;
    constructor(engine: Engine, name: string);
    get deltaTime(): number;
    get lastUpdate(): number;
    get fps(): number;
    get step(): number;
    get now(): number;
    get tolerance(): number;
    get milliDelta(): number;
    init(): void;
    update(): void;
    setNow(now: number): void;
    setDeltaTime(now?: number): void;
    setLastUpdate(value?: number): void;
    setTargetFps(value: number): void;
}
