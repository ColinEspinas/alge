import Engine from './core/Engine';
import Vec from './core/utilities/Vec';

const engine = new Engine({fullscreen: true});

engine.Run();

let vec : Vec = new Vec(2, 3);
let vec2 = Vec.FromArray([1, 3]);

