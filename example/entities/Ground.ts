import { Entity, Sprite, SpriteMode, Vec, Tileset, RigidBody, Tilemap, Camera, DebugCollider} from "../../dist/alge";
import PlayerController from "../components/PlayerController";
import image from '../assets/Terrain_32.png';

export default class Ground extends Entity {

	protected rb : RigidBody;

	public Create() {

		this.transform.position.Add(new Vec(700, 500));

		let tilemap = new Tilemap(this, "Tilemap", {
			tileset: new Tileset(image, 19, 13, 32, 32),
			width: 6,
			height: 3,
			map: [
				0, 20, 21, 22, 0, 0,
				20, 21, 21, 21, 21, 22,
				58, 59, 59, 59, 59, 60,
			]
		});
		this.AddComponent(tilemap);

		this.rb = new RigidBody(this, "RigidBody", { 
			options: {
				isStatic: true 
			},
		});
		this.AddComponent(this.rb);

		let debugCollider = new DebugCollider(this, "ColliderDebug", {
			body: this.rb,
			thickness: 5
		});
		this.AddComponent(debugCollider);

		console.log(debugCollider);
	}
}