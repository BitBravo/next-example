import { Schema, model, Model } from 'mongoose';
import { IComment } from "types/comment";

type CommentModel = Model<IComment>;

const commentSchema = new Schema({
    blogId: String,
    title: String,
    description: String,
    user: String,
});

export const Comment = (() => {
    try {
        return model<IComment, CommentModel>("comments")
    } catch (error) {
        return model<IComment, CommentModel>("comments", commentSchema)
    }
})()

