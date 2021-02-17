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
    private gamepadPressed;
    private gamepadWasPressed;
    private gamepadDown;
    private gamepadReleased;
    private containerElement;
    mode: string;
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
    getButtonDown(gamepadIndex: number, button: string): boolean;
    getButtonPressed(gamepadIndex: number, button: string): boolean;
    getButtonValue(gamepadIndex: number, button: string): number;
    getButtonReleased(gamepadIndex: number, button: string): boolean;
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
export declare enum Buttons {
    'A' = 0,
    'B' = 1,
    'X' = 2,
    'Y' = 3,
    'LB' = 4,
    'RB' = 5,
    'LT' = 6,
    'RT' = 7,
    'Back' = 8,
    'Start' = 9,
    'LSB' = 10,
    'RSB' = 11,
    'DPad-Up' = 12,
    'DPad-Down' = 13,
    'DPad-Left' = 14,
    'DPad-Right' = 15,
    'Power' = 16
}
