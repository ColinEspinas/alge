import { Entity, Sprite, SpriteMode, Vec, Tileset, RigidBody} from "../../dist/alge";
import PlayerController from "../components/PlayerController";
import image from '../assets/Terrain_32.png';

export default class Player extends Entity {

	public Create() {

		this.transform.scale.Scale(32);
		this.transform.position.Add(new Vec(100, 100));

		// let tileset = new Tileset(image, 19, 13, 32, 32);

		// this.AddComponent(Sprite, "Sprite", {
		// 	src: tileset.GetTile(26), 
		// 	stretchMode : SpriteMode.Cover,
		// 	anchor: new Vec(0.5, 0.5),
		// });

		// this.AddComponent(RigidBody, "RigidBody", {
		// 	options: {
		// 		inertia: Infinity
		// 	}
		// });

		this.AddComponent(PlayerController, "PlayerController");
	}
}