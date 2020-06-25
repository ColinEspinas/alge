import shortid from 'shortid';
import { Container, Graphics, utils, Renderer, settings, SCALE_MODES, Texture, Sprite as Sprite$1, Text as Text$1, RenderTexture, BaseRenderTexture, BaseTexture, Rectangle } from 'pixi.js';
import * as PIXI from 'pixi.js';
export { PIXI };
import { Engine, World, Bodies, Events, Body, Vector } from 'matter-js';
import * as Matter from 'matter-js';
export { Matter };
import { Howler, Howl } from 'howler';
import Tumult from 'tumult';

class Manager {
    constructor(engine, name) {
        this._engine = engine;
        this._name = name;
    }
    get name() { return this._name; }
    get engine() { return this._engine; }
    set engine(engine) { this._engine = engine; }
    /**
     * Called at the end of the engine constructor
     * @param options Engine construct options
     */
    preInit(options) { }
    ;
    /**
     * Called on engine run
     * @param args
     */
    init(...args) { }
    ;
    /**
     * Called on engine update
     * @param args
     */
    update(...args) { }
    ;
    /**
     * Called on engine update at fixed timesteps
     * @param args
     */
    fixedUpdate(...args) { }
    ;
}

class BaseScene {
    constructor(manager, name) {
        this.loaded = false;
        this._id = shortid.generate();
        this._name = name;
        this._manager = manager;
        this.entities = [];
        this.loadedEntities = [];
    }
    get id() { return this._id; }
    get name() { return this._name; }
    get engine() { return this._manager.engine; }
    reload() {
        this.unload();
        this.load();
    }
    load() {
        this.loadedEntities = [];
        this.loaded = false;
        this.loadedEntities = this.entities;
    }
    unloadEntity(entity) {
        entity.unload();
        entity.unloadComponents();
    }
    unload() {
        this.loaded = false;
        for (var i = 0, len = this.loadedEntities.length; i < len; i++) {
            const entity = this.loadedEntities[i];
            this.unloadEntity(entity);
        }
        this.loadedEntities = [];
    }
    initEntity(entity) {
        if (entity) {
            entity.init();
            entity.initComponents();
        }
    }
    updateEntity(entity) {
        if (entity) {
            if (this.loaded == false) {
                this.initEntity(entity);
            }
            else {
                entity.update();
                entity.updateComponents();
            }
        }
    }
    update() {
        for (var i = 0, len = this.loadedEntities.length; i < len; i++) {
            const entity = this.loadedEntities[i];
            this.updateEntity(entity);
        }
        this.loaded = true;
    }
    fixedUpdate() {
        for (var i = 0, len = this.loadedEntities.length; i < len; i++) {
            this.loadedEntities[i].fixedUpdate();
            this.loadedEntities[i].fixedUpdateComponents();
        }
    }
    addEntity(e) {
        e.scene = this;
        e.create();
        this.entities.push(e);
        if (this.loaded) {
            this.initEntity(this.entities[this.entities.length - 1]);
        }
        return this.entities[this.entities.length - 1];
    }
    removeEntity(name) {
        if (this.loaded) {
            for (var i = this.loadedEntities.length - 1; i >= 0; --i) {
                if (this.loadedEntities[i].name == name) {
                    this.unloadEntity(this.loadedEntities[i]);
                    this.loadedEntities.splice(i, 1);
                }
            }
        }
        else {
            for (var i = this.entities.length - 1; i >= 0; --i) {
                if (this.entities[i].name == name) {
                    this.entities.splice(i, 1);
                }
            }
        }
    }
    getEntity(name) {
        for (var i = 0, len = this.entities.length; i < len; i++) {
            if (this.entities[i].name == name) {
                return this.entities[i];
            }
        }
    }
    getEntities() {
        if (this.loaded) {
            return this.loadedEntities;
        }
        else {
            return this.entities;
        }
    }
}

class BaseSceneManager extends Manager {
    constructor(engine, name) {
        super(engine, name);
        this.scenes = [];
    }
    init() {
        this.loadSceneByIndex(0);
    }
    update() {
        this.loadedScene.update();
    }
    fixedUpdate() {
        this.loadedScene.fixedUpdate();
    }
    createScene(name) {
        if (name && name !== "") {
            try {
                this.getScene(name);
            }
            catch (_a) {
                let scene = new BaseScene(this, name);
                this.scenes.push(scene);
                return scene;
            }
            throw Error("Scene with name " + name + " already exist");
        }
        else
            throw Error("Cannot create scene with name " + name);
    }
    getScenes() {
        return this.scenes;
    }
    getScene(name) {
        for (var i = 0, len = this.scenes.length; i < len; i++) {
            if (this.scenes[i].name === name) {
                return this.scenes[i];
            }
        }
        throw Error("Cannot get scene with name " + name);
    }
    getLoadedScene() {
        return this.loadedScene;
    }
    removeScene(index) {
        this.scenes.splice(index, 1);
    }
    loadSceneByIndex(index) {
        if (typeof this.scenes[index] !== "undefined") {
            if (this.loadedScene)
                this.loadedScene.unload();
            this.loadedScene = this.scenes[index];
            this.scenes[index].load();
        }
        else
            throw Error("Cannot load scene with index " + index);
    }
    loadSceneByName(name) {
        try {
            const scene = this.getScene(name);
            if (this.loadedScene)
                this.loadedScene.unload();
            this.loadedScene = scene;
            scene.load();
        }
        catch (error) {
            console.error(error);
        }
    }
}

class Vec {
    constructor(x, y, z) {
        this.x = x;
        this.y = y;
        if (z)
            this.z = z;
    }
    equals(v, tolerance) {
        if (tolerance == undefined) {
            tolerance = 0.0000001;
        }
        return (Math.abs(v.x - this.x) <= tolerance) && (Math.abs(v.y - this.y) <= tolerance) && (Math.abs(v.z - this.z) <= tolerance);
    }
    ;
    add(v) {
        this.x += v.x;
        this.y += v.y;
        if (this.z) {
            this.z += v.z;
        }
        return this;
    }
    ;
    sub(v) {
        this.x -= v.x;
        this.y -= v.y;
        if (this.z) {
            this.z -= v.z;
        }
        return this;
    }
    ;
    scale(f) {
        this.x *= f;
        this.y *= f;
        if (this.z) {
            this.z *= f;
        }
        return this;
    }
    ;
    distance(v) {
        var dx = v.x - this.x;
        var dy = v.y - this.y;
        var dz = v.z - this.z;
        if (dz) {
            return Math.sqrt(dx * dx + dy * dy + dz * dz);
        }
        return Math.sqrt(dx * dx + dy * dy);
    }
    ;
    squareDistance(v) {
        var dx = v.x - this.x;
        var dy = v.y - this.y;
        var dz = v.z - this.z;
        if (dz) {
            return dx * dx + dy * dy + dz * dz;
        }
        return dx * dx + dy * dy;
    }
    ;
    simpleDistance(v) {
        var dx = Math.abs(v.x - this.x);
        var dy = Math.abs(v.y - this.y);
        var dz = Math.abs(v.z - this.z);
        if (dz) {
            return Math.min(dx, dy, dz);
        }
        return Math.min(dx, dy);
    }
    ;
    dot(v) {
        if (this.z) {
            return this.x * v.x + this.y * v.y + this.z * v.z;
        }
        return this.x * v.x + this.y * v.y;
    }
    ;
    cross(v) {
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
    length() {
        if (this.z) {
            return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
        }
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }
    ;
    normalize() {
        var len = this.length();
        if (len > 0) {
            this.scale(1 / len);
        }
        return this;
    }
    ;
    limit(s) {
        var len = this.length();
        if (len > s && len > 0) {
            this.scale(s / len);
        }
        return this;
    }
    ;
    lerp(v, t) {
        this.x = this.x + (v.x - this.x) * t;
        this.y = this.y + (v.y - this.y) * t;
        this.z = this.z + (v.z - this.z) * t;
        return this;
    }
    toString() {
        return "{" + Math.floor(this.x * 1000) / 1000 + ", " + Math.floor(this.y * 1000) / 1000 + ", " + Math.floor(this.z * 1000) / 1000 + "}";
    }
    ;
    static zero() { return new Vec(0, 0, 0); }
    static one() { return new Vec(1, 1, 1); }
    static up() { return new Vec(0, -1, 0); }
    static down() { return new Vec(0, 1, 0); }
    static left() { return new Vec(-1, 0, 0); }
    static right() { return new Vec(1, 0, 0); }
    static front() { return new Vec(0, 0, 1); }
    static back() { return new Vec(0, 0, -1); }
    static from(v) {
        if (v.z)
            return new Vec(v.x, v.y, v.z);
        return new Vec(v.x, v.y);
    }
    static fromArray(a) {
        return new Vec(a[0], a[1], a[2]);
    }
}

class Scene extends BaseScene {
    constructor() {
        super(...arguments);
        this._stage = new Container();
        this._layers = [];
    }
    get stage() { return this._stage; }
    get layers() { return this._layers; }
    initDefaultLayer() {
        this.addLayer("Default");
        this.addLayer("Debug", { fixed: true, rotation: 0 });
    }
    addLayer(name, options) {
        options = options || {};
        this._layers.push({
            name: name,
            container: new Container(),
            fixed: options.fixed || false,
            speed: options.speed || Vec.one(),
            rotation: (options.rotation === 0) ? 0 : options.rotation || 1,
        });
        this._stage.addChild(this._layers[this.layers.length - 1].container);
        return this._layers[this._layers.length - 1];
    }
    getLayer(name) {
        for (let i = 0, len = this._layers.length; i < len; ++i) {
            if (this._layers[i].name === name) {
                return this._layers[i];
            }
        }
        return null;
    }
    getLayerIndex(name) {
        for (let i = 0, len = this._layers.length; i < len; ++i) {
            if (this._layers[i].name === name) {
                return i;
            }
        }
        return null;
    }
    removeLayer(name) {
        for (var i = 0, len = this._layers.length; i < len; i++) {
            if (this._layers[i].name === name) {
                this._layers.splice(i, 1);
            }
        }
    }
    swapLayer(nameFirstLayer, nameSecondLayer) {
        const firstLayerIndex = this.getLayerIndex(nameFirstLayer);
        const secondLayerIndex = this.getLayerIndex(nameSecondLayer);
        const tempLayer = this._layers[firstLayerIndex];
        this._layers[firstLayerIndex] = this._layers[secondLayerIndex];
        this._layers[secondLayerIndex] = tempLayer;
        this._stage.swapChildren(this._layers[firstLayerIndex].container, this._layers[secondLayerIndex].container);
    }
    renameLayer(currentName, name) {
        this.getLayer(currentName).name = name;
    }
    load() {
        super.load();
        if (this._layers.length <= 0) {
            this.initDefaultLayer();
        }
        this.engine.getManager("Render").loadSceneToViewport(this);
    }
    unload() {
        super.unload();
        for (let i = 0, len = this._layers.length; i < len; ++i) {
            this._layers[i].container.removeChildren();
        }
    }
}

class PIXISceneManager extends BaseSceneManager {
    createScene(name) {
        if (name && name !== "") {
            try {
                this.getScene(name);
            }
            catch (_a) {
                let scene = new Scene(this, name);
                this.scenes.push(scene);
                return scene;
            }
            throw Error("Scene with name " + name + " already exist");
        }
        else
            throw Error("Cannot create scene with name " + name);
    }
    getScenes() {
        return this.scenes;
    }
    getScene(name) {
        for (var i = 0, len = this.scenes.length; i < len; i++) {
            if (this.scenes[i].name === name) {
                return this.scenes[i];
            }
        }
        throw Error("Cannot get scene with name " + name);
    }
    getLoadedScene() {
        return this.loadedScene;
    }
}

class Viewport extends Container {
    constructor(options) {
        super();
        this.viewWidth = options.width;
        this.viewHeight = options.height;
        this.debugGraphics = new Graphics;
    }
    get width() { return this.viewWidth; }
    get height() { return this.viewHeight; }
    get center() { return new Vec(this.position.x + this.width / 2, this.position.y + this.height / 2); }
    resize(width, height) {
        this.viewWidth = width;
        this.viewHeight = height;
    }
    debug() {
        this.debugGraphics.clear();
        let coords = [
            this.position.x,
            this.position.y,
            this.position.x + this.viewWidth,
            this.position.y + this.viewHeight,
        ];
        this.debugGraphics.position = this.position;
        this.debugGraphics.lineStyle(10, 0xFF0000)
            .lineTo(coords[2], coords[1])
            .lineTo(coords[2], coords[3])
            .lineTo(coords[0], coords[3])
            .lineTo(coords[0], coords[1]);
    }
    setStage(stage, debug) {
        this.removeChildren();
        this.addChild(stage);
        this._stage = stage;
        if (debug) {
            this.addChild(this.debugGraphics);
        }
    }
    get stage() { return this._stage; }
}

class PIXIRenderManager extends Manager {
    constructor() {
        super(...arguments);
        this.mainContainer = new Container();
    }
    init() {
        utils.skipHello();
        const container = document.querySelector(this.engine.container);
        if (this.engine.fullscreen) {
            // Instantiate Renderer:
            this._renderer = new Renderer({
                width: container.clientWidth,
                height: container.clientHeight,
                resolution: this.engine.resolution,
                transparent: true,
            });
            // Instantiate Viewport:
            this._viewport = new Viewport({
                width: container.clientWidth,
                height: container.clientHeight,
            });
            // Add listener to window resize to keep the rendered view the same size as the container.
            window.addEventListener('resize', () => {
                this._renderer.resize(container.clientWidth, container.clientHeight);
                this._viewport.resize(container.clientWidth, container.clientHeight);
            });
        }
        else {
            // Instantiate Renderer:
            this._renderer = new Renderer({
                width: this.engine.width,
                height: this.engine.height,
                resolution: this.engine.resolution,
                transparent: true,
            });
            // Instantiate Viewport:
            this._viewport = new Viewport({
                width: this.engine.width,
                height: this.engine.height,
            });
        }
        this.mainContainer.addChild(this._viewport);
        container.appendChild(this.renderer.view);
        if (this.engine.scaleMode === "linear")
            settings.SCALE_MODE = SCALE_MODES.LINEAR;
        else
            settings.SCALE_MODE = SCALE_MODES.NEAREST;
    }
    update() {
        this._viewport.debug();
        this.renderer.render(this.mainContainer);
    }
    loadSceneToViewport(scene) {
        this._viewport.removeChildren();
        this._viewport.setStage(scene.stage, false);
    }
    get renderer() { return this._renderer; }
    get viewport() { return this._viewport; }
}

class TimeManager extends Manager {
    constructor(engine, name) {
        super(engine, name);
        this._step = 1 / 60;
        this._accumulator = 0;
        this._lastUpdate = 0;
        this._deltaTime = 0;
        this._fps = 0;
    }
    get deltaTime() { return this._deltaTime; }
    get lastDeltaTime() { return this._lastDeltaTime; }
    get lastUpdate() { return this._lastUpdate; }
    get fps() { return this._fps; }
    get step() { return this._step; }
    get accumulator() { return this._accumulator; }
    update() {
        this._lastDeltaTime = this._deltaTime;
        this._deltaTime = Math.min(1, (performance.now() - this._lastUpdate) / 1000);
        this._accumulator += this.deltaTime;
        this._fps = 1 / this._deltaTime;
    }
    setLastUpdate() {
        this._lastUpdate = performance.now();
    }
    fixDelta() {
        this._accumulator -= this._step;
    }
}

class InputManager extends Manager {
    constructor() {
        super(...arguments);
        this.pressed = {};
        this.down = {};
        this.released = {};
        this.mousePressed = {};
        this.mouseWasPressed = {};
        this.mouseDown = {};
        this.mouseReleased = {};
        this.mousePos = new Vec(0, 0);
        this.mouseWheel = new Vec(0, 0, 0);
    }
    init() {
        window.oncontextmenu = () => { return false; };
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
            if (!this.mouseWasPressed[e.button]) {
                this.mousePressed[e.button] = true;
                this.mouseWasPressed[e.button] = true;
            }
        });
        this.containerElement.addEventListener('mouseup', (e) => {
            this.mouseDown[e.button] = false;
            this.mouseReleased[e.button] = true;
            this.mouseWasPressed[e.button] = false;
        });
        this.containerElement.addEventListener('wheel', (e) => {
            this.mouseWheel.x += e.deltaX;
            this.mouseWheel.y += e.deltaY;
            this.mouseWheel.z += e.deltaZ;
        });
    }
    update() {
        for (var i = 0, len = Object.keys(this.pressed).length; i < len; i++) {
            this.pressed[Object.keys(this.pressed)[i]] = false;
        }
        for (var i = 0, len = Object.keys(this.mousePressed).length; i < len; i++) {
            this.mousePressed[Object.keys(this.mousePressed)[i]] = false;
        }
        for (var i = 0, len = Object.keys(this.released).length; i < len; i++) {
            this.released[Object.keys(this.released)[i]] = false;
        }
        for (var i = 0, len = Object.keys(this.mouseReleased).length; i < len; i++) {
            this.mouseReleased[Object.keys(this.mouseReleased)[i]] = false;
        }
    }
    getKeyDown(key) {
        return this.down[key];
    }
    getMousePosition() {
        return this.mousePos;
    }
    getMouseDown(button) {
        return this.mouseDown[button];
    }
    getMousePressed(button) {
        return this.mousePressed[button];
    }
    getMouseReleased(button) {
        return this.mouseReleased[button];
    }
    getMouseWheel() {
        return this.mouseWheel;
    }
    setCursor(type) {
        this.containerElement.style.cursor = type;
    }
    getKeyPressed(key) {
        return this.pressed[key];
    }
    getKeyReleased(key) {
        return this.released[key];
    }
}
var Cursor;
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
})(Cursor || (Cursor = {}));
var Mouse;
(function (Mouse) {
    Mouse[Mouse["Left"] = 0] = "Left";
    Mouse[Mouse["Middle"] = 1] = "Middle";
    Mouse[Mouse["Right"] = 2] = "Right";
})(Mouse || (Mouse = {}));
var Key;
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
})(Key || (Key = {}));

class PMPhysicsManager extends Manager {
    constructor(engine, name) {
        super(engine, name);
        this.sceneManager = this.engine.getManager("Scene");
        this._physicsEngine = Engine.create();
    }
    get physicsEngine() { return this._physicsEngine; }
    fixedUpdate() {
        if (this.sceneManager) {
            this._physicsEngine.world = this.sceneManager.getLoadedScene().world;
            Engine.update(this._physicsEngine);
        }
    }
    set gravity(value) { this._physicsEngine.world = this.sceneManager.getLoadedScene().gravity = value; }
    get gravity() { return this._physicsEngine.world = this.sceneManager.getLoadedScene().world.gravity; }
}

class PIXIMatterScene extends BaseScene {
    constructor() {
        super(...arguments);
        this._stage = new Container();
        this._layers = [];
        this._world = World.create({});
    }
    get stage() { return this._stage; }
    get world() { return this._world; }
    get gravity() { return this.world.gravity; }
    set gravity(value) { this.world.gravity = value; }
    get layers() { return this._layers; }
    initDefaultLayer() {
        this.addLayer("Default");
        this.addLayer("Debug", { fixed: true, rotation: 0 });
    }
    addLayer(name, options) {
        options = options || {};
        this._layers.push({
            name: name,
            container: new Container(),
            fixed: options.fixed || false,
            speed: options.speed || Vec.one(),
            rotation: (options.rotation === 0) ? 0 : options.rotation || 1,
        });
        this._stage.addChild(this._layers[this.layers.length - 1].container);
        return this._layers[this._layers.length - 1];
    }
    getLayer(name) {
        for (let i = 0, len = this._layers.length; i < len; ++i) {
            if (this._layers[i].name === name) {
                return this._layers[i];
            }
        }
        return null;
    }
    getLayerIndex(name) {
        for (let i = 0, len = this._layers.length; i < len; ++i) {
            if (this._layers[i].name === name) {
                return i;
            }
        }
        return null;
    }
    removeLayer(name) {
        for (var i = 0, len = this._layers.length; i < len; i++) {
            if (this._layers[i].name === name) {
                this._layers.splice(i, 1);
            }
        }
    }
    swapLayer(nameFirstLayer, nameSecondLayer) {
        const firstLayerIndex = this.getLayerIndex(nameFirstLayer);
        const secondLayerIndex = this.getLayerIndex(nameSecondLayer);
        const tempLayer = this._layers[firstLayerIndex];
        this._layers[firstLayerIndex] = this._layers[secondLayerIndex];
        this._layers[secondLayerIndex] = tempLayer;
        this._stage.swapChildren(this._layers[firstLayerIndex].container, this._layers[secondLayerIndex].container);
    }
    renameLayer(currentName, name) {
        this.getLayer(currentName).name = name;
    }
    load() {
        super.load();
        if (this._layers.length <= 0) {
            this.initDefaultLayer();
        }
        this.engine.getManager("Render").loadSceneToViewport(this);
    }
    unload() {
        super.unload();
        for (let i = 0, len = this._layers.length; i < len; ++i) {
            this._layers[i].container.removeChildren();
        }
        World.clear(this._world, false);
    }
}

class PMSceneManager extends BaseSceneManager {
    createScene(name) {
        if (name && name !== "") {
            try {
                this.getScene(name);
            }
            catch (_a) {
                let scene = new PIXIMatterScene(this, name);
                this.scenes.push(scene);
                return scene;
            }
            throw Error("Scene with name " + name + " already exist");
        }
        else
            throw Error("Cannot create scene with name " + name);
    }
    getScenes() {
        return this.scenes;
    }
    getScene(name) {
        for (var i = 0, len = this.scenes.length; i < len; i++) {
            if (this.scenes[i].name === name) {
                return this.scenes[i];
            }
        }
        throw Error("Cannot get scene with name " + name);
    }
    getLoadedScene() {
        return this.loadedScene;
    }
}

class AudioManager extends Manager {
    constructor() {
        super(...arguments);
        this._tracks = [];
    }
    get tracks() { return this._tracks; }
    set volume(value) { Howler.volume(value); }
    addTrack(name, options) {
        options = options || {};
        this._tracks.push({
            name: name,
            audio: new Howl(options),
        });
        return this._tracks[this._tracks.length - 1];
    }
    getTrack(name) {
        for (let i = 0, len = this._tracks.length; i < len; ++i) {
            if (this._tracks[i].name === name) {
                return this._tracks[i];
            }
        }
        return null;
    }
    getTrackIndex(name) {
        for (let i = 0, len = this._tracks.length; i < len; ++i) {
            if (this._tracks[i].name === name) {
                return i;
            }
        }
        return null;
    }
    removeTrack(name) {
        for (var i = 0, len = this._tracks.length; i < len; i++) {
            if (this._tracks[i].name === name) {
                this._tracks.splice(i, 1);
            }
        }
    }
    renameTrack(currentName, name) {
        this.getTrack(currentName).name = name;
    }
}

class engine {
    constructor(options = {}) {
        options = Object.assign({
            width: 1280,
            height: 720,
            resolution: 1,
            fullscreen: false,
            container: "body",
            managers: [],
            renderer: 'pixi',
            scaleMode: 'nearest',
            physics: null,
            gameScale: 1,
            framerate: 60,
        }, options);
        this.managers = [];
        this.managers.push(new TimeManager(this, "Time"));
        if (options.renderer === 'pixi') {
            this.managers.push(new PIXIRenderManager(this, "Render"));
            if (options.physics === 'matter') {
                this.managers.push(new PMPhysicsManager(this, "Physics"));
                this.managers.push(new PMSceneManager(this, "Scene"));
            }
            else {
                this.managers.push(new PIXISceneManager(this, "Scene"));
            }
        }
        this.managers.push(new InputManager(this, "Input"));
        this.managers.push(new AudioManager(this, "Audio"));
        for (var i = 0, len = options.managers.length; i < len; i++) {
            this.addManager(options.managers[i]);
        }
        this._width = options.width;
        this._height = options.height;
        this._resolution = options.resolution;
        this._fullscreen = options.fullscreen;
        this._container = options.container;
        this._scaleMode = options.scaleMode;
        this._gameScale = options.gameScale;
        this._framerate = options.framerate;
        for (var i = 0, len = this.managers.length; i < len; i++) {
            this.managers[i].preInit(options);
        }
    }
    get width() { return this._width; }
    get height() { return this._height; }
    get resolution() { return this._resolution; }
    get fullscreen() { return this._fullscreen; }
    get container() { return this._container; }
    get scaleMode() { return this._scaleMode; }
    get gameScale() { return this._gameScale; }
    get framerate() { return this._framerate; }
    run() {
        for (var i = 0, len = this.managers.length; i < len; i++) {
            this.managers[i].init();
        }
        console.log("Engine is running in ", document.querySelector(this._container));
        this.update();
        return 0;
    }
    update() {
        while (this.getManager("Time").accumulator > this.getManager("Time").step) {
            this.getManager("Time").fixDelta();
            for (var i = 0, len = this.managers.length; i < len; i++) {
                this.managers[i].fixedUpdate();
            }
        }
        for (var i = 0, len = this.managers.length; i < len; i++) {
            this.managers[i].update();
        }
        this.getManager("Time").setLastUpdate();
        setTimeout(() => {
            requestAnimationFrame(this.update.bind(this));
        }, 1000 / (this._framerate + 15));
    }
    addManager(m) {
        m.engine = this;
        this.managers.push(m);
        return this.managers[this.managers.length - 1];
    }
    getManager(name) {
        for (var i = 0, len = this.managers.length; i < len; i++) {
            if (this.managers[i].name === name) {
                return this.managers[i];
            }
        }
    }
    getManagers(name) {
        let managers = [];
        for (var i = 0, len = this.managers.length; i < len; i++) {
            if (this.managers[i].name === name) {
                managers.push(this.managers[i]);
            }
        }
        return managers;
    }
}

class Transform {
    constructor() {
        this.reset();
    }
    reset() {
        this.position = new Vec(0, 0, 0);
        this.rotation = 0;
        this.scale = new Vec(1, 1);
    }
    worldToLocal(position) {
        return Vec.from(position).sub(this.position);
    }
    localToWorld(position) {
        return Vec.from(position).add(this.position);
    }
}

class Entity {
    constructor(name, properties) {
        this._id = shortid.generate();
        this._name = name;
        this._properties = properties || {};
        this.transform = new Transform();
        this.components = [];
        this._tags = (properties) ? properties["tags"] : [] || [];
        // this.Create();
    }
    get id() { return this._id; }
    set name(name) { this.name = name; }
    get name() { return this._name; }
    get engine() { return this._scene.engine; }
    get properties() { return this._properties; }
    get scene() { return this._scene; }
    set scene(scene) { this._scene = scene; }
    create() { }
    ;
    init() { }
    ;
    update() { }
    ;
    fixedUpdate() { }
    ;
    unload() { }
    ;
    initComponents() {
        for (var i = 0, len = this.components.length; i < len; i++) {
            this.components[i].init();
        }
    }
    updateComponents() {
        for (var i = 0, len = this.components.length; i < len; i++) {
            this.components[i].update();
        }
    }
    fixedUpdateComponents() {
        for (var i = 0, len = this.components.length; i < len; i++) {
            this.components[i].fixedUpdate();
        }
    }
    unloadComponents() {
        for (var i = 0, len = this.components.length; i < len; i++) {
            this.components[i].unload();
        }
    }
    // public AddComponent<ComponentType extends Component>(c : new (...args : any[]) => ComponentType, properties ?: Object) : ComponentType {
    // 	let name : string;
    // 	if (properties && properties["name"]) name = properties["name"];
    // 	else name = c.name;
    // 	this.components.push(new c(this, name, properties));
    // 	return this.components[this.components.length - 1];
    // }
    addComponent(c) {
        c.parent = this;
        c.create();
        this.components.push(c);
        return this.components[this.components.length - 1];
    }
    getComponent(name) {
        for (var i = 0, len = this.components.length; i < len; i++) {
            if (this.components[i].name == name) {
                return this.components[i];
            }
        }
    }
    removeComponent(name) {
        for (var i = 0, len = this.components.length; i < len; i++) {
            if (this.components[i].name === name) {
                this.components.splice(i, 1);
            }
        }
    }
    hasTag(tag) {
        return this._tags.includes(tag);
    }
    getTagIndex(tag) {
        return this._tags.indexOf(tag);
    }
    addTag(tag) {
        this._tags.push(tag);
    }
    removeTag(tag) {
        this._tags.splice(this.getTagIndex(tag), 1);
    }
}

class Component {
    constructor(parent, name, properties) {
        this._parent = parent;
        this._name = name;
        this._properties = properties || {};
    }
    get name() { return this._name; }
    get properties() { return this._properties; }
    get engine() { return this.parent.engine; }
    get parent() { return this._parent; }
    set parent(entity) { this._parent = entity; }
    create() { }
    ;
    init() { }
    ;
    update() { }
    ;
    fixedUpdate() { }
    ;
    unload() { }
    ;
}

// Implementations of Robert Penner's tweening functions.
// From https://github.com/chenglou/tween-functions
class Ease {
    static lerp(b, c, t) {
        return b * (1 - t) + c * t;
    }
    static linear(t, b, _c, d) {
        var c = _c - b;
        return c * t / d + b;
    }
    static easeInQuad(t, b, _c, d) {
        var c = _c - b;
        return c * (t /= d) * t + b;
    }
    static easeOutQuad(t, b, _c, d) {
        var c = _c - b;
        return -c * (t /= d) * (t - 2) + b;
    }
    static easeInOutQuad(t, b, _c, d) {
        var c = _c - b;
        if ((t /= d / 2) < 1) {
            return c / 2 * t * t + b;
        }
        else {
            return -c / 2 * ((--t) * (t - 2) - 1) + b;
        }
    }
    static easeInCubic(t, b, _c, d) {
        var c = _c - b;
        return c * (t /= d) * t * t + b;
    }
    static easeOutCubic(t, b, _c, d) {
        var c = _c - b;
        return c * ((t = t / d - 1) * t * t + 1) + b;
    }
    static easeInOutCubic(t, b, _c, d) {
        var c = _c - b;
        if ((t /= d / 2) < 1) {
            return c / 2 * t * t * t + b;
        }
        else {
            return c / 2 * ((t -= 2) * t * t + 2) + b;
        }
    }
    static easeInQuart(t, b, _c, d) {
        var c = _c - b;
        return c * (t /= d) * t * t * t + b;
    }
    static easeOutQuart(t, b, _c, d) {
        var c = _c - b;
        return -c * ((t = t / d - 1) * t * t * t - 1) + b;
    }
    static easeInOutQuart(t, b, _c, d) {
        var c = _c - b;
        if ((t /= d / 2) < 1) {
            return c / 2 * t * t * t * t + b;
        }
        else {
            return -c / 2 * ((t -= 2) * t * t * t - 2) + b;
        }
    }
    static easeInQuint(t, b, _c, d) {
        var c = _c - b;
        return c * (t /= d) * t * t * t * t + b;
    }
    static easeOutQuint(t, b, _c, d) {
        var c = _c - b;
        return c * ((t = t / d - 1) * t * t * t * t + 1) + b;
    }
    static easeInOutQuint(t, b, _c, d) {
        var c = _c - b;
        if ((t /= d / 2) < 1) {
            return c / 2 * t * t * t * t * t + b;
        }
        else {
            return c / 2 * ((t -= 2) * t * t * t * t + 2) + b;
        }
    }
    static easeInSine(t, b, _c, d) {
        var c = _c - b;
        return -c * Math.cos(t / d * (Math.PI / 2)) + c + b;
    }
    static easeOutSine(t, b, _c, d) {
        var c = _c - b;
        return c * Math.sin(t / d * (Math.PI / 2)) + b;
    }
    static easeInOutSine(t, b, _c, d) {
        var c = _c - b;
        return -c / 2 * (Math.cos(Math.PI * t / d) - 1) + b;
    }
    static easeInExpo(t, b, _c, d) {
        var c = _c - b;
        return (t == 0) ? b : c * Math.pow(2, 10 * (t / d - 1)) + b;
    }
    static easeOutExpo(t, b, _c, d) {
        var c = _c - b;
        return (t == d) ? b + c : c * (-Math.pow(2, -10 * t / d) + 1) + b;
    }
    static easeInOutExpo(t, b, _c, d) {
        var c = _c - b;
        if (t === 0) {
            return b;
        }
        if (t === d) {
            return b + c;
        }
        if ((t /= d / 2) < 1) {
            return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
        }
        else {
            return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b;
        }
    }
    static easeInCirc(t, b, _c, d) {
        var c = _c - b;
        return -c * (Math.sqrt(1 - (t /= d) * t) - 1) + b;
    }
    static easeOutCirc(t, b, _c, d) {
        var c = _c - b;
        return c * Math.sqrt(1 - (t = t / d - 1) * t) + b;
    }
    static easeInOutCirc(t, b, _c, d) {
        var c = _c - b;
        if ((t /= d / 2) < 1) {
            return -c / 2 * (Math.sqrt(1 - t * t) - 1) + b;
        }
        else {
            return c / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1) + b;
        }
    }
    static easeInElastic(t, b, _c, d) {
        var c = _c - b;
        var a, p, s;
        s = 1.70158;
        p = 0;
        a = c;
        if (t === 0) {
            return b;
        }
        else if ((t /= d) === 1) {
            return b + c;
        }
        if (!p) {
            p = d * 0.3;
        }
        if (a < Math.abs(c)) {
            a = c;
            s = p / 4;
        }
        else {
            s = p / (2 * Math.PI) * Math.asin(c / a);
        }
        return -(a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
    }
    static easeOutElastic(t, b, _c, d) {
        var c = _c - b;
        var a, p, s;
        s = 1.70158;
        p = 0;
        a = c;
        if (t === 0) {
            return b;
        }
        else if ((t /= d) === 1) {
            return b + c;
        }
        if (!p) {
            p = d * 0.3;
        }
        if (a < Math.abs(c)) {
            a = c;
            s = p / 4;
        }
        else {
            s = p / (2 * Math.PI) * Math.asin(c / a);
        }
        return a * Math.pow(2, -10 * t) * Math.sin((t * d - s) * (2 * Math.PI) / p) + c + b;
    }
    static easeInOutElastic(t, b, _c, d) {
        var c = _c - b;
        var a, p, s;
        s = 1.70158;
        p = 0;
        a = c;
        if (t === 0) {
            return b;
        }
        else if ((t /= d / 2) === 2) {
            return b + c;
        }
        if (!p) {
            p = d * (0.3 * 1.5);
        }
        if (a < Math.abs(c)) {
            a = c;
            s = p / 4;
        }
        else {
            s = p / (2 * Math.PI) * Math.asin(c / a);
        }
        if (t < 1) {
            return -0.5 * (a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
        }
        else {
            return a * Math.pow(2, -10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p) * 0.5 + c + b;
        }
    }
    static easeInBack(t, b, _c, d, s) {
        var c = _c - b;
        if (s === void 0) {
            s = 1.70158;
        }
        return c * (t /= d) * t * ((s + 1) * t - s) + b;
    }
    static easeOutBack(t, b, _c, d, s) {
        var c = _c - b;
        if (s === void 0) {
            s = 1.70158;
        }
        return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b;
    }
    static easeInOutBack(t, b, _c, d, s) {
        var c = _c - b;
        if (s === void 0) {
            s = 1.70158;
        }
        if ((t /= d / 2) < 1) {
            return c / 2 * (t * t * (((s *= 1.525) + 1) * t - s)) + b;
        }
        else {
            return c / 2 * ((t -= 2) * t * (((s *= 1.525) + 1) * t + s) + 2) + b;
        }
    }
    static easeInBounce(t, b, _c, d) {
        var c = _c - b;
        var v;
        v = Ease.easeOutBounce(d - t, 0, c, d);
        return c - v + b;
    }
    static easeOutBounce(t, b, _c, d) {
        var c = _c - b;
        if ((t /= d) < 1 / 2.75) {
            return c * (7.5625 * t * t) + b;
        }
        else if (t < 2 / 2.75) {
            return c * (7.5625 * (t -= 1.5 / 2.75) * t + 0.75) + b;
        }
        else if (t < 2.5 / 2.75) {
            return c * (7.5625 * (t -= 2.25 / 2.75) * t + 0.9375) + b;
        }
        else {
            return c * (7.5625 * (t -= 2.625 / 2.75) * t + 0.984375) + b;
        }
    }
    static easeInOutBounce(t, b, _c, d) {
        var c = _c - b;
        var v;
        if (t < d / 2) {
            v = Ease.easeInBounce(t * 2, 0, c, d);
            return v * 0.5 + b;
        }
        else {
            v = Ease.easeOutBounce(t * 2 - d, 0, c, d);
            return v * 0.5 + c * 0.5 + b;
        }
    }
}

class Camera extends Entity {
    constructor() {
        super(...arguments);
        this.trauma = 0;
        this.traumaPower = 2;
        this.traumaDecay = 0.8;
        this.maxShakeOffset = new Vec(100, 75);
        this.maxShakeRoll = 10;
    }
    get bounds() { return this._bounds; }
    // public get zoom() : number { return this._zoom; }
    get center() { return this._center; }
    get viewport() { return this._viewport; }
    set target(target) { this._target = target; }
    get target() { return this._target; }
    get scene() { return this._scene; }
    set scene(scene) { this._scene = scene; }
    init() {
        this._viewport = this.engine.getManager("Render").viewport;
        this.time = this.engine.getManager("Time");
    }
    update() {
        this._center = new Vec(this.transform.position.x, this.transform.position.y).add(new Vec(this._viewport.width / 2, this._viewport.height / 2));
        if (this.trauma > 0) {
            this.trauma = Math.max(this.trauma - this.traumaDecay * this.time.deltaTime, 0);
            this.shake();
        }
        if (this._target && this._target.position && this._target.position instanceof Vec) {
            if (this.target.horizontal && this.target.vertical) {
                this.moveTo(this.target.position, this.target.options);
            }
            else if (this.target.horizontal) {
                this.moveToHorizontal(this.target.position, this.target.options);
            }
            else if (this.target.vertical) {
                this.moveToVertical(this.target.position, this.target.options);
            }
        }
        if (this._target && this._target.entity && this._target.entity instanceof Entity) {
            if (this.target.horizontal && this.target.vertical) {
                this.moveTo(this.target.entity.transform.position, this.target.options);
            }
            else if (this.target.horizontal) {
                this.moveToHorizontal(this.target.entity.transform.position, this.target.options);
            }
            else if (this.target.vertical) {
                this.moveToVertical(this.target.entity.transform.position, this.target.options);
            }
        }
        for (let i = 0, len = this.scene.layers.length; i < len; ++i) {
            let pivot = this.center;
            this.scene.layers[i].container.pivot.x = pivot.x;
            this.scene.layers[i].container.pivot.y = pivot.y;
            this.scene.layers[i].container.position.x = pivot.x;
            this.scene.layers[i].container.position.y = pivot.y;
            if (!this.scene.layers[i].fixed) {
                this.scene.layers[i].container.position.x = pivot.x - this.transform.position.x * this.scene.layers[i].speed.x;
                this.scene.layers[i].container.position.y = pivot.y - this.transform.position.y * this.scene.layers[i].speed.y;
            }
        }
        this._bounds = [
            this.transform.position,
            new Vec(this.transform.position.x + this._viewport.width, this.transform.position.y),
            new Vec(this.transform.position.x + this._viewport.width, this.transform.position.y + this._viewport.height),
            new Vec(this.transform.position.x, this.transform.position.y + this._viewport.height),
        ];
    }
    worldToCamera(position) {
        return new Vec(position.x - this.transform.position.x, position.y - this.transform.position.y);
    }
    cameraToWorld(position) {
        return new Vec(position.x + this.transform.position.x, position.y + this.transform.position.y);
    }
    move(direction, speed) {
        speed = speed || 1;
        this.transform.position.x += direction.x * speed * this.time.deltaTime * 100;
        this.transform.position.y += direction.y * speed * this.time.deltaTime * 100;
    }
    moveTo(position, options) {
        const tolerance = options.tolerance || 0.5;
        const pos = (options.centered) ? this._center : this.transform.position;
        const centerX = (options.centered) ? this._viewport.width / 2 : 0;
        const centerY = (options.centered) ? this._viewport.height / 2 : 0;
        if (position.distance(pos) > tolerance) {
            this.transform.position.x = Math.floor(Ease.lerp(this.transform.position.x, (position.x - centerX) + (options.offset ? options.offset.x : 0), Math.min(1, options.duration * (this.time.deltaTime * 100))));
            this.transform.position.y = Math.floor(Ease.lerp(this.transform.position.y, (position.y - centerY) + (options.offset ? options.offset.y : 0), Math.min(1, options.duration * (this.time.deltaTime * 100))));
        }
    }
    moveToHorizontal(position, options) {
        const tolerance = options.tolerance || 0.5;
        const pos = (options.centered) ? this._center : this.transform.position;
        const centerX = (options.centered) ? this._viewport.width / 2 : 0;
        if (position.distance(pos) > tolerance) {
            this.transform.position.x = Math.floor(Ease.lerp(this.transform.position.x, (position.x - centerX) + (options.offset ? options.offset.x : 0), Math.min(1, options.duration * (this.time.deltaTime * 100))));
        }
    }
    moveToVertical(position, options) {
        const tolerance = options.tolerance || 0.5;
        const pos = (options.centered) ? this._center : this.transform.position;
        const centerY = (options.centered) ? this._viewport.height / 2 : 0;
        if (position.distance(pos) > tolerance) {
            this.transform.position.y = Math.floor(Ease.lerp(this.transform.position.y, (position.y - centerY) + (options.offset ? options.offset.y : 0), Math.min(1, options.duration * (this.time.deltaTime * 100))));
        }
    }
    addTrauma(amount) {
        this.trauma = Math.min(this.trauma + amount, 1);
    }
    shake() {
        const amount = Math.pow(this.trauma, this.traumaPower);
        this.rotate(this.maxShakeRoll * amount * Math.random());
        const shakeOffset = new Vec(this.maxShakeOffset.x * amount * ((Math.random() * 2) - 1), this.maxShakeOffset.y * amount * ((Math.random() * 2) - 1));
        this.moveTo(new Vec(this._center.x + shakeOffset.x, this._center.y + shakeOffset.y), {
            duration: 1,
            centered: true
        });
    }
    // public Zoom(amount : number) {
    // 	this._zoom = amount;
    // 	for (let i = 0, len = this.scene.layers.length; i < len; ++i) {
    // 		this.scene.layers[i].zoom = this._zoom * this.scene.layers[i].zoomCoef;
    // 		for (let j = 0, count = this.scene.layers[i].container.children.length; j < count; ++j) {
    // 			this.scene.layers[i].container.children[j].scale = new PIXI.Point(
    // 				this._zoom * this.scene.layers[i].zoomCoef,
    // 				this._zoom * this.scene.layers[i].zoomCoef
    // 			);
    // 		}
    // 	}
    // }
    rotate(angle) {
        for (let i = 0, len = this.scene.layers.length; i < len; ++i) {
            this.scene.layers[i].container.angle = angle * this.scene.layers[i].rotation;
        }
    }
    isOnCamera(position) {
        return (position.x > this.bounds[0].x && position.x < this.bounds[2].x) && (position.y > this.bounds[0].y && position.y < this.bounds[2].y);
    }
}

class Sprite extends Component {
    // private stretchMode : SpriteMode;
    create() {
        if (typeof this.properties["src"] === 'string') {
            this.src = this.properties["src"];
            this.texture = Texture.from(this.src);
        }
        else if (this.properties["src"] instanceof Texture) {
            this.texture = this.properties["src"];
        }
        this.texture.baseTexture.scaleMode = this.properties["scaleMode"] || SCALE_MODES.NEAREST;
        this.position = this.properties["position"] || this.parent.transform.position;
        this.anchor = this.properties["anchor"] || new Vec(0.5, 0.5);
        this.scale = this.properties["scale"] || this.parent.transform.scale;
        this.angle = (this.properties["angle"] === 0) ? 0 : this.properties["angle"] || this.parent.transform.rotation;
        this.layer = this.properties["layer"] || "Default";
        this.sprite = new Sprite$1();
        // this.stretchMode = this.properties["stretchMode"];
    }
    init() {
        this.sprite.position.x = this.position.x;
        this.sprite.position.y = this.position.y;
        this.sprite.width = this.scale.x;
        this.sprite.height = this.scale.y;
        this.sprite.angle = this.angle;
        this.sprite.anchor.x = this.anchor.x;
        this.sprite.anchor.y = this.anchor.y;
        this.sprite.texture = this.texture;
        this.engine.getManager("Scene").getLoadedScene().getLayer(this.layer).container.addChild(this.sprite);
    }
    update() {
        // Set sprite position:
        this.position = this.properties["position"] || this.parent.transform.position;
        this.sprite.position.x = this.position.x;
        this.sprite.position.y = this.position.y;
        // Set sprite scale:
        this.scale = this.properties["scale"] || this.parent.transform.scale;
        this.sprite.width = this.scale.x;
        this.sprite.height = this.scale.y;
        // Set sprite rotation (in degrees):
        this.angle = (this.properties["angle"] === 0) ? 0 : this.properties["angle"] || this.parent.transform.rotation;
        this.sprite.angle = this.angle;
        // Set anchor point:
        this.sprite.anchor.x = this.anchor.x;
        this.sprite.anchor.y = this.anchor.y;
        this.sprite.texture = this.texture;
    }
    unload() {
        this.engine.getManager("Scene").getLoadedScene().getLayer(this.layer).container.removeChild(this.sprite);
    }
}
var SpriteMode;
(function (SpriteMode) {
    SpriteMode[SpriteMode["BestFit"] = 0] = "BestFit";
    SpriteMode[SpriteMode["Cover"] = 1] = "Cover";
    SpriteMode[SpriteMode["Stretch"] = 2] = "Stretch";
    SpriteMode[SpriteMode["Unscaled"] = 3] = "Unscaled";
})(SpriteMode || (SpriteMode = {}));

class Text extends Component {
    create() {
        this.content = this.properties["content"];
        this.style = this.properties["style"];
        this.position = this.properties["position"] || this.parent.transform.position;
        this.anchor = this.properties["anchor"] || new Vec(0, 0);
        this.scale = this.properties["scale"];
        this.layer = this.properties["layer"] || "Default";
        this.text = new Text$1(this.content, this.style);
    }
    init() {
        this.text.position.x = this.position.x;
        this.text.position.y = this.position.y;
        if (this.scale) {
            this.text.width = this.scale.x;
            this.text.height = this.scale.y;
        }
        this.text.angle = this.parent.transform.rotation;
        this.text.anchor.x = this.anchor.x;
        this.text.anchor.y = this.anchor.y;
        this.text.text = this.content;
        this.text.style = this.style;
        this.engine.getManager("Scene").getLoadedScene().getLayer(this.layer).container.addChild(this.text);
    }
    update() {
        // Set text position:
        this.position = this.properties["position"] || this.parent.transform.position;
        this.text.position.x = this.position.x;
        this.text.position.y = this.position.y;
        // Set text scale:
        this.scale = this.properties["scale"];
        if (this.scale) {
            this.text.width = this.scale.x;
            this.text.height = this.scale.y;
        }
        // Set text rotation (in degrees):
        this.text.angle = this.parent.transform.rotation;
        // Set anchor point:
        this.text.anchor.x = this.anchor.x;
        this.text.anchor.y = this.anchor.y;
        // Set text content:
        this.text.text = this.content;
        // Set text style:
        this.text.style = this.style;
    }
    setText(content) {
        this.content = content.toString();
    }
    setStyle(style) {
        this.style = style;
    }
    setPosition(pos) {
        this.properties["position"] = pos;
    }
}

class Angle {
    static degToRad(degrees) {
        return degrees * Math.PI / 180;
    }
    static radToDeg(radians) {
        return radians * 180 / Math.PI;
    }
    static betweenPositions(u, v) {
        return Math.atan2(v.y - u.y, v.x - u.x);
    }
}

class RigidBody extends Component {
    constructor() {
        super(...arguments);
        this.collisionCallbacks = {};
    }
    get body() { return this._body; }
    create() {
        const position = this.properties["position"] || this.parent.transform.position;
        const scale = this.properties["scale"] || this.parent.transform.scale;
        const isStatic = this.properties["static"];
        const bodyOptions = this.properties["options"];
        this._body = Bodies.rectangle(position.x, position.y, scale.x, scale.y, bodyOptions);
        this._body.component = this;
        //==== Collision Events : ====//
        Events.on(this.engine.getManager("Physics").physicsEngine, 'collisionStart', event => {
            var pairs = event.pairs;
            for (var i = 0, len = pairs.length; i < len; ++i) {
                const pair = pairs[i];
                if (pair.bodyA === this._body && this.collisionCallbacks['collisionStart']) {
                    this.collisionCallbacks['collisionStart'](pair.bodyB);
                }
                else if (pair.bodyB === this._body && this.collisionCallbacks['collisionStart']) {
                    this.collisionCallbacks['collisionStart'](pair.bodyA);
                }
            }
        });
        Events.on(this.engine.getManager("Physics").physicsEngine, 'collisionEnd', event => {
            var pairs = event.pairs;
            for (var i = 0, len = pairs.length; i < len; ++i) {
                const pair = pairs[i];
                if (pair.bodyA === this._body && this.collisionCallbacks['collisionEnd']) {
                    this.collisionCallbacks['collisionEnd'](pair.bodyB);
                }
                else if (pair.bodyB === this._body && this.collisionCallbacks['collisionEnd']) {
                    this.collisionCallbacks['collisionEnd'](pair.bodyA);
                }
            }
        });
        Events.on(this.engine.getManager("Physics").physicsEngine, 'collisionActive', event => {
            var pairs = event.pairs;
            for (var i = 0, len = pairs.length; i < len; ++i) {
                const pair = pairs[i];
                if (pair.bodyA === this._body && this.collisionCallbacks['collisionActive']) {
                    this.collisionCallbacks['collisionActive'](pair.bodyB);
                }
                else if (pair.bodyB === this._body && this.collisionCallbacks['collisionActive']) {
                    this.collisionCallbacks['collisionActive'](pair.bodyA);
                }
            }
        });
    }
    init() {
        Body.setPosition(this._body, Vector.create(this.parent.transform.position.x, this.parent.transform.position.y));
        Body.setAngle(this._body, Angle.degToRad(this.parent.transform.rotation));
        World.add(this.engine.getManager("Scene").GetLoadedScene().world, this._body);
    }
    update() {
        this.parent.transform.position.x = this.body.position.x;
        this.parent.transform.position.y = this.body.position.y;
        // Matter.Body.scale(this.body, this.parent.transform.scale.x, this.parent.transform.scale.x);
        this.parent.transform.rotation = Math.floor(Angle.radToDeg(this.body.angle));
    }
    applyForce(position, force) {
        Body.applyForce(this._body, Vector.create(position.x, position.y), Vector.create(force.x, force.y));
    }
    set velocity(velocity) {
        Body.setVelocity(this._body, Vector.create(velocity.x, velocity.y));
    }
    get velocity() {
        return new Vec(this._body.velocity.x, this._body.velocity.y);
    }
    onCollisionStart(callback) {
        this.collisionCallbacks['collisionStart'] = callback;
    }
    onCollisionStay(callback) {
        this.collisionCallbacks['collisionActive'] = callback;
    }
    onCollisionEnd(callback) {
        this.collisionCallbacks['collisionEnd'] = callback;
    }
}

class Tilemap extends Component {
    create() {
        this.tileset = this.properties["tileset"];
        this.map = this.properties["map"];
        this.body = this.properties["body"];
        this.width = this.properties["width"];
        this.height = this.properties["height"];
        this.position = this.properties["position"] || this.parent.transform.position;
        this.anchor = this.properties["anchor"] || new Vec(0, 0);
        this.scale = this.properties["scale"] || new Vec(this.width * this.tileset.tileWidth * this.parent.engine.gameScale, this.height * this.tileset.tileHeight * this.parent.engine.gameScale);
        this.layer = this.properties["layer"] || "Default";
        this.sprite = new Sprite$1();
        this.updateTilemap();
    }
    init() {
        this.engine.getManager("Scene").GetLoadedScene().GetLayer("Default").container.addChild(this.sprite);
        if (this.body)
            this.body.removeBodiesFromWorld();
        this.updateTilemap();
        if (this.body)
            this.body.addBodiesToWorld();
    }
    update() {
        // Render tiles to texture:
        this.engine.getManager("Render").renderer.render(this.tilesContainer, this.texture);
    }
    updateTilemap() {
        this.tilesContainer = new Container();
        if (this.body) {
            this.body.bodies.length = 0;
        }
        for (var i = 0, len = this.width * this.height; i < len; i++) {
            const pos = new Vec((i % this.width) * this.tileset.tileWidth, Math.floor(i / this.width) * this.tileset.tileHeight);
            let tile = Sprite$1.from(this.tileset.getTile(this.map[i]));
            tile.position.x = pos.x;
            tile.position.y = pos.y;
            this.tilesContainer.addChild(tile);
            if (this.body) {
                if (this.body.map[i] === 1) {
                    this.body.bodies.push(Bodies.rectangle(this.position.x + (pos.x + this.tileset.tileWidth / 2) * this.engine.gameScale, this.position.y + (pos.y + this.tileset.tileHeight / 2) * this.engine.gameScale, this.tileset.tileWidth * this.engine.gameScale, this.tileset.tileHeight * this.engine.gameScale, this.body.properties["options"]));
                    let tileBody = this.body.bodies[this.body.bodies.length - 1];
                    tileBody.component = this.body;
                    tileBody.tileIndex = i;
                }
            }
        }
        // console.log(this.body);
        this.texture = new RenderTexture(new BaseRenderTexture({
            width: this.width * this.tileset.tileWidth,
            height: this.height * this.tileset.tileHeight,
            resolution: 1,
            scaleMode: (this.parent.engine.scaleMode == "linear") ? SCALE_MODES.LINEAR : SCALE_MODES.NEAREST,
        }));
        // Set sprite position:
        this.sprite.position.x = this.position.x;
        this.sprite.position.y = this.position.y;
        // Set sprite scale:
        this.sprite.width = this.scale.x;
        this.sprite.height = this.scale.y;
        this.parent.transform.scale = this.scale;
        // Set sprite rotation (in degrees):
        this.sprite.angle = this.parent.transform.rotation;
        // Set anchor point:
        this.sprite.anchor.x = this.anchor.x;
        this.sprite.anchor.y = this.anchor.y;
        this.sprite.texture = this.texture;
    }
    replaceTile(index, position) {
        this.map[position.x + this.width * position.y] = index;
        this.updateTilemap();
    }
}

class DebugCollider extends Component {
    create() {
        this.position = this.properties["position"] || this.parent.transform.position;
        this.scale = this.properties["scale"] || this.parent.transform.scale;
        this.color = this.properties["color"] || 0xFF0000;
        this.thickness = this.properties["thickness"] || 1;
        this.body = this.properties["body"];
        this.layer = this.properties["layer"] || "Default";
        this.graphics = new Graphics();
    }
    init() {
        this.engine.getManager("Scene").GetLoadedScene().GetLayer(this.layer).container.addChild(this.graphics);
    }
    update() {
        this.draw();
    }
    draw() {
        this.graphics.clear();
        this.position = this.properties["position"] || this.parent.transform.position;
        this.scale = this.properties["scale"] || this.parent.transform.scale;
        for (let i = 0, len = this.body.vertices.length; i < len; ++i) {
            this.graphics.lineTo(this.body.vertices[i].x, this.body.vertices[i].y).lineStyle(this.thickness, this.color);
        }
        this.graphics.lineTo(this.body.vertices[0].x, this.body.vertices[0].y);
    }
}

class TilemapBody extends Component {
    constructor() {
        super(...arguments);
        this.bodies = [];
        this.collisionCallbacks = {};
    }
    get map() { return this._map; }
    create() {
        this._map = this.properties["map"];
        const bodyOptions = this.properties["options"];
        // this._body = Matter.Bodies.rectangle(position.x, position.y, scale.x, scale.y, bodyOptions);
        // this._body.component = this;
        //==== Collision Events : ====//
        Events.on(this.engine.getManager("Physics").physicsEngine, 'collisionStart', event => {
            var pairs = event.pairs;
            for (var i = 0, len = pairs.length; i < len; ++i) {
                const pair = pairs[i];
                for (let j = 0, count = this.bodies.length; j < count; ++j) {
                    if (pair.bodyA === this.bodies[j] && this.collisionCallbacks['collisionStart']) {
                        this.collisionCallbacks['collisionStart'](this.bodies[j], pair.bodyB);
                    }
                    else if (pair.bodyB === this.bodies[j] && this.collisionCallbacks['collisionStart']) {
                        this.collisionCallbacks['collisionStart'](this.bodies[j], pair.bodyA);
                    }
                }
            }
        });
        Events.on(this.engine.getManager("Physics").physicsEngine, 'collisionEnd', event => {
            var pairs = event.pairs;
            for (var i = 0, len = pairs.length; i < len; ++i) {
                const pair = pairs[i];
                for (let j = 0, count = this.bodies.length; j < count; ++j) {
                    if (pair.bodyA === this.bodies[j] && this.collisionCallbacks['collisionEnd']) {
                        this.collisionCallbacks['collisionEnd'](this.bodies[j], pair.bodyB);
                    }
                    else if (pair.bodyB === this.bodies[j] && this.collisionCallbacks['collisionEnd']) {
                        this.collisionCallbacks['collisionEnd'](this.bodies[j], pair.bodyA);
                    }
                }
            }
        });
        Events.on(this.engine.getManager("Physics").physicsEngine, 'collisionActive', event => {
            var pairs = event.pairs;
            for (var i = 0, len = pairs.length; i < len; ++i) {
                const pair = pairs[i];
                for (let j = 0, count = this.bodies.length; j < count; ++j) {
                    if (pair.bodyA === this.bodies[j] && this.collisionCallbacks['collisionActive']) {
                        this.collisionCallbacks['collisionActive'](this.bodies[j], pair.bodyB);
                    }
                    else if (pair.bodyB === this.bodies[j] && this.collisionCallbacks['collisionActive']) {
                        this.collisionCallbacks['collisionActive'](this.bodies[j], pair.bodyA);
                    }
                }
            }
        });
    }
    init() {
        this.addBodiesToWorld();
    }
    update() {
        // this.parent.transform.position.x = this.body.position.x;
        // this.parent.transform.position.y = this.body.position.y;
        // // Matter.Body.scale(this.body, this.parent.transform.scale.x, this.parent.transform.scale.x);
        // this.parent.transform.rotation = Math.floor(Angle.RadToDeg(this.body.angle));
    }
    addBodiesToWorld() {
        for (let i = 0, len = this.bodies.length; i < len; ++i) {
            World.add(this.engine.getManager("Scene").GetLoadedScene().world, this.bodies[i]);
        }
    }
    removeBodiesFromWorld() {
        for (let i = 0, len = this.bodies.length; i < len; ++i) {
            World.remove(this.engine.getManager("Scene").GetLoadedScene().world, this.bodies[i]);
        }
    }
    debug() {
        for (let i = 0, len = this.bodies.length; i < len; ++i) {
            this.parent.addComponent(new DebugCollider(this.parent, "DebugCollider" + i, {
                body: this.bodies[i],
                thickness: 5,
            }));
        }
    }
    onCollisionStart(callback) {
        this.collisionCallbacks['collisionStart'] = callback;
    }
    onCollisionStay(callback) {
        this.collisionCallbacks['collisionActive'] = callback;
    }
    onCollisionEnd(callback) {
        this.collisionCallbacks['collisionEnd'] = callback;
    }
}

class Noise {
    static simplex(dimension, seed) {
        if (dimension === 1) {
            return new Tumult.Simplex1(seed);
        }
        if (dimension === 2) {
            return new Tumult.Simplex2(seed);
        }
    }
    static perlin(dimension, seed) {
        if (dimension === 1) {
            return new Tumult.Perlin1(seed);
        }
        if (dimension === 2) {
            return new Tumult.Perlin2(seed);
        }
        if (dimension === 3) {
            return new Tumult.Perlin3(seed);
        }
        if (dimension === 4) {
            return new Tumult.Perlin4(seed);
        }
        if (dimension > 4) {
            return new Tumult.PerlinN(seed);
        }
    }
}

class Tileset {
    constructor(src, width, height, tileWidth, tileHeight) {
        this.alias = {};
        this.src = src;
        this.size = new Vec(width, height);
        this.tileSize = new Vec(tileWidth, tileHeight);
        this.baseTexture = BaseTexture.from(this.src);
        this._tiles = [];
        for (var y = 0, yMax = this.size.y; y < yMax; y++) {
            for (var x = 0, xMax = this.size.x; x < xMax; x++) {
                this._tiles.push(new Texture(this.baseTexture, new Rectangle(x * this.tileSize.x, y * this.tileSize.y, this.tileSize.x, this.tileSize.y)));
            }
        }
    }
    get tiles() { return this._tiles; }
    get tileWidth() { return this.tileSize.x; }
    get tileHeight() { return this.tileSize.y; }
    /**
     * Give an alias to a tile index
     * @param index Index the alias is going to point to
     * @param name Name of the alias
     */
    setAlias(index, name) {
        if (index >= 0 && name && name !== '')
            this.alias[name] = index;
    }
    /**
     * Get a tile from the tileset
     * @param tile Tile index or name
     */
    getTile(tile) {
        if (typeof tile === 'number') {
            return this.tiles[tile];
        }
        if (typeof tile === 'string') {
            return this.tiles[this.alias[tile]];
        }
    }
}

class Intersects {
    static lineToLine(p1, p2, p3, p4, includePoints) {
        // let x1 = p1.x;
        // let y1 = p1.y;
        // let x2 = p2.x;
        // let y2 = p2.y;
        // let x3 = p3.x;
        // let y3 = p3.y;
        // let x4 = p4.x;
        // let y4 = p4.y;
        let s1_x = p2.x - p1.x;
        let s1_y = p2.y - p1.y;
        let s2_x = p4.x - p3.x;
        let s2_y = p4.y - p3.y;
        let s = (-s1_y * (p1.x - p3.x) + s1_x * (p1.y - p3.y)) / (-s2_x * s1_y + s1_x * s2_y);
        let t = (s2_x * (p1.y - p3.y) - s2_y * (p1.x - p3.x)) / (-s2_x * s1_y + s1_x * s2_y);
        if (includePoints)
            return s >= 0 && s <= 1 && t >= 0 && t <= 1;
        else
            return s > 0 && s < 1 && t > 0 && t < 1;
    }
}

export { Angle, AudioManager, BaseScene, BaseSceneManager, Camera, Component, Cursor, DebugCollider, Ease, engine as Engine, Entity, InputManager, Intersects, Key, Mouse, Noise, PIXIRenderManager, Scene as PIXIScene, PIXISceneManager, PMPhysicsManager, PIXIMatterScene as PMScene, PMSceneManager, RigidBody, Sprite, SpriteMode, Text, Tilemap, TilemapBody, Tileset, TimeManager, Transform, Vec, Viewport };
