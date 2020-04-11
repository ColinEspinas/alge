import Engine from "../core/Engine";
import Manager from "../core/Manager";
export default class TimeManager extends Manager {
    protected _name: string;
    private _lastUpdate;
    private _deltaTime;
    private _fps;
    constructor(engine: Engine);
    get deltaTime(): number;
    get lastUpdate(): number;
    get fps(): number;
    Update(): void;
}
