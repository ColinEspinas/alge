import { Entity, Sprite, Vec, SceneManager, Tileset, RigidBody } from '../../dist/alge';
import image from '../assets/Box.png';

export default class Box extends Entity {

	Create() {
		this.transform.scale = new Vec(22, 16);
		this.transform.position = this.properties["position"] || new Vec(100, 100);

		let tileset = new Tileset(image, 1, 1, 22, 16);

		this.AddComponent(Sprite, {
			src: tileset.GetTile(0)
		});

		this.AddComponent(RigidBody);
	}

}