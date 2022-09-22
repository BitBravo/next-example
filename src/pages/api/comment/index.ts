import type { NextApiRequest, NextApiResponse } from 'next'
import { loadComments } from "@utils/blogs";

async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const { page = 0, limit = 8, articleId } = req.query;
        const pageOptions = {
            page: parseInt(page as string),
            limit: parseInt(limit as string)
        }
        const data = await loadComments({
            blogId: articleId as string,
            page: pageOptions.page, 
            limit: pageOptions.limit
        })
        res.status(200).json(data)
    } catch (error: unknown) {
        const { message } = error as Error;
        res.status(400).json({ success: false, error: message })
    }
}

export default handler;

