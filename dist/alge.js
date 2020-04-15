'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var shortid = _interopDefault(require('shortid'));
var Two = _interopDefault(require('two.js'));

class Manager {
    constructor(engine) {
        this._engine = engine;
    }
    get name() { return this._name; }
    get engine() { return this._engine; }
    /**
     * Called at the end of the engine constructor
     * @param options Engine construct options
     */
    PreInit(options) { }
    ;
    /**
     * Called on engine run
     * @param args
     */
    Init(...args) { }
    ;
    /**
     * Called on engine update
     * @param args
     */
    Update(...args) { }
    ;
}

class Scene {
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
    UnloadEntity(entity) {
        entity.Unload();
        entity.UnloadComponents();
    }
    Unload() {
        this.loadedEntities = [];
        this.loaded = false;
        for (var i = 0, len = this.entities.length; i < len; i++) {
            const entity = this.entities[i];
            this.UnloadEntity(entity);
        }
    }
    UpdateEntity(entity) {
        if (this.loaded == false) {
            entity.Init();
            entity.InitComponents();
        }
        else {
            entity.Update();
            entity.UpdateComponents();
        }
    }
    Update() {
        for (var i = 0, len = this.entities.length; i < len; i++) {
            const entity = this.loadedEntities[i];
            this.UpdateEntity(entity);
        }
        this.loaded = true;
    }
    AddEntity(e, name, properties) {
        if (name && name !== "") {
            this.entities.push(new e(this.engine, name, properties));
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

class SceneManager extends Manager {
    constructor(engine) {
        super(engine);
        this._name = "SceneManager";
        this.scenes = [];
    }
    Init() {
        this.LoadSceneByIndex(0);
    }
    Update() {
        this.loadedScene.Update();
    }
    CreateScene(name) {
        if (name && name !== "") {
            try {
                this.GetScene(name);
            }
            catch (_a) {
                let scene = new Scene(name, this.engine);
                this.scenes.push(scene);
                return scene;
            }
            throw Error("Scene with name " + name + " already exist");
        }
        else
            throw Error("Cannot create scene with name " + name);
    }
    GetScenes() {
        return this.scenes;
    }
    GetScene(name) {
        for (var i = 0, len = this.scenes.length; i < len; i++) {
            if (this.scenes[i].name === name) {
                return this.scenes[i];
            }
        }
        throw Error("Cannot get scene with name " + name);
    }
    GetLoadedScene() {
        return this.loadedScene;
    }
    RemoveScene(index) {
        this.scenes.splice(index, 1);
    }
    LoadSceneByIndex(index) {
        if (typeof this.scenes[index] !== "undefined") {
            if (this.loadedScene)
                this.loadedScene.Unload();
            this.loadedScene = this.scenes[index];
            this.scenes[index].Load();
        }
        else
            throw Error("Cannot load scene with index " + index);
    }
    LoadSceneByName(name) {
        try {
            const scene = this.GetScene(name);
            if (this.loadedScene)
                this.loadedScene.Unload();
            this.loadedScene = scene;
            scene.Load();
        }
        catch (_a) {
            throw Error("Cannot load scene with name " + name);
        }
    }
}

class DrawManager extends Manager {
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

class TimeManager extends Manager {
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

class Vec {
    constructor(x, y, z) {
        this.x = x;
        this.y = y;
        if (z)
            this.z = z;
    }
    Equals(v, tolerance) {
        if (tolerance == undefined) {
            tolerance = 0.0000001;
        }
        return (Math.abs(v.x - this.x) <= tolerance) && (Math.abs(v.y - this.y) <= tolerance) && (Math.abs(v.z - this.z) <= tolerance);
    }
    ;
    Add(v) {
        this.x += v.x;
        this.y += v.y;
        if (this.z) {
            this.z += v.z;
        }
        return this;
    }
    ;
    Sub(v) {
        this.x -= v.x;
        this.y -= v.y;
        if (this.z) {
            this.z -= v.z;
        }
        return this;
    }
    ;
    Scale(f) {
        this.x *= f;
        this.y *= f;
        if (this.z) {
            this.z *= f;
        }
        return this;
    }
    ;
    Distance(v) {
        var dx = v.x - this.x;
        var dy = v.y - this.y;
        var dz = v.z - this.z;
        if (dz) {
            return Math.sqrt(dx * dx + dy * dy + dz * dz);
        }
        return Math.sqrt(dx * dx + dy * dy);
    }
    ;
    SquareDistance(v) {
        var dx = v.x - this.x;
        var dy = v.y - this.y;
        var dz = v.z - this.z;
        if (dz) {
            return dx * dx + dy * dy + dz * dz;
        }
        return dx * dx + dy * dy;
    }
    ;
    SimpleDistance(v) {
        var dx = Math.abs(v.x - this.x);
        var dy = Math.abs(v.y - this.y);
        var dz = Math.abs(v.z - this.z);
        if (dz) {
            return Math.min(dx, dy, dz);
        }
        return Math.min(dx, dy);
    }
    ;
    Dot(v) {
        if (this.z) {
            return this.x * v.x + this.y * v.y + this.z * v.z;
        }
        return this.x * v.x + this.y * v.y;
    }
    ;
    Cross(v) {
        var x = this.x;
        var y = this.y;
        var z = this.z;
        var vx = v.x;
        var vy = v.y;
        var vz = v.z;
        this.x = y * vz - z * vy;
        this.y = z * vx - x * vz;
        this.z = x * vy - y * vx;
        return this;
    }
    ;
    Length() {
        if (this.z) {
            return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
        }
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }
    ;
    Normalize() {
        var len = this.Length();
        if (len > 0) {
            this.Scale(1 / len);
        }
        return this;
    }
    ;
    Limit(s) {
        var len = this.Length();
        if (len > s && len > 0) {
            this.Scale(s / len);
        }
        return this;
    }
    ;
    Lerp(v, t) {
        this.x = this.x + (v.x - this.x) * t;
        this.y = this.y + (v.y - this.y) * t;
        this.z = this.z + (v.z - this.z) * t;
        return this;
    }
    ToString() {
        return "{" + Math.floor(this.x * 1000) / 1000 + ", " + Math.floor(this.y * 1000) / 1000 + ", " + Math.floor(this.z * 1000) / 1000 + "}";
    }
    ;
    static Zero() { return new Vec(0, 0, 0); }
    static One() { return new Vec(1, 1, 1); }
    static Up() { return new Vec(0, -1, 0); }
    static Down() { return new Vec(0, 1, 0); }
    static Left() { return new Vec(-1, 0, 0); }
    static Right() { return new Vec(1, 0, 0); }
    static Front() { return new Vec(0, 0, 1); }
    static Back() { return new Vec(0, 0, -1); }
}
Vec.FromArray = function (a) {
    return new Vec(a[0], a[1], a[2]);
};

class InputManager extends Manager {
    constructor() {
        super(...arguments);
        this._name = "InputManager";
        this.pressed = {};
        this.down = {};
        this.released = {};
        this.mousePressed = {};
        this.mouseDown = {};
        this.mouseReleased = {};
        this.mousePos = new Vec(0, 0);
        this.mouseWheel = new Vec(0, 0, 0);
    }
    Init() {
        // Get container to fire events from:
        this.containerElement = document.querySelector(this.engine.container);
        // Setup keyboard events:
        this.containerElement.addEventListener('keydown', (e) => {
            this.down[e.keyCode] = true;
            if (!e.repeat) {
                this.pressed[e.keyCode] = true;
            }
        });
        this.containerElement.addEventListener('keyup', (e) => {
            this.down[e.keyCode] = false;
            this.released[e.keyCode] = true;
        });
        // Setup mouse events:
        this.containerElement.addEventListener('mousemove', (e) => {
            this.mousePos.x = e.clientX;
            this.mousePos.y = e.clientY;
        });
        this.containerElement.addEventListener('mousedown', (e) => {
            this.mouseDown[e.button] = true;
            this.mousePressed[e.button] = true;
        });
        this.containerElement.addEventListener('mouseup', (e) => {
            this.mouseDown[e.button] = false;
            this.mouseReleased[e.button] = true;
        });
        this.containerElement.addEventListener('wheel', (e) => {
            this.mouseWheel.x += e.deltaX;
            this.mouseWheel.y += e.deltaY;
            this.mouseWheel.z += e.deltaZ;
        });
    }
    Update() {
        for (var i = 0, len = Object.keys(this.pressed).length; i < len; i++) {
            this.pressed[Object.keys(this.pressed)[i]] = false;
        }
        for (var i = 0, len = Object.keys(this.released).length; i < len; i++) {
            this.released[Object.keys(this.released)[i]] = false;
        }
        for (var i = 0, len = Object.keys(this.mouseReleased).length; i < len; i++) {
            this.mouseReleased[Object.keys(this.mouseReleased)[i]] = false;
        }
    }
    GetKeyDown(key) {
        return this.down[key];
    }
    GetMousePosition() {
        return this.mousePos;
    }
    GetMouseDown(button) {
        return this.mouseDown[button];
    }
    GetMouseReleased(button) {
        return this.mouseReleased[button];
    }
    GetMouseWheel() {
        return this.mouseWheel;
    }
    SetCursor(type) {
        this.containerElement.style.cursor = type;
    }
    GetKeyPressed(key) {
        return this.pressed[key];
    }
    GetKeyReleased(key) {
        return this.released[key];
    }
}
(function (Cursor) {
    Cursor["Hidden"] = "none";
    Cursor["Default"] = "default";
    Cursor["Pointer"] = "pointer";
    Cursor["Help"] = "help";
    Cursor["Loading"] = "wait";
    Cursor["Crosshair"] = "crosshair";
    Cursor["Grab"] = "grab";
    Cursor["Grabbing"] = "grabbing";
    Cursor["NotAllowed"] = "not-allowed";
})(exports.Cursor || (exports.Cursor = {}));
(function (Mouse) {
    Mouse[Mouse["Left"] = 0] = "Left";
    Mouse[Mouse["Middle"] = 1] = "Middle";
    Mouse[Mouse["Right"] = 2] = "Right";
})(exports.Mouse || (exports.Mouse = {}));
(function (Key) {
    Key[Key["Backspace"] = 8] = "Backspace";
    Key[Key["Tab"] = 9] = "Tab";
    Key[Key["Enter"] = 13] = "Enter";
    Key[Key["Shift"] = 16] = "Shift";
    Key[Key["Ctrl"] = 17] = "Ctrl";
    Key[Key["Alt"] = 18] = "Alt";
    Key[Key["PauseBreak"] = 19] = "PauseBreak";
    Key[Key["CapsLock"] = 20] = "CapsLock";
    Key[Key["Escape"] = 27] = "Escape";
    Key[Key["Space"] = 32] = "Space";
    Key[Key["PageUp"] = 33] = "PageUp";
    Key[Key["PageDown"] = 34] = "PageDown";
    Key[Key["End"] = 35] = "End";
    Key[Key["Home"] = 36] = "Home";
    Key[Key["LeftArrow"] = 37] = "LeftArrow";
    Key[Key["UpArrow"] = 38] = "UpArrow";
    Key[Key["RightArrow"] = 39] = "RightArrow";
    Key[Key["DownArrow"] = 40] = "DownArrow";
    Key[Key["Insert"] = 45] = "Insert";
    Key[Key["Delete"] = 46] = "Delete";
    Key[Key["Zero"] = 48] = "Zero";
    Key[Key["ClosedParen"] = 48] = "ClosedParen";
    Key[Key["One"] = 49] = "One";
    Key[Key["ExclamationMark"] = 49] = "ExclamationMark";
    Key[Key["Two"] = 50] = "Two";
    Key[Key["AtSign"] = 50] = "AtSign";
    Key[Key["Three"] = 51] = "Three";
    Key[Key["PoundSign"] = 51] = "PoundSign";
    Key[Key["Hash"] = 51] = "Hash";
    Key[Key["Four"] = 52] = "Four";
    Key[Key["DollarSign"] = 52] = "DollarSign";
    Key[Key["Five"] = 53] = "Five";
    Key[Key["PercentSign"] = 53] = "PercentSign";
    Key[Key["Six"] = 54] = "Six";
    Key[Key["Caret"] = 54] = "Caret";
    Key[Key["Hat"] = 54] = "Hat";
    Key[Key["Seven"] = 55] = "Seven";
    Key[Key["Ampersand"] = 55] = "Ampersand";
    Key[Key["Eight"] = 56] = "Eight";
    Key[Key["Star"] = 56] = "Star";
    Key[Key["Asterik"] = 56] = "Asterik";
    Key[Key["Nine"] = 57] = "Nine";
    Key[Key["OpenParen"] = 57] = "OpenParen";
    Key[Key["A"] = 65] = "A";
    Key[Key["B"] = 66] = "B";
    Key[Key["C"] = 67] = "C";
    Key[Key["D"] = 68] = "D";
    Key[Key["E"] = 69] = "E";
    Key[Key["F"] = 70] = "F";
    Key[Key["G"] = 71] = "G";
    Key[Key["H"] = 72] = "H";
    Key[Key["I"] = 73] = "I";
    Key[Key["J"] = 74] = "J";
    Key[Key["K"] = 75] = "K";
    Key[Key["L"] = 76] = "L";
    Key[Key["M"] = 77] = "M";
    Key[Key["N"] = 78] = "N";
    Key[Key["O"] = 79] = "O";
    Key[Key["P"] = 80] = "P";
    Key[Key["Q"] = 81] = "Q";
    Key[Key["R"] = 82] = "R";
    Key[Key["S"] = 83] = "S";
    Key[Key["T"] = 84] = "T";
    Key[Key["U"] = 85] = "U";
    Key[Key["V"] = 86] = "V";
    Key[Key["W"] = 87] = "W";
    Key[Key["X"] = 88] = "X";
    Key[Key["Y"] = 89] = "Y";
    Key[Key["Z"] = 90] = "Z";
    Key[Key["LeftWindowKey"] = 91] = "LeftWindowKey";
    Key[Key["RightWindowKey"] = 92] = "RightWindowKey";
    Key[Key["SelectKey"] = 93] = "SelectKey";
    Key[Key["Numpad0"] = 96] = "Numpad0";
    Key[Key["Numpad1"] = 97] = "Numpad1";
    Key[Key["Numpad2"] = 98] = "Numpad2";
    Key[Key["Numpad3"] = 99] = "Numpad3";
    Key[Key["Numpad4"] = 100] = "Numpad4";
    Key[Key["Numpad5"] = 101] = "Numpad5";
    Key[Key["Numpad6"] = 102] = "Numpad6";
    Key[Key["Numpad7"] = 103] = "Numpad7";
    Key[Key["Numpad8"] = 104] = "Numpad8";
    Key[Key["Numpad9"] = 105] = "Numpad9";
    Key[Key["Multiply"] = 106] = "Multiply";
    Key[Key["Add"] = 107] = "Add";
    Key[Key["Subtract"] = 109] = "Subtract";
    Key[Key["DecimalPoint"] = 110] = "DecimalPoint";
    Key[Key["Divide"] = 111] = "Divide";
    Key[Key["F1"] = 112] = "F1";
    Key[Key["F2"] = 113] = "F2";
    Key[Key["F3"] = 114] = "F3";
    Key[Key["F4"] = 115] = "F4";
    Key[Key["F5"] = 116] = "F5";
    Key[Key["F6"] = 117] = "F6";
    Key[Key["F7"] = 118] = "F7";
    Key[Key["F8"] = 119] = "F8";
    Key[Key["F9"] = 120] = "F9";
    Key[Key["F10"] = 121] = "F10";
    Key[Key["F11"] = 122] = "F11";
    Key[Key["F12"] = 123] = "F12";
    Key[Key["NumLock"] = 144] = "NumLock";
    Key[Key["ScrollLock"] = 145] = "ScrollLock";
    Key[Key["SemiColon"] = 186] = "SemiColon";
    Key[Key["Equals"] = 187] = "Equals";
    Key[Key["Comma"] = 188] = "Comma";
    Key[Key["Dash"] = 189] = "Dash";
    Key[Key["Period"] = 190] = "Period";
    Key[Key["UnderScore"] = 189] = "UnderScore";
    Key[Key["PlusSign"] = 187] = "PlusSign";
    Key[Key["ForwardSlash"] = 191] = "ForwardSlash";
    Key[Key["Tilde"] = 192] = "Tilde";
    Key[Key["GraveAccent"] = 192] = "GraveAccent";
    Key[Key["OpenBracket"] = 219] = "OpenBracket";
    Key[Key["ClosedBracket"] = 221] = "ClosedBracket";
    Key[Key["Quote"] = 222] = "Quote";
})(exports.Key || (exports.Key = {}));

class engine {
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

class Transform {
    constructor() {
        this.Reset();
    }
    Reset() {
        this.position = new Vec(0, 0, 0);
        this.rotation = 0;
        this.scale = new Vec(1, 1);
    }
}

class Entity {
    constructor(engine, name, properties) {
        this._id = shortid.generate();
        this._name = name;
        this._properties = properties || {};
        this._engine = engine;
        this.transform = new Transform();
        this.components = [];
        this.Create();
    }
    get id() { return this._id; }
    set name(name) { this.name = name; }
    get name() { return this._name; }
    get engine() { return this._engine; }
    get properties() { return this._properties; }
    Create() { }
    ;
    Init() { }
    ;
    Update() { }
    ;
    Unload() { }
    ;
    InitComponents() {
        for (var i = 0, len = this.components.length; i < len; i++) {
            this.components[i].Init();
        }
    }
    UpdateComponents() {
        for (var i = 0, len = this.components.length; i < len; i++) {
            this.components[i].Update();
        }
    }
    UnloadComponents() {
        for (var i = 0, len = this.components.length; i < len; i++) {
            this.components[i].Unload();
        }
    }
    AddComponent(c, name, properties) {
        if (name && name !== "") {
            this.components.push(new c(this, name, properties));
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

class Component {
    constructor(parent, name, properties) {
        this.parent = parent;
        this._name = name;
        this._properties = properties || {};
        this.Create();
    }
    get name() { return this._name; }
    get properties() { return this._properties; }
    Create() { }
    ;
    Init() { }
    ;
    Update() { }
    ;
    Unload() { }
    ;
}

class SpriteRenderer extends Component {
    constructor() {
        super(...arguments);
        this._name = "SpriteRenderer";
    }
    Create() {
        this.image = this.properties["image"];
        this.scale = 1;
        this.stretchMode = this.properties["stretchMode"];
    }
    Init() {
        this.texture = new Two.Texture(this.image);
        this.shape = this.parent.engine.GetManager(DrawManager).GetContext().makeRectangle(this.parent.transform.position.x, this.parent.transform.position.y, this.parent.transform.scale.x, this.parent.transform.scale.y);
        this.shape.noStroke();
        this.shape.fill = this.texture;
    }
    Update() {
        this.shape.width = this.parent.transform.scale.x;
        this.shape.height = this.parent.transform.scale.y;
        switch (this.stretchMode) {
            case 0: {
                let imgRatio = this.texture.image.naturalWidth / this.texture.image.naturalHeight;
                if (imgRatio < 1) {
                    this.texture.scale = new Two.Vector(this.scale * (this.shape.height / this.texture.image.naturalHeight), this.scale * (this.shape.height / this.texture.image.naturalHeight));
                }
                else {
                    this.texture.scale = new Two.Vector(this.scale * (this.shape.width / this.texture.image.naturalWidth), this.scale * (this.shape.width / this.texture.image.naturalWidth));
                }
                break;
            }
            case 1: {
                let imgRatio = this.texture.image.naturalWidth / this.texture.image.naturalHeight;
                if (imgRatio < 1) {
                    this.texture.scale = new Two.Vector(this.scale * (this.shape.width / this.texture.image.naturalWidth), this.scale * (this.shape.width / this.texture.image.naturalWidth));
                }
                else {
                    this.texture.scale = new Two.Vector(this.scale * (this.shape.height / this.texture.image.naturalHeight), this.scale * (this.shape.height / this.texture.image.naturalHeight));
                }
                break;
            }
            case 2: {
                this.texture.scale = new Two.Vector(this.scale * (this.shape.width / this.texture.image.naturalWidth), this.scale * (this.shape.height / this.texture.image.naturalHeight));
                break;
            }
        }
        this.shape.translation.set(this.parent.transform.position.x, this.parent.transform.position.y);
    }
    Unload() {
        this.shape.remove();
    }
}
(function (SpriteMode) {
    SpriteMode[SpriteMode["BestFit"] = 0] = "BestFit";
    SpriteMode[SpriteMode["Cover"] = 1] = "Cover";
    SpriteMode[SpriteMode["Stretch"] = 2] = "Stretch";
    SpriteMode[SpriteMode["Unscaled"] = 3] = "Unscaled";
})(exports.SpriteMode || (exports.SpriteMode = {}));

exports.Component = Component;
exports.DrawManager = DrawManager;
exports.Engine = engine;
exports.Entity = Entity;
exports.InputManager = InputManager;
exports.Scene = Scene;
exports.SceneManager = SceneManager;
exports.SpriteRenderer = SpriteRenderer;
exports.TimeManager = TimeManager;
exports.Transform = Transform;
exports.Vec = Vec;
