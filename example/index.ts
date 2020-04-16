import { Engine, Scene, SceneManager } from '../dist/alge';
import Player from "./entities/Player";
import Ground from "./entities/Ground";

// scene.entities.push(new Player("https://upload.wikimedia.org/wikipedia/commons/9/9a/Gull_portrait_ca_usa.jpg"));

// scene2.entities.push(new Player("https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/1280px-Image_created_with_a_mobile_phone.png"));

const game = new Engine({fullscreen: true});

let mainScene : Scene = game.GetManager(SceneManager).CreateScene("test");
let player1 = mainScene.AddEntity(Player, "PlayerEntity");
let ground = mainScene.AddEntity(Ground, "GroundEntity");

game.Run();
