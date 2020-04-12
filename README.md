# A<sub><sup>wesome</sup></sub>L<sub><sup>ittle</sup></sub>G<sub><sup>ame</sup></sub>E<sub><sup>ngine</sup></sub>

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
	
	protected inputManager : InputManager = this.parent.engine.GetManager(InputManager);
	protected timeManager : TimeManager = this.parent.engine.GetManager(TimeManager);
	public speed : number = 10;

	public Init() {
		this.inputManager.SetCursor(Cursor.Hidden);
	}
	
	public Update() {

		if (this.inputManager.GetKeyDown(Key.UpArrow)) {
			this.parent.transform.position.y -= this.speed * this.time.deltaTime * 100;
		}
		if (this.inputManager.GetKeyDown(Key.DownArrow)) {
			this.parent.transform.position.y += this.speed * this.time.deltaTime * 100;
		}
		if (this.inputManager.GetKeyDown(Key.LeftArrow)) {
			this.parent.transform.position.x -= this.speed * this.time.deltaTime * 100;
		}
		if (this.inputManager.GetKeyDown(Key.RightArrow)) {
			this.parent.transform.position.x += this.speed * this.time.deltaTime * 100;
		}
	}
}
```

Create a `Player` entity and add a `SpriteRenderer` component to display a sprite and the `PlayerController` component previously created:
```typescript
// entities/Player.ts
import { Entity, SpriteRenderer, SpriteMode, Engine} from "alge";
import PlayerController from "../components/PlayerController";

export default class Player extends Entity {
	public Create() {
		super(engine, name);
		this.AddComponent(SpriteRenderer, "Sprite", { 
			image: this.properties["sprite"], 
			stretchMode : SpriteMode.Cover,
		});
		this.AddComponent(PlayerController, "Controller");
	}
}
```

Instanciate the alge's `Engine` class and create a `Scene` using the `SceneManager`. Then add your `Player` entity to the scene and run the engine:
```typescript
// index.ts
import { Engine, Scene, SceneManager } from 'alge';
import Player from "./entities/Player";

const game = new Engine({fullscreen: true});

let mainScene : Scene = game.GetManager(SceneManager).CreateScene("test");
mainScene.AddEntity(Player, "PlayerEntity", { sprite:"path/to/sprite" });

game.Run();
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
