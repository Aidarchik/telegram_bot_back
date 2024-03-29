import { VK, Keyboard } from 'vk-io';
import dotenv from 'dotenv';
import { template } from './template.js';
import { photoLoad } from './photoLoad.js';
import fetch from 'node-fetch';
dotenv.config();



const vk = new VK({
    token: process.env.VK_TOKEN
})
const vk1 = new VK({
    token: process.env.VK_TOKEN_APP
})

const attachment = async (source) => {
    return await vk.upload.messagePhoto({
        source: {
            value: source
        }
    })
}

const keyboard = Keyboard
    .builder()
    .inline()
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
    })

vk.updates.on('message', async (context, next) => {
    console.log(context);
    if (context.text === 'Привет') {
        await context.send('Привет!');
    }
    if (context.text === 'Кнопки') {
        await context.send({
            message: 'Hey!',
            keyboard,
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
        // console.log(await vk.api.photos.get({ owner_id: -162905926, album_id: 292858997 }));
        if (context.attachments[0]?.largeSizeUrl) {
            const res = await photoLoad(context.attachments[0].largeSizeUrl, './vkbot/static/resize.jpg')
            if (res) {
                const uploadPhoto = await attachment('./vkbot/static/resize.jpg')
                if (uploadPhoto) {
                    context.uploadPhotoId = '-162905926_457239588'
                    // context.uploadPhotoId = `${uploadPhoto.ownerId}_${uploadPhoto.id}`
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
                    ]
                }),
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

// const res = await vk1.api.photos.get({ owner_id: 95179968, album_id: 243739641 })
// const res = await vk1.api.groups.get({ filter: 'groups', user_id: 139189166 })
// const res = await vk1.api.photos.editAlbum({ title: 'Разное', owner_id: -162905926, album_id: 292865053 })
// const res = await vk1.api.photos.editAlbum({ title: 'Разное', owner_id: -162905926, album_id: 292865053 })
// const res = await fetch(`https://api.vk.com/method/photos.get?access_token=${process.env.VK_TOKEN}&owner_id=-162905926&album_id=292858997&v=5.131`)
// const res1 = await fetch('https://oauth.vk.com/authorize?client_id=51451963&display=page&redirect_uri=https://oauth.vk.com/blank.html&scope=friends,photos,audio,video,stories,status,notes&response_type=token&v=5.52')
// for (let item of res.items) {
//     console.log(`https://vk.com/club${item}`);
// }


await vk.updates.start();

