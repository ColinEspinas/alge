import Transform from './Transform';
import shortid from 'shortid';
export default class Entity {
    constructor(engine, name) {
        this._id = shortid.generate();
        this._name = name;
        this._engine = engine;
        this.transform = new Transform();
        this.components = [];
    }
    get id() {
        return this._id;
    }
    set name(name) {
        this.name = name;
    }
    get name() {
        return this._name;
    }
    get engine() {
        return this._engine;
    }
    Init() {
        for (var i = 0, len = this.components.length; i < len; i++) {
            this.components[i].Init();
        }
    }
    Update() {
        for (var i = 0, len = this.components.length; i < len; i++) {
            this.components[i].Update();
        }
    }
    Unload() {
        for (var i = 0, len = this.components.length; i < len; i++) {
            this.components[i].Unload();
        }
    }
    AddComponent(c, name, ...args) {
        if (name && name !== "") {
            this.components.push(new c(this, name, ...args));
            return this.components[this.components.length - 1];
        }
        else
            throw Error("Component name is null or empty");
    }
    GetComponent(name) {
        for (var i = 0, len = this.components.length; i < len; i++) {
            if (this.components[i].name == name) {
                return this.components[i];
            }
        }
    }
    GetComponents(c) {
        let components = [];
        for (var i = 0, len = this.components.length; i < len; i++) {
            if (this.components[i].name === c.name) {
                components.push(this.components[i]);
            }
        }
        return components;
    }
    RemoveComponent(name) {
        for (var i = 0, len = this.components.length; i < len; i++) {
            if (this.components[i].name === name) {
                this.components.splice(i, 1);
            }
        }
    }
}
