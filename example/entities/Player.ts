import { Entity, SpriteRenderer, SpriteMode, Vec, Engine} from "../../dist/alge";
import FPSCounter from "../components/FPSCounter";

export default class Player extends Entity {

	public Create() {
		this.AddComponent(SpriteRenderer, "Sprite", { 
			image: this.properties["sprite"], 
			stretchMode : SpriteMode.Cover,
		});
		this.AddComponent(FPSCounter, "FPSCounter");
	}
}