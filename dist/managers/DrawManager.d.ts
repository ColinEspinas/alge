import Manager from '../core/Manager';
export default class DrawManager extends Manager {
    protected _name: string;
    private driver;
    Init(): void;
    Update(): void;
    SetContext(driver: any): void;
    GetContext(): any;
}
