
import Markup from 'node-vk-bot-api/lib/markup.js';

const optionsForReply = (attachment = 'photo-175111431_457241476', trigger = 'eldar') => {
    const message = 'Начнем опрос';
    const markup = Markup.keyboard([[Markup.button(trigger, 'secondary'),],]).inline();
    const sticker = '';
    return [message, attachment, markup, sticker]
}

export const sceneMiddlewares = {
    sultan: [(ctx) => {
        ctx.scene.leave();
        ctx.reply(...optionsForReply('photo496267398_457239692', 'eldar'))
    },],

    eldar: [(ctx) => {
        ctx.scene.leave();
        ctx.reply(...optionsForReply('photo139189166_457249693', 'aidar'))
    },],

    aidar: [(ctx) => {
        ctx.scene.leave();
        ctx.reply(...optionsForReply('photo-175111431_457241476', 'aidar1'))
    },],
    aidar1: [(ctx) => {
        ctx.scene.leave();
        ctx.reply(...optionsForReply('photo-41811107_457387086', 'aidar2'))
    },],
    aidar2: [(ctx) => {
        ctx.scene.leave();
        ctx.reply(...optionsForReply('video-45179125_456243558', 'aidar3'))
    },],
    aidar3: [(ctx) => {
        ctx.scene.leave();
        ctx.reply(...optionsForReply('photo-61392922_457344575', 'sultan'))
    },],
}

