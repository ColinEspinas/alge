import { Engine, Scene, SceneManager, Camera } from '../dist/alge';
import Player from "./entities/Player";
import Ground from "./entities/Ground";

// scene.entities.push(new Player("https://upload.wikimedia.org/wikipedia/commons/9/9a/Gull_portrait_ca_usa.jpg"));

// scene2.entities.push(new Player("https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/1280px-Image_created_with_a_mobile_phone.png"));

const game = new Engine({fullscreen: true, gameScale: 3});

let mainScene : Scene = game.GetManager("Scene").CreateScene("test");
let testScene : Scene = game.GetManager("Scene").CreateScene("test2");

let camera = new Camera("MainCamera");
mainScene.AddEntity(camera);

let player1 = new Player("PlayerEntity");
mainScene.AddEntity(player1);
let ground = new Ground("GroundEntity");
mainScene.AddEntity(ground);

let player2 = new Player("PlayerEntity");
testScene.AddEntity(player2);
let ground2 = new Ground("GroundEntity");
testScene.AddEntity(ground2);

game.Run();
