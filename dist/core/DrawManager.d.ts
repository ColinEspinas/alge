export default class DrawManager {
    private static _instance;
    private static driver;
    private constructor();
    static get instance(): DrawManager;
    static SetContext(driver: any): void;
    static GetContext(): any;
}
