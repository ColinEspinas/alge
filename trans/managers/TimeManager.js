import Manager from "../core/Manager";
export default class TimeManager extends Manager {
    constructor(engine) {
        super(engine);
        this._name = "TimeManager";
        this._lastUpdate = 0;
        this._deltaTime = 0;
        this._fps = 0;
    }
    get deltaTime() { return this._deltaTime; }
    get lastUpdate() { return this._lastUpdate; }
    get fps() { return this._fps; }
    Update() {
        this._deltaTime = (performance.now() - this._lastUpdate) / 1000;
        this._lastUpdate = performance.now();
        this._fps = 1 / this._deltaTime;
    }
}
