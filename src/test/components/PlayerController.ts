import Component from "../../core/components/Component";
import InputManager, { Key, Cursor, Mouse } from "../../core/inputs/InputManager";
import Time from "../../core/Time";

export default class PlayerController extends Component {
	
	protected _name: string = "PlayerController";
	
	public Init() {
		InputManager.SetCursor(Cursor.Hidden);
	}
	
	public Update() {
		if (InputManager.GetKeyDown(Key.UpArrow)) {
			this.parent.transform.position.y -= 10 * Time.DeltaTime() * 100;
		}
		if (InputManager.GetKeyDown(Key.DownArrow)) {
			this.parent.transform.position.y += 10 * Time.DeltaTime() * 100;
		}
		if (InputManager.GetKeyDown(Key.LeftArrow)) {
			this.parent.transform.position.x -= 10 * Time.DeltaTime() * 100;
		}
		if (InputManager.GetKeyDown(Key.RightArrow)) {
			this.parent.transform.position.x += 10 * Time.DeltaTime() * 100;
		}
		if (InputManager.GetMouseDown(Mouse.Left)) {
			this.parent.transform.position.y -= 10 * Time.DeltaTime() * 100;
		}

		this.parent.transform.position = InputManager.GetMousePosition();
		this.parent.transform.scale.x = InputManager.GetMouseWheel().y + 200;
		this.parent.transform.scale.y = InputManager.GetMouseWheel().y + 200;
	}
}