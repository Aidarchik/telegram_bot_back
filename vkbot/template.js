export const template = (photoId) => {
    return {
        "title": "Title",
        "description": "Description",
        "action": {
            "type": "open_link",
            "link": "https://vk.com"
        },
        "photo_id": photoId,
        "buttons": [{
            "action": {
                "type": "text",
                "label": "start"
            }
        }]
    }
}

