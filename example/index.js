import { Engine, Scene } from '../dist/alge';
import Player from "./entities/Player";

let scene = new Scene();
scene.entities.push(new Player());

const scenes = [scene];

const engine = new Engine({fullscreen: true, scenes: scenes});

engine.Run();
