import Post from "../model/Post.js";
import fileService from "../fileService.js";

class PostService {
    async create(posts, picture) {
        let createPost = ''
        if (picture) {
            const fileName = await fileService.saveFile(picture)
            createPost = await Post.create({ ...posts, picture: fileName })
        } else {
            createPost = await Post.create(posts)
        }
        return createPost

    }

    async getAll() {
        const allPosts = await Post.find()
        return allPosts
    }

    async getOne(id) {
        if (!id) {
            throw new Error('не указан ID')
        }
        const post = await Post.findById(id)
        return post

    }

    async update(post) {
        if (!post._id) {
            throw new Error('не указан ID')
        }
        const updatedPost = await Post.findByIdAndUpdate(post._id, post, { new: true })
        return updatedPost
    }

    async delete(id) {
        if (!id) {
            throw new Error('не указан ID')
        }
        const post = await Post.findByIdAndDelete(id)
        return post
    }

}

export default new PostService