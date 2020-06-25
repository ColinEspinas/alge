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
    getKeyDown(key: number): boolean;
    getMousePosition(): Vec;
    getMouseDown(button: number): boolean;
    getMousePressed(button: number): boolean;
    getMouseReleased(button: number): boolean;
    getMouseWheel(): Vec;
    setCursor(type: Cursor): void;
    getKeyPressed(key: number): boolean;
    getKeyReleased(key: number): boolean;
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
export declare enum Key {
    Backspace = 8,
    Tab = 9,
    Enter = 13,
    Shift = 16,
    Ctrl = 17,
    Alt = 18,
    PauseBreak = 19,
    CapsLock = 20,
    Escape = 27,
    Space = 32,
    PageUp = 33,
    PageDown = 34,
    End = 35,
    Home = 36,
    LeftArrow = 37,
    UpArrow = 38,
    RightArrow = 39,
    DownArrow = 40,
    Insert = 45,
    Delete = 46,
    Zero = 48,
    ClosedParen = 48,
    One = 49,
    ExclamationMark = 49,
    Two = 50,
    AtSign = 50,
    Three = 51,
    PoundSign = 51,
    Hash = 51,
    Four = 52,
    DollarSign = 52,
    Five = 53,
    PercentSign = 53,
    Six = 54,
    Caret = 54,
    Hat = 54,
    Seven = 55,
    Ampersand = 55,
    Eight = 56,
    Star = 56,
    Asterik = 56,
    Nine = 57,
    OpenParen = 57,
    A = 65,
    B = 66,
    C = 67,
    D = 68,
    E = 69,
    F = 70,
    G = 71,
    H = 72,
    I = 73,
    J = 74,
    K = 75,
    L = 76,
    M = 77,
    N = 78,
    O = 79,
    P = 80,
    Q = 81,
    R = 82,
    S = 83,
    T = 84,
    U = 85,
    V = 86,
    W = 87,
    X = 88,
    Y = 89,
    Z = 90,
    LeftWindowKey = 91,
    RightWindowKey = 92,
    SelectKey = 93,
    Numpad0 = 96,
    Numpad1 = 97,
    Numpad2 = 98,
    Numpad3 = 99,
    Numpad4 = 100,
    Numpad5 = 101,
    Numpad6 = 102,
    Numpad7 = 103,
    Numpad8 = 104,
    Numpad9 = 105,
    Multiply = 106,
    Add = 107,
    Subtract = 109,
    DecimalPoint = 110,
    Divide = 111,
    F1 = 112,
    F2 = 113,
    F3 = 114,
    F4 = 115,
    F5 = 116,
    F6 = 117,
    F7 = 118,
    F8 = 119,
    F9 = 120,
    F10 = 121,
    F11 = 122,
    F12 = 123,
    NumLock = 144,
    ScrollLock = 145,
    SemiColon = 186,
    Equals = 187,
    Comma = 188,
    Dash = 189,
    Period = 190,
    UnderScore = 189,
    PlusSign = 187,
    ForwardSlash = 191,
    Tilde = 192,
    GraveAccent = 192,
    OpenBracket = 219,
    ClosedBracket = 221,
    Quote = 222
}
