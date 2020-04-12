import Component from "../core/Component";
import Entity from "../core/Entity";
import DrawManager from "../managers/DrawManager";
import Two from 'two.js';

export default class SpriteRenderer extends Component {
	
	protected _name : string = "SpriteRenderer";
	
	public image : string;
	public scale : number;

	private texture : Two.Texture;
	private shape : Two.Rectangle;

	private stretchMode : SpriteMode;

	public Create() {
		this.image = this.properties["image"];
		this.scale = 1;
		this.stretchMode = this.properties["stretchMode"];
	}

	public Init() {
		this.texture = new Two.Texture(this.image);
		this.shape = this.parent.engine.GetManager(DrawManager).GetContext().makeRectangle(
			this.parent.transform.position.x,
			this.parent.transform.position.y,
			this.parent.transform.scale.x,
			this.parent.transform.scale.y,
		);
		this.shape.noStroke();
		this.shape.fill = this.texture;
	}

	public Update() {
		this.shape.width = this.parent.transform.scale.x;
		this.shape.height = this.parent.transform.scale.y;

		switch (this.stretchMode) {
			case 0: {
				let imgRatio = this.texture.image.naturalWidth / this.texture.image.naturalHeight;
				if (imgRatio < 1) {
					this.texture.scale = new Two.Vector(
						this.scale * (this.shape.height / this.texture.image.naturalHeight),
						this.scale * (this.shape.height / this.texture.image.naturalHeight)
					);
				}
				else {
					this.texture.scale = new Two.Vector(
						this.scale * (this.shape.width / this.texture.image.naturalWidth),
						this.scale * (this.shape.width / this.texture.image.naturalWidth)
					);
				}
				break;
			}
			case 1: {
				let imgRatio = this.texture.image.naturalWidth / this.texture.image.naturalHeight;
				if (imgRatio < 1) {
					this.texture.scale = new Two.Vector(
						this.scale * (this.shape.width / this.texture.image.naturalWidth),
						this.scale * (this.shape.width / this.texture.image.naturalWidth)
					);
				}
				else {
					this.texture.scale = new Two.Vector(
						this.scale * (this.shape.height / this.texture.image.naturalHeight),
						this.scale * (this.shape.height / this.texture.image.naturalHeight)
					);
				}
				break;
			}
			case 2: {
				this.texture.scale = new Two.Vector(
					this.scale * (this.shape.width / this.texture.image.naturalWidth),
					this.scale * (this.shape.height / this.texture.image.naturalHeight)
				);
				break;
			}
		}
		this.shape.translation.set(
			this.parent.transform.position.x,
			this.parent.transform.position.y,
		);
	}

	public Unload() {
		this.shape.remove();
	}
}

export enum SpriteMode {
	BestFit = 0,
	Cover = 1,
	Stretch = 2,
	Unscaled = 3,
}
