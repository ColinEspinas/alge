import Entity from "../../core/entities/Entity";
import SpriteRenderer, { SpriteMode } from "../../core/components/SpriteRenderer";
import Vec from "../../core/utilities/Vec";
import PlayerController from "../components/PlayerController";

export default class Player extends Entity {
	constructor() {
		super();
		this.transform.scale.Scale(100);
		this.transform.position.Add(new Vec(200, 200));
		this.AddComponent(SpriteRenderer, "https://upload.wikimedia.org/wikipedia/commons/9/9a/Gull_portrait_ca_usa.jpg", SpriteMode.Cover);
		this.AddComponent(PlayerController);
	}
}