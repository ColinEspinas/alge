import Component from "../../core/components/Component";

export default class PlayerController extends Component {
	
	public Init() {
		window.addEventListener("keydown", e =>{
			if (e.key === "z") {
				this.parent.transform.position.y -= 1;
			}
			if (e.key === "q") {
				this.parent.transform.position.x -= 1;
			}
			if (e.key === "s") {
				this.parent.transform.position.y += 1;
			}
			if (e.key === "d") {
				this.parent.transform.position.x += 1;
			}
			e.preventDefault();
		}, false);
	}
	
	public Update() {
		
	}
}