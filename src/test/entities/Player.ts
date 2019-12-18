import Entity from "../../core/entities/Entity";
import SpriteRenderer from "../../core/components/SpriteRenderer";
import Vec from "../../core/utilities/Vec";
import PlayerController from "../components/PlayerController";

export default class Player extends Entity {
	constructor() {
		super();
		this.transform.scale.Scale(200);
		this.transform.position.Add(new Vec(200, 200));
		this.AddComponent(SpriteRenderer, "https://upload.wikimedia.org/wikipedia/commons/9/9a/Gull_portrait_ca_usa.jpg");
		this.AddComponent(PlayerController);
	}
}