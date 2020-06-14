import { Component, InputManager, Key , TimeManager, SceneManager, RigidBody, Vec, Mouse, Camera, RenderManager, Entity, Ease, Noise } from "../../dist/alge";
import Box from "../entities/Box";

export default class PlayerController extends Component {
	
	protected inputManager : InputManager;
	protected sceneManager : SceneManager;
	protected rb : RigidBody;
	protected camera : Camera;
	protected lastbox : Box;
	test = 0;

	public Create() {
		this.inputManager = this.parent.engine.GetManager("Input");
		this.sceneManager = this.parent.engine.GetManager("Scene");
	}

	public Init() {

		this.camera = this.parent.scene.GetEntity("MainCamera");
		
		// this.camera.Zoom(4);
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
		if (this.inputManager.GetKeyDown(Key.D)) {
			this.camera.AddTrauma(0.1);
		}

		if (this.inputManager.GetMousePressed(Mouse.Left)) {
			let box = new Box("Box", {
				position: this.camera.CameraToWorld(this.inputManager.GetMousePosition())
			});
			this.lastbox = this.sceneManager.GetLoadedScene().AddEntity(box);
			this.camera.target = {
				entity: this.lastbox, 
				options: {
					duration: 0.05,
					centered: true,
				},
				horizontal: true,
				vertical: true,
			};
		}

		// console.log("Cam = ", this.camera.position);
		// console.log("Mouse = ", this.inputManager.GetMousePosition());
		// console.log("Dist = " + this.inputManager.GetMousePosition().Distance(this.camera.position))
		// this.camera.Update(this.engine.GetManager("Time").deltaTime);

		// this.camera.Zoom(Math.max(0.01, this.inputManager.GetMouseWheel().y * 0.001 + 1));

		if (this.inputManager.GetKeyDown(Key.N)) {
			let noise = Noise.Perlin(2, "test");
			console.log("test= " + this.test + " noise = " + noise.gen(this.test + 0.5, this.test + 0.5));
			this.test++;
		}

		if (this.inputManager.GetKeyPressed(Key.V)) {
			if (this.sceneManager.GetLoadedScene().name === "test") {
				this.sceneManager.LoadSceneByName("test2");
			} else {
				this.sceneManager.LoadSceneByName("test");
			}
		}

		// console.log(this.GetManager(TimeManager).deltaTime);
	}
}