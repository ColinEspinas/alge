// Core :
import Engine from './core/Engine';
import Entity from './core/Entity';
import Transform from './core/Transform';
import Component from './core/Component';

// Base Entities:
import Camera from './entities/Camera';

// Base Managers:
import PIXIRenderManager from './managers/PIXIRenderManager';
import InputManager from './managers/InputManager';
import TimeManager from './managers/TimeManager';
import BaseSceneManager from './managers/BaseSceneManager';
import PIXISceneManager from './managers/PIXISceneManager';
import PMSceneManager from './managers/PMSceneManager';
import PMPhysicsManager from './managers/PMPhysicsManager';
import AudioManager from './managers/AudioManager';

// Base Components:
import Sprite from './components/Sprite';
import Text from './components/Text';
import RigidBody from './components/RigidBody';
import Tilemap from './components/Tilemap';
import TilemapBody from './components/TilemapBody';
// Debug Components:
import DebugCollider from './components/Debug/DebugCollider';

// Base Scenes:
import BaseScene from './scenes/BaseScene';
import PIXIScene from './scenes/PIXIScene';
import PMScene from './scenes/PMScene'

// Base Utilities:
import Vec from './utilities/Vec';
import Angle from './utilities/Angle';
import Ease from './utilities/Ease';
import Noise from './utilities/Noise';
import Tileset from './utilities/Tileset';
import Viewport from './utilities/Viewport';
import Intersects from './utilities/Intersects';

import { Key, Cursor, Mouse } from './managers/InputManager';
import { SpriteMode } from './components/Sprite';

// Default dependencies
import * as PIXI from 'pixi.js';
import * as Matter from 'matter-js';

export {
	// Core:
	Engine,
	Entity,
	Transform,
	Component,

	// Base entities:
	Camera,

	// Base Managers:
	PIXIRenderManager,
	InputManager,
	TimeManager,
	BaseSceneManager,
	PIXISceneManager,
	PMSceneManager,
	PMPhysicsManager,
	AudioManager,

	// Base Components:
	Sprite,
	Text,
	RigidBody,
	Tilemap,
	TilemapBody,
	// Debug Components:
	DebugCollider,

	// Base Scenes:
	BaseScene,
	PIXIScene,
	PMScene,

	// Base Utilities:
	Vec,
	Angle,
	Ease,
	Noise,
	Tileset,
	Viewport,
	SpriteMode,
	Key,
	Cursor,
	Mouse,
	Intersects,

	PIXI,
	Matter,
}