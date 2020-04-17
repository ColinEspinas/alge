import { Component, InputManager, Key , TimeManager, SceneManager, RigidBody, Vec, Mouse } from "../../dist/alge";
import Box from "../entities/Box";

export default class PlayerController extends Component {
	
	protected inputManager : InputManager = this.parent.engine.GetManager(InputManager);
	protected time : TimeManager = this.parent.engine.GetManager(TimeManager);
	protected sceneManager : SceneManager = this.parent.engine.GetManager(SceneManager);
	protected rb : RigidBody;

	public Init() {

		this.rb = this.parent.GetComponent(RigidBody);
		
		// this.inputManager.SetCursor(Cursor.Hidden);
	}
	
	public Update() {

		if (this.inputManager.GetKeyPressed(Key.UpArrow)) {
			this.rb.ApplyForce(this.parent.transform.position, Vec.Up().Scale(0.02));
		}
		if (this.inputManager.GetKeyDown(Key.LeftArrow)) {
			this.rb.velocity = this.rb.velocity.Add(Vec.Left());
		}
		if (this.inputManager.GetKeyDown(Key.RightArrow)) {
			this.rb.velocity = this.rb.velocity.Add(Vec.Right());
		}

		if (this.inputManager.GetMouseDown(Mouse.Left)) {
			this.sceneManager.GetLoadedScene().AddEntity(Box, "Box", {
				position: Vec.From(this.inputManager.GetMousePosition())
			});
		}
	}
}