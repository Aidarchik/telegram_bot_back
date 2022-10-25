import { token, vkOptions, vkOptionsElectron, tokenElecton } from './auth_data.js';
import VK from './VkBot.js';
import Session from 'node-vk-bot-api/lib/session.js';
import { scenes } from './scenes/scenes.js';
import Stage from 'node-vk-bot-api/lib/stage.js';
import { triggers } from './scenes/triggers.js';

const vk = new VK(vkOptionsElectron);
const session = new Session();
const stage = new Stage(...scenes);

vk.use(session.middleware());
vk.use(stage.middleware());

vk.command(triggers, (ctx) => {
    const text = ctx.message.text;
    if (triggers.includes(text)) {
        ctx.scene.enter(text);
    }
});

vk.startPolling();