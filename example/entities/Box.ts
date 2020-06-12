import { Entity, Sprite, Vec, SceneManager, DebugCollider ,Tileset, RigidBody } from '../../dist/alge';
import image from '../assets/Box.png';

export default class Box extends Entity {

	Create() {
		this.transform.scale = new Vec(21, 16);
		this.transform.position = this.properties["position"] || new Vec(100, 100);

		let tileset = new Tileset(image, 1, 1, 21, 16);

		let sprite = new Sprite(this, "Sprite", {
			src: tileset.GetTile(0)
		});
		this.AddComponent(sprite);

		let rb = new RigidBody(this, "RigidBody", {
			position: this.transform.position.Add(Vec.One()),
			scale: this.transform.scale.Sub(Vec.One()),
		})
		this.AddComponent(rb);
	}

}