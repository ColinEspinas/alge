import Vec from "../utilities/Vec";
import Manager from "../core/Manager";

export default class InputManager extends Manager{
	
	protected _name: string = "InputManager";

	private pressed : { [key: number]: boolean; } = {};
	private down : { [key: number]: boolean; } = {};
	private released : { [key: number]: boolean; } = {};
	private mousePressed : { [key: number]: boolean; } = {};
	private mouseDown : { [key: number]: boolean; } = {};
	private mouseReleased : { [key: number]: boolean; } = {};
	private mousePos : Vec = new Vec(0, 0);
	private mouseWheel : Vec = new Vec(0, 0, 0);
	private containerElement : HTMLElement;

	public Init() : void {


		// Get container to fire events from:
		this.containerElement = document.querySelector(this.engine.container);

		// Setup keyboard events:
		this.containerElement.addEventListener('keydown', (e : KeyboardEvent) => {
			this.down[e.keyCode] = true;
			if (!e.repeat) {
				this.pressed[e.keyCode] = true;
			}
		});
		this.containerElement.addEventListener('keyup', (e : KeyboardEvent) => { 
			this.down[e.keyCode] = false;
			this.released[e.keyCode] = true;
		});

		// Setup mouse events:
		this.containerElement.addEventListener('mousemove', (e : MouseEvent) => {
			this.mousePos.x = e.clientX; 
			this.mousePos.y = e.clientY;
		});
		this.containerElement.addEventListener('mousedown', (e : MouseEvent) => {
			this.mouseDown[e.button] = true;
			this.mousePressed[e.button] = true;
		});
		this.containerElement.addEventListener('mouseup', (e : MouseEvent) => { 
			this.mouseDown[e.button] = false;
			this.mouseReleased[e.button] = true;
		});
		this.containerElement.addEventListener('wheel', (e : WheelEvent) => {
			this.mouseWheel.x += e.deltaX;
			this.mouseWheel.y += e.deltaY;
			this.mouseWheel.z += e.deltaZ;
		});
	}

	public Update() {
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

	public GetKeyDown(key : number) : boolean {
		return this.down[key];
	}

	public GetMousePosition() : Vec {
		return this.mousePos;
	}

	public GetMouseDown(button : number) : boolean {
		return this.mouseDown[button];
	}

	public GetMouseReleased(button : number) : boolean {
		return this.mouseReleased[button];
	}

	public GetMouseWheel() : Vec {
		return this.mouseWheel;
	}

	public SetCursor(type : Cursor) : void {
		this.containerElement.style.cursor = type;
	}

	public GetKeyPressed(key : number) {
		return this.pressed[key];
	}

	public GetKeyReleased(key : number) {
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