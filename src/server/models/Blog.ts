import { Schema, model, Model } from 'mongoose';
import { IBlog } from "types/blog";

type BlogModel = Model<IBlog>;

const blogSchema = new Schema({
    name: String,
    description: String,
});


export const Blog = (() => {
    try {
        return model<IBlog, BlogModel>("blogs")
    } catch (error) {
        return model<IBlog, BlogModel>("blogs", blogSchema)
    }
})()

