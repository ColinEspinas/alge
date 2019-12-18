import Component from "./Component";
import Entity from "../entities/Entity";
import Two from 'two.js';
import DrawManager from "../draw/DrawManager";

export default class SpriteRenderer extends Component {
	
	private image : string;
	private texture : Two.Texture;
	private shape : Two.Rectangle;

	private stretchToFit : boolean;

	constructor(parent : Entity, args : any[]) {
		super(parent);
		this.image = args[0];
		this.stretchToFit = args[1];
	}

	public Init() {
		this.texture = new Two.Texture(this.image);
		this.shape = DrawManager.GetDriver().makeRectangle(
			this.parent.transform.position.x, 
			this.parent.transform.position.y, 
			this.parent.transform.scale.x,
			this.parent.transform.scale.y,
		);
		this.shape.noStroke();
		if (this.stretchToFit) {

			let imgRatio = this.texture.image.naturalWidth / this.texture.image.naturalHeight;

			if (imgRatio < 1) {
				this.texture.scale = new Two.Vector(
					1 * (this.shape.height / this.texture.image.naturalHeight), 
					1 * (this.shape.height / this.texture.image.naturalHeight)
				);
			}
			else {
				this.texture.scale = new Two.Vector(
					1 * (this.shape.width / this.texture.image.naturalWidth), 
					1 * (this.shape.width / this.texture.image.naturalWidth)
				);
			}
		}
		this.shape.fill = this.texture;
		console.log(this.shape);
	}

	public Update() {
		this.shape.translation.set(
			this.parent.transform.position.x, 
			this.parent.transform.position.y,
		);
	}
}