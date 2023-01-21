import sharp from 'sharp'
import fetch from 'node-fetch'

export const photoLoad = async (largeSizeUrl, saveDir) => {
    try {
        const res = await fetch(largeSizeUrl)
        const buffer = await res.arrayBuffer()

        const image = await sharp(Buffer.from(buffer))
            .resize(221, 136)
            .timeout({ seconds: 10 })
            .toFile(saveDir)
        if (image) return true
    } catch (error) {
        console.log('fetch with sharp error:', error)
        return false
    }
}

