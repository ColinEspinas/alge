# alge

Scene -> Entity -> Component based game engine written in Typescript.

**Created and used for personal purpose only, use at your own risk.**

**There is no documentation available at the moment.**


## Usage

### Basic player controlled entity example:

File structure:
```
.
+-- index.ts
+-- entities
|   +-- Player.ts
+-- components
    +-- PlayerController.ts
```

Create a `PlayerController` component to manage inputs from the player:
```typescript
// components/PlayerController.ts
import { Component, InputManager, Key, Cursor, TimeManager } from "alge";

export default class PlayerController extends Component {
	
	protected input : InputManager = this.parent.engine.getManager("Input");
	protected time : TimeManager = this.parent.engine.getManager("Time");;
	public speed : number = 10;

	public init() {
		this.input.SetCursor(Cursor.Hidden);
	}
	
	public update() {

		if (this.input.getKeyDown(Key.UpArrow)) {
			this.parent.transform.position.y -= this.speed * this.time.deltaTime * 100;
		}
		if (this.input.getKeyDown(Key.DownArrow)) {
			this.parent.transform.position.y += this.speed * this.time.deltaTime * 100;
		}
		if (this.input.getKeyDown(Key.LeftArrow)) {
			this.parent.transform.position.x -= this.speed * this.time.deltaTime * 100;
		}
		if (this.input.getKeyDown(Key.RightArrow)) {
			this.parent.transform.position.x += this.speed * this.time.deltaTime * 100;
		}
	}
}
```

Create a `Player` entity and add a `Sprite` component to display a sprite and the `PlayerController` component previously created:
```typescript
// entities/Player.ts
import { Entity, Sprite, Engine} from "alge";
import PlayerController from "../components/PlayerController";

export default class Player extends Entity {

	protected sprite : Sprite;
	protected controller : PlayerController;

	public create() {
		this.sprite = new Sprite(this, "Sprite", { 
			src: this.properties["sprite"],
		});
		this.addComponent(this.sprite);

		this.controller = new PlayerController(this, "Controller");
		this.addComponent(this.controller);
	}
}
```

Instanciate the alge's `Engine` class and create a `PIXIScene` using the `PIXISceneManager`. Then add a `Camera` and your `Player` entity to the scene and run the engine:
```typescript
// index.ts
import { Engine, PIXIScene } from 'alge';
import Player from "./entities/Player";

const game = new Engine({fullscreen: true});

let mainScene : PIXIScene = game.getManager("Scene").createScene("MainScene");

let camera = new Camera("MainCamera");
mainScene.addEntity(camera);

let player = new Player("Player", { sprite:"path/to/sprite" });
mainScene.addEntity(player);

game.run();
```



<!-- LICENSE -->
## License

alge is distributed under the MIT License. See `LICENSE` for more information.



<!-- CONTACT -->
## Contact
[![Buy me a coffee badge](https://img.shields.io/badge/-Buy%20me%20a%20coffee-important?logo=buy%20me%20a%20coffee&logoColor=white)](https://www.buymeacoffee.com/ColinEspinas)
[![LinkedIn badge](https://img.shields.io/badge/-LinkedIn-black.svg?logo=linkedin&colorB=555)](https://www.linkedin.com/in/colin-espinas-9739b8178/l)

Colin Espinas - [Website](https://colinespinas.com) - contact@colinespinas.com

Project link: [https://github.com/ColinEspinas/alge](https://github.com/ColinEspinas/alge)
