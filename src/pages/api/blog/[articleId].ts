import Blog from '@models/Blog'
import withMongo from '@middleware/mongoose';
import type { NextApiRequest, NextApiResponse } from 'next'

async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const { articleId } = req.query;
        const blog = await Blog.findOne({ _id: articleId });
        res.status(200).json({ success: true, data: blog ?? {} })
    } catch (error: any) {
        res.status(400).json({ success: false, error: error?.message })
    }
}

export default withMongo(handler);

