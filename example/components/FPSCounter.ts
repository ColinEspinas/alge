import { Component, TimeManager, Text, Vec, CameraUtil } from "../../dist/alge";

export default class FPSCounter extends Component {
	
	public updateSpeed : number = 60;
	private timer : number;
	private textComponent : Text;
	private camera : CameraUtil;

	public Create() {
		this.textComponent = new Text(this.parent, "FPSText", {
			content: "0",
			style: {fontFamily : 'Arial', fontSize: 24, fill : 0x000000, align : 'left'},
			position: new Vec(0, 0),
			layer: "Debug"
			// scale: new Vec(100, 50)
		})
		this.parent.AddComponent(this.textComponent);
	}

	Init() {
		this.timer = this.updateSpeed;
		this.camera = new CameraUtil(this.engine.GetManager("Render").viewport);
	}

	Update() {
		let position = this.camera.WorldToCamera(new Vec(20, 20));
		this.textComponent.SetPosition(position);
		if (this.timer <= 0) {
			this.textComponent.SetText(Math.floor(this.engine.GetManager("Time").fps));
			this.timer = this.updateSpeed;
		}
		--this.timer;
	}
}