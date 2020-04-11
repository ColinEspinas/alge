export default class TimeManager {
    private static _instance;
    private static lastUpdate;
    private static deltaTime;
    private static fps;
    private constructor();
    static get instance(): TimeManager;
    static DeltaTime(): number;
    static LastUpdate(): number;
    static Fps(): number;
    static Update(): void;
}
