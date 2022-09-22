import { Blog } from '@models/Blog'
import { Comment } from '@models/Comment'
import { IComment, ICommentPagination } from "types/comment";
import { IBlog } from "types/blog";
import { connectToDatabase } from "./db";
import { getRandomInt } from "./randomNumber";

connectToDatabase();

interface BlogProps {
    page?: number;
    limit?: number;
}

export const loadBlogs = async ({ page = 0, limit = 18 }: BlogProps) => {
    const list = await Blog.find({})
        .skip(page * limit)
        .limit(limit)
        .then((result: IBlog[]) => result.map(({ _id, name, description }) => ({
            _id: (_id as string).valueOf(),
            name: name,
            description: description,
            random: getRandomInt(0, 10000)
        })))

    const count = await Blog.count() ?? 0;

    return ({
        data: list ?? [],
        page: page + 1,
        totalPage: Math.ceil(count / limit),
        isLast: (page + 1) * limit >= count
    })
}

export const loadBlog = async (blogId: string): Promise<IBlog | null> => {
    try {
        const data = await Blog.findOne({ _id: blogId });

        if (data) {
            const { _id, name, description } = data;
            return {
                _id: (_id as string).valueOf(),
                name: name,
                description: description,
                random: getRandomInt(0, 10000)
            };
        }
        return null;

    } catch (error) {
        return null
    }
}


interface LoadCommentsProps {
    blogId?: string;
    page?: number;
    limit?: number;
}

export const loadComments = async ({ blogId, page = 0, limit = 8 }: LoadCommentsProps): Promise<ICommentPagination | null> => {
    try {
        const list = await Comment.find({ blogId })
            .skip(page * limit)
            .limit(limit)
            .then((result: IComment[]) => result.map(({ _id, blogId, title, description, user }) => ({
                _id: (_id as string).valueOf(),
                blogId,
                title,
                description,
                user
            })))

        const count = await Comment.count({ blogId }) ?? 0;

        return ({
            data: list ?? [],
            page: page + 1,
            totalPage: Math.ceil(count / limit),
            isLast: (page + 1) * limit >= count
        })
    } catch (error) {
        return null
    }
}