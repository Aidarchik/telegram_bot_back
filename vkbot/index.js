import { VK, Keyboard } from 'vk-io';
import dotenv from 'dotenv';
import { template } from './template.js';
import { photoLoad } from './photoLoad.js';
dotenv.config();

const vk = new VK({
    token: process.env.VK_TOKEN
})

const attachment = async (source) => {
    return await vk.upload.messagePhoto({
        source: {
            value: source
        }
    })
}

vk.updates.on('message', async (context, next) => {
    // console.log(context);
    if (context.text === 'Привет') {
        await context.send('Привет!');
    }
    if (context.text === 'Кнопки') {
        await context.send({
            message: 'Hey!',
            keyboard: Keyboard.builder().inline()
                .urlButton({
                    label: 'View on site',
                    url: 'https://sushilike159.netlify.app/'
                })
                .callbackButton({
                    label: 'Buy a coffee',
                    payload: {
                        command: 'buy',
                        item: 'coffee'
                    }
                })
                .row()
                .textButton({
                    label: 'Показать меню',
                    payload: {
                        command: 'menu'
                    }
                }),
            attachment
        })
    }

    if (context.messagePayload?.command === 'menu') {
        await context.send({
            message: 'Hey!',
            template: JSON.stringify(template)
        })
    }
    return next()
});

//Загрузка изображения с vk.com sharp'ом
vk.updates.on('message', async (context, next) => {
    // console.log(context)
    try {
        if (context.attachments[0]?.largeSizeUrl) {
            const res = await photoLoad(context.attachments[0].largeSizeUrl, './vkbot/static/resize.jpg')
            if (res) {
                const uploadPhoto = await attachment('./vkbot/static/resize.jpg')
                if (uploadPhoto) {
                    context.uploadPhotoId = `${uploadPhoto.ownerId}_${uploadPhoto.id}`
                    context.uploadPhoto = uploadPhoto
                }
            }
        }
    } catch (error) {
        console.log('photoLoad error:', error.message)
    }

    return next()
});

//Вывод карусели
vk.updates.on('message', async (context, next) => {
    try {
        if (context.uploadPhotoId) {
            await context.send({
                message: 'Hey!',
                template: JSON.stringify({
                    "type": "carousel",
                    "elements": [
                        template(context.uploadPhotoId),
                        template(context.uploadPhotoId),
                        template(context.uploadPhotoId),
                        template(context.uploadPhotoId),
                        template(context.uploadPhotoId),
                        template(context.uploadPhotoId),
                        template(context.uploadPhotoId),
                        template(context.uploadPhotoId)
                        // JSON.stringify(template(context.uploadPhotoId)),
                        // JSON.stringify(template(context.uploadPhotoId)),
                        // JSON.stringify(template(context.uploadPhotoId)),
                        // JSON.stringify(template(context.uploadPhotoId)),
                        // JSON.stringify(template(context.uploadPhotoId)),
                        // JSON.stringify(template(context.uploadPhotoId)),
                        // JSON.stringify(template(context.uploadPhotoId))
                    ]
                })
            })
                .then(() => context.uploadPhotoId = undefined)
        }
    } catch (error) {
        console.log('Карусель:', error.message)
    }
    return next()
});


vk.updates.on('message_event', async (context, next) => {
    if (context.is(['message_event'])) {
        console.log(context)
        await vk.api.messages.sendMessageEventAnswer({
            event_id: context.eventId,
            peer_id: context.peerId,
            user_id: context.userId,
            event_data: JSON.stringify({ "type": "show_snackbar", "text": "Покажи исчезающее сообщение на экране" })
        })
    }
    return next()
})


await vk.updates.start();