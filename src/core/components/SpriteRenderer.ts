import Component from "./Component";
import Entity from "../entities/Entity";
import Two from 'two.js';
import DrawManager from "../draw/DrawManager";

export default class SpriteRenderer extends Component {
	
	private image : string;
	private texture : Two.Texture;
	private shape : Two.Rectangle;

	constructor(parent : Entity, args : any[]) {
		super(parent);
		this.image = args[0];
	}

	public Init() {
		this.texture = new Two.Texture(this.image, ()=>{});
		this.shape = DrawManager.GetDriver().makeRectangle(
			this.parent.transform.position.x, 
			this.parent.transform.position.y, 
			this.parent.transform.scale.x,
			this.parent.transform.scale.y,
		);
		this.shape.fill = this.texture;
	}

	public Update() {
		this.shape.translation.set(
			this.parent.transform.position.x, 
			this.parent.transform.position.y,
		);
	}
}