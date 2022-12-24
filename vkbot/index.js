import { token, vkOptions, vkOptionsElectron, tokenElecton } from './auth_data.js';
import VK from './VkBot.js';
import Session from 'node-vk-bot-api/lib/session.js';
import Stage from 'node-vk-bot-api/lib/stage.js';
import Scene from 'node-vk-bot-api/lib/scene.js';
import { sceneMiddlewares } from './sceneMiddlewares.js';


function getScenesWithTriggers(middlewares) {
    let result = { scenes: [], triggers: [] };
    for (const [trigger, middleware] of Object.entries(middlewares)) {
        result.scenes.push(new Scene(trigger, ...middleware));
        result.triggers.push(trigger);
    }
    return result;
}

const { scenes, triggers } = getScenesWithTriggers(sceneMiddlewares);


const vk = new VK(vkOptionsElectron);
const session = new Session();
const stage = new Stage(...scenes);

vk.use(session.middleware());
vk.use(stage.middleware());

vk.command(triggers, (ctx) => {
    const text = ctx.message.text;
    console.log(ctx)
    if (triggers.includes(text)) {
        ctx.scene.enter(text);
    }
});


vk.startPolling();