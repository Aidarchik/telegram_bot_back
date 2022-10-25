import Scene from 'node-vk-bot-api/lib/scene.js';
import { sceneMiddlewares } from './sceneMiddlewares.js';
import { triggers } from './triggers.js';

export const scenes = [];

triggers.map((trigger) => scenes.push(new Scene(trigger, ...sceneMiddlewares[trigger])));
