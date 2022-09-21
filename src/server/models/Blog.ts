import { Schema, model, Model } from 'mongoose';
import IBlog from "../../types/blog";


type BlogModel = Model<IBlog>;

const blogSchema = new Schema<IBlog, BlogModel>({
    name: String,
    description: String,
});

export default model<IBlog, BlogModel>("blogs") || model<IBlog, BlogModel>("blogs", blogSchema);
