import { Entity, Sprite, SpriteMode, Vec, Tileset, RigidBody, Text, Camera} from "../../dist/alge";
import PlayerController from "../components/PlayerController";
import FPSCounter from "../components/FPSCounter";
import image from '../assets/Terrain_32.png';

export default class Player extends Entity {

	protected sprite : Sprite;

	public Create() {

		this.transform.scale.Scale(32 * this.engine.gameScale);
		this.transform.position.Add(new Vec(100, 100));

		// let tileset = new Tileset(image, 19, 13, 32, 32);

		// this.AddComponent(Sprite, "Sprite", {
		// 	src: tileset.GetTile(26), 
		// 	stretchMode : SpriteMode.Cover,
		// 	anchor: new Vec(0.5, 0.5),
		// });

		// this.AddComponent(RigidBody, {
		// 	options: {
		// 		inertia: Infinity
		// 	}
		// });

		let playerctrl = new PlayerController(this, "PlayerController");
		this.AddComponent(playerctrl);

		let fpscounter = new FPSCounter(this, "FPSCounter");
		this.AddComponent(fpscounter);

		this.sprite = new Sprite(this, "Sprite", {
			src: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Gull_portrait_ca_usa.jpg/300px-Gull_portrait_ca_usa.jpg",
			layer: "Default",
		});
		this.AddComponent(this.sprite);
	}

	Update() {
		this.sprite.properties["position"] = Vec.Zero();
	}

	
}