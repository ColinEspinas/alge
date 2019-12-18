import Component from "../../core/components/Component";
import InputManager, { Key } from "../../core/inputs/InputManager";
import Time from "../../core/Time";

export default class PlayerController extends Component {
	
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
	}
}