import { Entity, Sprite, Vec, SceneManager, Tileset, RigidBody } from '../../dist/alge';
import image from '../assets/Box.png';

export default class Box extends Entity {

	Create() {
		this.transform.scale = new Vec(4, 4);
		this.transform.position = this.properties["position"] || new Vec(100, 100);

		let tileset = new Tileset(image, 1, 1, 22, 16);

		this.AddComponent(Sprite, "BoxSprite", {
			src: tileset.GetTile(0),
			anchor: new Vec(0.5, 0.5)
		});

		this.AddComponent(RigidBody, "RigidBody");
	}

}