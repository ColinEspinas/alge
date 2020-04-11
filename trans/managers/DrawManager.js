import Two from 'two.js';
import Manager from '../core/Manager';
export default class DrawManager extends Manager {
    constructor() {
        super(...arguments);
        this._name = "DrawManager";
    }
    Init() {
        this.SetContext(new Two({
            width: this.engine.width,
            height: this.engine.height,
            fullscreen: this.engine.fullscreen,
            autostart: false,
            type: Two.Types.webgl,
        }).appendTo(document.querySelector(this.engine.container)));
    }
    Update() {
        this.driver.update();
    }
    SetContext(driver) {
        this.driver = driver;
    }
    GetContext() { return this.driver; }
}
