export const token = "vk1.a.pd0FHqHEFC0QWdzrm0o7Lb2mo1BsgpetEwHeP7RGjYoxAULj50EoHT6UMHw5KnhPsPhhDbB7cDq0l4wbs0f62Nr9bqzoj_rd-bFJ3GZ499alI5WHySpcz3W3BrvqmDk0ayZvs--op2GWo8SJnuyZUoeLx20TiAta-v5DaVwQ9Qtow1FA3nOBQpScuZBpIQrJwtB37ppBr0_OXHTSFefzoA";
export const vkOptions = {
    'appId': 51451963,
    'appSecret': 'nTBxSnh3luIpAN6cI369',
    'language': 'ru',
    'version': '5.131',
    'https': true,
}
export const tokenElecton = 'vk1.a.39lUk0t976kYCNlFSQlWnWetXcYDRR_uRVtn4p-cISvoRlkDvOtkPzefwK2bScYEtiLJOV-XzfJE8dqpE3z2FzWqnSiyat1HQs1e_oot55PuDj4B2iHhx9AF1pLDOUHctAxHVgznlhQX0gcNT7S9alDK4r5mCn6ei6fDcLBzhhyVXyMA01aeENAlYDN_8LyozrU9oJFhzaJl6sLCjkQ-Vg';
const confirmationElectron = '18d39d6e';

export const vkOptionsElectron = {
    token: tokenElecton,
    group_id: 162905926,
    // execute_timeout: process.env.EXECUTE_TIMEOUT, // in ms   (50 by default)
    polling_timeout: 25, // in secs (25 by default)
    versions: 5.131,
    // webhooks options only
    // secret: process.env.SECRET,                   // secret key (optional)
    // confirmation: process.env.CONFIRMATION,       // confirmation string
}

const data = {
    "response": {
        "key": "cde28b3d569e4b2eaa44f9f42f206bba83f88b01",
        "server": "https://lp.vk.com/wh162905926",
        "ts": "16"
    }
}

const { server, key, ts } = data.response;

// console.log(`${server}?act=a_check&key=${key}&ts=${ts}&wait=25`)