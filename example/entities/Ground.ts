import { Entity, Sprite, SpriteMode, Vec, Tileset, RigidBody} from "../../dist/alge";
import PlayerController from "../components/PlayerController";
import image from '../assets/Terrain_32.png';

export default class Ground extends Entity {

	public Create() {

		this.transform.scale = new Vec(1000, 32);
		this.transform.position.Add(new Vec(700, 500));

		let tileset = new Tileset(image, 19, 13, 32, 32);

		this.AddComponent(Sprite, "Sprite", {
			src: tileset.GetTile(21),
			anchor: new Vec(0.5,0.5)
		});

		this.AddComponent(RigidBody, "RigidBody", { 
			options: {
				isStatic: true 
			},
		});
	}
}