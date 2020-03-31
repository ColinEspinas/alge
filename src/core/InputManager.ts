import Vec from "./utilities/Vec";

export default class InputManager {

	private static _instance : InputManager;
	private static pressed : { [key: number]: boolean; } = {};
	private static down : { [key: number]: boolean; } = {};
	private static released : { [key: number]: boolean; } = {};
	private static mousePressed : { [key: number]: boolean; } = {};
	private static mouseDown : { [key: number]: boolean; } = {};
	private static mouseReleased : { [key: number]: boolean; } = {};
	private static mousePos : Vec = new Vec(0, 0);
	private static mouseWheel : Vec = new Vec(0, 0, 0);
	private containerElement : HTMLElement;

	private constructor() {}

	static get instance() : InputManager {
		if (!InputManager._instance) {
			InputManager._instance = new InputManager();
		}
		return InputManager._instance;
	}
	
	public Init(container : string) : void {

		// Get container to fire events from:
		this.containerElement = document.querySelector(container);

		// Setup keyboard events:
		this.containerElement.addEventListener('keydown', (e : KeyboardEvent) => {
			InputManager.down[e.keyCode] = true;
			if (!e.repeat) {
				InputManager.pressed[e.keyCode] = true;
			}
		});
		this.containerElement.addEventListener('keyup', (e : KeyboardEvent) => { 
			InputManager.down[e.keyCode] = false;
			InputManager.released[e.keyCode] = true;
		});

		// Setup mouse events:
		this.containerElement.addEventListener('mousemove', (e : MouseEvent) => {
			InputManager.mousePos.x = e.clientX; 
			InputManager.mousePos.y = e.clientY;
		});
		this.containerElement.addEventListener('mousedown', (e : MouseEvent) => {
			InputManager.mouseDown[e.button] = true;
			InputManager.mousePressed[e.button] = true;
		});
		this.containerElement.addEventListener('mouseup', (e : MouseEvent) => { 
			InputManager.mouseDown[e.button] = false;
			InputManager.mouseReleased[e.button] = true;
		});
		this.containerElement.addEventListener('wheel', (e : WheelEvent) => {
			InputManager.mouseWheel.x += e.deltaX;
			InputManager.mouseWheel.y += e.deltaY;
			InputManager.mouseWheel.z += e.deltaZ;
		});
	}

	public Update() {
		for (var i = 0, len = Object.keys(InputManager.pressed).length; i < len; i++) {
			InputManager.pressed[Object.keys(InputManager.pressed)[i]] = false;
		}
		for (var i = 0, len = Object.keys(InputManager.released).length; i < len; i++) {
			InputManager.released[Object.keys(InputManager.released)[i]] = false;
		}
		for (var i = 0, len = Object.keys(InputManager.mouseReleased).length; i < len; i++) {
			InputManager.mouseReleased[Object.keys(InputManager.mouseReleased)[i]] = false;
		}
	}

	static GetKeyDown(key : number) : boolean {
		return this.down[key];
	}

	static GetMousePosition() : Vec {
		return this.mousePos;
	}

	static GetMouseDown(button : number) : boolean {
		return this.mouseDown[button];
	}

	static GetMouseReleased(button : number) : boolean {
		return this.mouseReleased[button];
	}

	static GetMouseWheel() : Vec {
		return this.mouseWheel;
	}

	static SetCursor(type : Cursor) : void {
		this.instance.containerElement.style.cursor = type;
	}

	static GetKeyPressed(key : number) {
		return this.pressed[key];
	}

	static GetKeyReleased(key : number) {
		return this.released[key];
	}
}

export enum Cursor {
	Hidden = "none",
	Default = "default",
	Pointer = "pointer",
	Help = "help",
	Loading = "wait",
	Crosshair = "crosshair",
	Grab = "grab",
	Grabbing = "grabbing",
	NotAllowed = "not-allowed",
}

export enum Mouse {
	Left = 0,
	Middle = 1,
	Right = 2,
}

export enum Key {
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
	ClosedParen = Zero,
	One = 49,
	ExclamationMark = One,
	Two = 50,
	AtSign = Two,
	Three = 51,
	PoundSign = Three,
	Hash = PoundSign,
	Four = 52,
	DollarSign = Four,
	Five = 53,
	PercentSign = Five,
	Six = 54,
	Caret = Six,
	Hat = Caret,
	Seven = 55,
	Ampersand = Seven,
	Eight = 56,
	Star = Eight,
	Asterik = Star,
	Nine = 57,
	OpenParen = Nine,

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
	UnderScore = Dash,
	PlusSign = Equals,
	ForwardSlash = 191,
	Tilde = 192,
	GraveAccent = Tilde,

	OpenBracket = 219,
	ClosedBracket = 221,
	Quote = 222
}