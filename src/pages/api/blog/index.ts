import type { NextApiRequest, NextApiResponse } from 'next'
import Blog from '@models/Blog'
import withMongo from '@middleware/mongoose';

async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        // Pagination
        const { page = 0, limit = 18 } = req.query;
        const pageOptions = {
            page: parseInt(page as string),
            limit: parseInt(limit as string)
        }

        await Blog.find()
            .skip(pageOptions.page * pageOptions.limit)
            .limit(pageOptions.limit)
            .exec(function (err, list) {
                Blog.count().exec(function (err, count) {
                    res.status(200).json({
                        success: true,
                        data: list ?? [],
                        page: pageOptions.page + 1,
                        totalPage: Math.ceil(count / pageOptions.limit),
                        isLast: (pageOptions.page + 1) * pageOptions.limit >= count
                    })

                })
            })

    } catch (error: any) {
        res.status(400).json({ success: false, error: error?.message })
    }
}

export default withMongo(handler);


