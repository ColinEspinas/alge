import SceneManager from '../managers/SceneManager';
import DrawManager from '../managers/DrawManager';
import TimeManager from '../managers/TimeManager';
import InputManager from '../managers/InputManager';
export default class engine {
    constructor(options = {}) {
        options = Object.assign({
            width: 1280,
            height: 720,
            fullscreen: false,
            container: "body",
            managers: [],
        }, options);
        this.managers = [];
        this.managers.push(new TimeManager(this));
        this.managers.push(new SceneManager(this));
        this.managers.push(new DrawManager(this));
        this.managers.push(new InputManager(this));
        for (var i = 0, len = options.managers.length; i < len; i++) {
            this.AddManager(options.managers[i]);
        }
        this._width = options.width;
        this._height = options.height;
        this._fullscreen = options.fullscreen;
        this._container = options.container;
        for (var i = 0, len = this.managers.length; i < len; i++) {
            this.managers[i].PreInit(options);
        }
    }
    get width() { return this._width; }
    get height() { return this._height; }
    get fullscreen() { return this._fullscreen; }
    get container() { return this._container; }
    Run() {
        for (var i = 0, len = this.managers.length; i < len; i++) {
            this.managers[i].Init();
        }
        console.log("Engine is running in ", document.querySelector(this._container));
        requestAnimationFrame(this.Update.bind(this));
        return 0;
    }
    Update() {
        for (var i = 0, len = this.managers.length; i < len; i++) {
            this.managers[i].Update();
        }
        requestAnimationFrame(this.Update.bind(this));
    }
    AddManager(c, ...args) {
        if (name && name !== "") {
            this.managers.push(new c(this, ...args));
            return this.managers[this.managers.length - 1];
        }
        else
            throw Error("Manager name is null or empty");
    }
    GetManager(m) {
        for (var i = 0, len = this.managers.length; i < len; i++) {
            if (this.managers[i].name === m.name) {
                return this.managers[i];
            }
        }
    }
    GetManagers(m) {
        let managers = [];
        for (var i = 0, len = this.managers.length; i < len; i++) {
            if (this.managers[i].name === m.name) {
                managers.push(this.managers[i]);
            }
        }
        return managers;
    }
}
