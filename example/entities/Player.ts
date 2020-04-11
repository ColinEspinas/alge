import { Entity, SpriteRenderer, SpriteMode, Vec, Engine} from "../../dist/alge";
import FPSCounter from "../components/FPSCounter";

export default class Player extends Entity {
	constructor(engine : Engine, name, image_src) {
		super(engine, name);
		this.AddComponent(SpriteRenderer, "Sprite", image_src, SpriteMode.Cover);
		this.AddComponent(FPSCounter, "FPSCounter");
	}
}