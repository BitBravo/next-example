import type { NextApiRequest, NextApiResponse } from 'next'
import { loadBlog } from "@utils/blogs";

async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const { articleId } = req.query;
        const data = await loadBlog(articleId as string) ?? {};
        res.status(200).json({ success: true, data })
    } catch (error: unknown) {
        const { message } = error as Error;
        res.status(400).json({ success: false, error: message })
    }
}

export default handler;

