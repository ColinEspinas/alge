import { Component, InputManager, Key, Cursor, Mouse , TimeManager, SceneManager, DrawManager } from "../../dist/alge";
import Player from "../entities/Player";

export default class PlayerController extends Component {
	
	protected inputManager : InputManager = this.parent.engine.GetManager(InputManager);
	protected time : TimeManager = this.parent.engine.GetManager(TimeManager);
	protected sceneManager : SceneManager = this.parent.engine.GetManager(SceneManager);

	public Init() {
		this.inputManager.SetCursor(Cursor.Hidden);
		console.log("Player1 Init");
		console.log(this.parent);
	}
	
	public Update() {

		if (this.inputManager.GetKeyDown(Key.UpArrow)) {
			this.parent.transform.position.y -= 10 * this.time.deltaTime * 100;
		}
		if (this.inputManager.GetKeyDown(Key.DownArrow)) {
			this.parent.transform.position.y += 10 * this.time.deltaTime * 100;
		}
		if (this.inputManager.GetKeyDown(Key.LeftArrow)) {
			this.parent.transform.position.x -= 10 * this.time.deltaTime * 100;
		}
		if (this.inputManager.GetKeyDown(Key.RightArrow)) {
			this.parent.transform.position.x += 10 * this.time.deltaTime * 100;
		}
		if (this.inputManager.GetMouseDown(Mouse.Left)) {
			this.parent.transform.position.y -= 10 * this.time.deltaTime * 100;
		}

		this.parent.transform.position = this.inputManager.GetMousePosition();
		this.parent.transform.scale.x = this.inputManager.GetMouseWheel().y + 200;
		this.parent.transform.scale.y = this.inputManager.GetMouseWheel().y + 200;

		if (this.inputManager.GetKeyPressed(Key.L)) {
			this.sceneManager.LoadSceneByName("test2");
		}
	}
}