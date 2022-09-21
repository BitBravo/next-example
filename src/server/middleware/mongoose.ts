import mongoose from 'mongoose';
import type { NextApiRequest, NextApiResponse } from 'next'

const { MONGO_URI } = process.env;

const connectDB = (handler: any) => async (req: NextApiRequest, res: NextApiResponse) => {
    if ((mongoose as any).connections[0].readyState) {
        return handler(req, res);
    }
    // Use new db connection
    await mongoose.connect(MONGO_URI as string);
    return handler(req, res);
};

export default connectDB;
