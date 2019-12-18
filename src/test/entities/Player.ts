import Entity from "../../core/entities/Entity";
import SpriteRenderer from "../../core/components/SpriteRenderer";
import Vec from "../../core/utilities/Vec";
import PlayerController from "../components/PlayerController";

export default class Player extends Entity {
	constructor() {
		super();
		this.transform.scale.Scale(100);
		this.transform.position.Add(new Vec(200, 200));
		this.AddComponent(SpriteRenderer, "http://pixelartmaker.com/art/506f48bc547c184.png", true);
		this.AddComponent(PlayerController);
	}
}