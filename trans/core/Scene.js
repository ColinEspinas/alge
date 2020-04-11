import shortid from 'shortid';
export default class Scene {
    constructor(name, engine) {
        this.loaded = false;
        this._id = shortid.generate();
        this._name = name;
        this.engine = engine;
        this.entities = [];
        this.loadedEntities = [];
    }
    get id() {
        return this._id;
    }
    get name() {
        return this._name;
    }
    Reload() {
        this.loadedEntities = [];
        this.loaded = false;
        this.loadedEntities = this.entities;
    }
    Load() {
        this.loadedEntities = [];
        this.loaded = false;
        this.loadedEntities = this.entities;
    }
    Unload() {
        this.loadedEntities = [];
        this.loaded = false;
        for (var i = 0, len = this.entities.length; i < len; i++) {
            this.entities[i].Unload();
        }
    }
    Update() {
        for (var i = 0, len = this.entities.length; i < len; i++) {
            if (this.loaded == false) {
                this.loadedEntities[i].Init();
            }
            else {
                this.loadedEntities[i].Update();
            }
        }
        this.loaded = true;
    }
    AddEntity(e, name, ...args) {
        if (name && name !== "") {
            this.entities.push(new e(this.engine, name, ...args));
            return this.entities[this.entities.length - 1];
        }
        else
            throw Error("Entity name is null or empty");
    }
    GetEntity(name) {
        for (var i = 0, len = this.entities.length; i < len; i++) {
            if (this.entities[i].name == name) {
                return this.entities[i];
            }
        }
    }
}
