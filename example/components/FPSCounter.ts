import { Component, TimeManager } from "../../dist/alge";

export default class FPSCounter extends Component {
	
	protected _name: string = "FPSCounter";
	
	public Init() {

	}
	
	public Update() {
		console.log(TimeManager.Fps());
	}
}