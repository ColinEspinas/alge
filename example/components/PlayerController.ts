import { Component, InputManager, Key , TimeManager, SceneManager, RigidBody, Vec, Mouse, Camera, RenderManager, Entity, Ease, Noise } from "../../dist/alge";
import Box from "../entities/Box";

export default class PlayerController extends Component {
	
	protected inputManager : InputManager = this.parent.engine.GetManager(InputManager);
	protected time : TimeManager = this.parent.engine.GetManager(TimeManager);
	protected sceneManager : SceneManager = this.parent.engine.GetManager(SceneManager);
	protected rb : RigidBody;
	protected camera : Camera;
	protected lastbox : Box;
	test = 0;

	public Init() {

		this.camera = new Camera(this.GetManager(RenderManager).viewport);
		
		// this.inputManager.SetCursor(Cursor.Hidden);
	}
	
	public Update() {

		if (this.inputManager.GetKeyDown(Key.UpArrow)) {
			this.camera.Move(Vec.Up(), 10);
		}
		if (this.inputManager.GetKeyDown(Key.LeftArrow)) {
			this.camera.Move(Vec.Left(), 10);
		}
		if (this.inputManager.GetKeyDown(Key.RightArrow)) {
			this.camera.Move(Vec.Right(), 10);
		}
		if (this.inputManager.GetKeyDown(Key.DownArrow)) {
			this.camera.Move(Vec.Down(), 10);
		}

		if (this.inputManager.GetMousePressed(Mouse.Left)) {
			this.lastbox = this.sceneManager.GetLoadedScene().AddEntity(Box, "Box", {
				position: this.camera.WorldToCamera(this.inputManager.GetMousePosition())
			});
		}

		if (this.lastbox) {
			this.camera.Follow(this.lastbox, {
				function: Ease.linear,
				duration: 20,
			});
		}

		if (this.inputManager.GetKeyDown(Key.N)) {
			let noise = Noise.Perlin(2, "test");
			console.log("test= " + this.test + " noise = " + ((noise.gen(this.test++, this.test++)  + 1) * 128));
		}
	}
}