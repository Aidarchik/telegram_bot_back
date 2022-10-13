
const TelegramBot = require('node-telegram-bot-api');
const express = require('express');
const cors = require('cors');
// const webAppUrl = 'https://633eca5bc6b16200b216310f--delightful-boba-ba0a21.netlify.app';
const webAppUrl = 'http://dc64-46-146-21-53.eu.ngrok.io';
const token = '5677851691:AAGANdpmDqhPv3yIRjeBvNMfIFMjUMWG5kQ';

const bot = new TelegramBot(token, { polling: true });
const app = express();

app.use(express.json());

let corsOptions = {
    origin: [webAppUrl],
}

app.use(cors())

// Listen for any kind of message. There are different kinds of
// messages.
bot.on('message', async (msg) => {
    const chatId = msg.chat.id;
    const text = msg.text;

    if (text === '/start') {
        await bot.sendMessage(chatId, 'Ниже появится кнопка, заполни форму', {
            reply_markup: {
                keyboard: [
                    [{ text: 'Заполни форму', web_app: { url: webAppUrl + '/form' } }]
                ]
            }
        });

        await bot.sendMessage(chatId, 'Заходи в наш интернет магазин', {
            reply_markup: {
                inline_keyboard: [
                    [{ text: 'Сделать заказ', web_app: { url: webAppUrl } }]
                ]
            }
        });
    }

    if (msg?.web_app_data?.data) {
        try {
            const data = JSON.parse(msg.web_app_data?.data);
            console.log(data);

            await bot.sendMessage(chatId, 'Спасибо за обратную связь!');
            await bot.sendMessage(chatId, ' Ваша страна: ' + data?.country);
            await bot.sendMessage(chatId, ' Ваш город: ' + data?.sity);
            setTimeout(async () => { await bot.sendMessage(chatId, ' Вcю информацию вы получите в этом чате!') }, 3000);

        } catch (e) {
            console.log(e);
        }

    }


});


app.post('/web-data', async (req, res) => {
    const { queryId, products, totalPrice } = req.body
    await console.log(req);
    try {
        await bot.answerWebAppQuery(queryId, {
            type: 'article',
            id: queryId,
            title: 'Успешная покупка',
            input_message_content: { message_text: 'Поздравляем с покупкой, вы приобрели товар на сумму: ' + totalPrice }
        });
        return res.status(200).json('сервер ответил123');
    } catch (e) {
        await bot.answerWebAppQuery(queryId, {
            type: 'article',
            id: queryId,
            title: 'Не удалось приобрести товар',
            input_message_content: { message_text: 'Не удалось приобрести товар' }
        });
        return res.status(500).json({});
    }
});

const PORT = 8000;
app.listen(PORT, () => console.log('Сервер запустился на порту ' + PORT));