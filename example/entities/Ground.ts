import { Entity, Sprite, SpriteMode, Vec, Tileset, RigidBody, Tilemap} from "../../dist/alge";
import PlayerController from "../components/PlayerController";
import image from '../assets/Terrain_32.png';

export default class Ground extends Entity {

	protected rb : RigidBody;

	public Create() {

		this.transform.position.Add(new Vec(700, 500));

		
		let tilemap = this.AddComponent(Tilemap, {
			tileset: new Tileset(image, 19, 13, 32, 32),
			width: 6,
			height: 2,
			map: [
				20, 21, 21, 21, 21, 22,
				58, 59, 59, 59, 59, 60,
			]
		});

		this.rb = this.AddComponent(RigidBody, { 
			options: {
				isStatic: true 
			},
		});

		this.rb.OnCollisionEnd((other)=>{
			console.log(other.velocity);
		});
	}
}