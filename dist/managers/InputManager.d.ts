import Vec from "../utilities/Vec";
import Manager from "../core/Manager";
export default class InputManager extends Manager {
    private pressed;
    private down;
    private released;
    private mousePressed;
    private mouseWasPressed;
    private mouseDown;
    private mouseReleased;
    private mousePos;
    private mouseWheel;
    private containerElement;
    init(): void;
    update(): void;
    getKeyDown(key: string): boolean;
    getKeyPressed(key: string): boolean;
    getKeyReleased(key: string): boolean;
    getMousePosition(): Vec;
    getMouseDown(button: number): boolean;
    getMousePressed(button: number): boolean;
    getMouseReleased(button: number): boolean;
    getMouseWheel(): Vec;
    setCursor(type: Cursor): void;
}
export declare enum Cursor {
    Hidden = "none",
    Default = "default",
    Pointer = "pointer",
    Help = "help",
    Loading = "wait",
    Crosshair = "crosshair",
    Grab = "grab",
    Grabbing = "grabbing",
    NotAllowed = "not-allowed"
}
export declare enum Mouse {
    Left = 0,
    Middle = 1,
    Right = 2
}
