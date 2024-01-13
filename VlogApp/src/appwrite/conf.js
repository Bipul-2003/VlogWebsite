import config from "../config/config";
import { Client, Databases, Storage, Query, ID } from "appwrite";

export class Service {
    client = new Client();
    databases;
    buckets;

    constructor() {
        this.client
            .setEndpoint(config.appwriteUrl)
            .setProject(config.appwriteProjestId);
        this.databases = new Databases(this.client);
        this.buckets = new Storage(this.client);

    }

    async createPost({ title, slug, content, featuredImage, status, userId }) {
        try {
            return await this.databases.createDocument(
                config.appwriteDatabaseId, config.appwriteCollectionId, slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId
                })
        } catch (error) {
            console.log("Appwrite service :: createPost :: error", error)
        }
    }

    async updatePost(slug, { title, content, featuredImage, status }) {
        try {
            return await this.databases.updateDocument(
                config.appwriteDatabaseId, config.appwriteCollectionId, slug,
                {
                    title,
                    content,
                    featuredImage,
                    status
                })
        } catch (error) {
            console.log("Appwrite service :: updatePost :: error", error)


        }
    }
    async deletePost(slug) {
        try {
            await this.databases.deleteDocument(
                config.appwriteDatabaseId, config.appwriteCollectionId, slug)
            return true
        } catch (error) {
            console.log("Appwrite service :: deletePost :: error", error)
            return false

        }
    }
    async getPost(slug) {
        try {
            await this.databases.getDocument(
                config.appwriteDatabaseId, config.appwriteCollectionId, slug)
            return true
        } catch (error) {
            console.log("Appwrite service :: getPost :: error", error)
            return false

        }
    }
    async getPosts(queries = [Query.equal("status", "active")]) {
        try {
            return await this.databases.listDocuments(
                config.appwriteDatabaseId, config.appwriteCollectionId, queries)
        } catch (error) {
            console.log("Appwrite service :: getPosts :: error", error)
            return false
        }
    }

    //file upload services
    async uploadFile(file) {
        try {
            return await this.buckets.createFile(
                config.appwriteBucketId,
                ID.unique(),
                file
            )
        } catch (error) {
            console.log("Appwrite service :: uploadFile :: error", error)
            return false
        }
    }

    async deleteFile(fileId) {
        try {
            return await this.buckets.deleteFile(
                config.appwriteBucketId,
                fileId
            )
        } catch (error) {
            console.log("Appwrite service :: deleteFile :: error", error)
            return false

        }
    }
    getFilePreview(fileId) {
        return this.buckets.getFilePreview(config.appwriteBucketId, fileId)
    }
}

const service = new Service()
export default service;

