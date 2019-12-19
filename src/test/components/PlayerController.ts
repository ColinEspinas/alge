import Component from "../../core/components/Component";
import InputManager, { Key, Cursor } from "../../core/inputs/InputManager";
import Time from "../../core/Time";
import Vec from "../../core/utilities/Vec";
import SpriteRenderer, {SpriteMode} from "../../core/components/SpriteRenderer";

export default class PlayerController extends Component {
	
	protected _name: string = "PlayerController";
	
	public Init() {
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

		this.parent.transform.position = InputManager.GetMousePosition();
		InputManager.SetCursor(Cursor.Hidden);
		this.parent.transform.scale.x = InputManager.GetMouseWheel().y + 200;
		this.parent.transform.scale.y = InputManager.GetMouseWheel().y + 200;
	}
}