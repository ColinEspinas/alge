export default class Component {
    constructor(parent, name) {
        this.parent = parent;
        this._name = name;
    }
    get name() { return this._name; }
    Unload() { }
    ;
}
