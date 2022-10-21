import { token, vkOptions, vkOptionsElectron, tokenElecton } from './auth_data.js';
import VK from 'node-vk-bot-api';
import Markup from 'node-vk-bot-api/lib/markup.js';
import Session from 'node-vk-bot-api/lib/session.js';
import Scene from 'node-vk-bot-api/lib/scene.js';
import Stage from 'node-vk-bot-api/lib/stage.js';

const scene = new Scene('meet',
    (ctx) => {
        ctx.scene.next();
        ctx.reply('Сколько тебе лет?', null, Markup
            .keyboard([
                '18-24', '25-30', '31 и старше'
            ])
            .oneTime()
        );
    },
    (ctx) => {
        ctx.session.age = ctx.message.text;
        ctx.scene.next();
        ctx.reply('Как тебя зовут?');
    },
    (ctx) => {
        ctx.session.name = ctx.message.text;

        ctx.scene.leave();
        ctx.reply(`Прекрасно, тебя зовут ${ctx.session.name} (Возраст: ${ctx.session.age})`);
    },
);

const vk = new VK(vkOptionsElectron);
const session = new Session();
const stage = new Stage(scene);

vk.use(async (ctx, next) => {
    try {
        await next();
    } catch (e) {
        console.error(e);
    }
});

vk.use(session.middleware());
vk.use(stage.middleware());

const message = 'Начнем опрос';
const attachment = null;
const markup = Markup.keyboard([[Markup.button('Начать', 'secondary'),],]).inline();
const sticker = '';
const ctxOptions = [message, attachment, markup, sticker];

vk.command('start', (ctx) => {
    ctx.reply(...ctxOptions);
    console.log(vk)
});

vk.command('Начать', (ctx) => {
    ctx.scene.enter('meet');
});

vk.startPolling();