import { Component, InputManager, Key, Cursor, Mouse , TimeManager } from "../../dist/alge";

export default class PlayerController extends Component {
	
	protected _name: string = "PlayerController";
	
	public Init() {
		InputManager.SetCursor(Cursor.Hidden);
	}
	
	public Update() {
		if (InputManager.GetKeyDown(Key.UpArrow)) {
			this.parent.transform.position.y -= 10 * TimeManager.DeltaTime() * 100;
		}
		if (InputManager.GetKeyDown(Key.DownArrow)) {
			this.parent.transform.position.y += 10 * TimeManager.DeltaTime() * 100;
		}
		if (InputManager.GetKeyDown(Key.LeftArrow)) {
			this.parent.transform.position.x -= 10 * TimeManager.DeltaTime() * 100;
		}
		if (InputManager.GetKeyDown(Key.RightArrow)) {
			this.parent.transform.position.x += 10 * TimeManager.DeltaTime() * 100;
		}
		if (InputManager.GetMouseDown(Mouse.Left)) {
			this.parent.transform.position.y -= 10 * TimeManager.DeltaTime() * 100;
		}

		this.parent.transform.position = InputManager.GetMousePosition();
		this.parent.transform.scale.x = InputManager.GetMouseWheel().y + 200;
		this.parent.transform.scale.y = InputManager.GetMouseWheel().y + 200;

		
	}
}