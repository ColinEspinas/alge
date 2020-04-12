import { Engine, Scene, SceneManager } from '../dist/alge';
import Player from "./entities/Player";
import PlayerController from './components/PlayerController';
import PlayerController2 from './components/PlayerController2';

// scene.entities.push(new Player("https://upload.wikimedia.org/wikipedia/commons/9/9a/Gull_portrait_ca_usa.jpg"));

// scene2.entities.push(new Player("https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/1280px-Image_created_with_a_mobile_phone.png"));

const game = new Engine({fullscreen: true});

let mainScene : Scene = game.GetManager(SceneManager).CreateScene("test");
let player1 = mainScene.AddEntity(Player, "PlayerEntity", { 
	sprite: "https://upload.wikimedia.org/wikipedia/commons/9/9a/Gull_portrait_ca_usa.jpg" 
});
player1.AddComponent(PlayerController, "PlayerController");

let newScene : Scene = game.GetManager(SceneManager).CreateScene("test2");
let player2 = newScene.AddEntity(Player, "PlayerEntity", { 
	sprite: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/1280px-Image_created_with_a_mobile_phone.png"
});
player2.AddComponent(PlayerController2, "PlayerController");

game.Run();
