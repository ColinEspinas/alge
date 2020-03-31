import { Entity, SpriteRenderer, SpriteMode, Vec} from "../../dist/alge";
import PlayerController from "../components/PlayerController";
import FPSCounter from "../components/FPSCounter";

export default class Player extends Entity {
	constructor() {
		super();
		this.transform.scale.Scale(100);
		this.transform.position.Add(new Vec(200, 200));
		this.AddComponent(SpriteRenderer, "https://upload.wikimedia.org/wikipedia/commons/9/9a/Gull_portrait_ca_usa.jpg", SpriteMode.Cover);
		this.AddComponent(PlayerController);
		this.AddComponent(FPSCounter);
		console.log(this.GetComponent(FPSCounter));
	}
}