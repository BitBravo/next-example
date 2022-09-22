import { connectToDatabase } from "../utils/db"
import { initBlogs } from "./blogs"
import { initComments } from "./comments"

(async () => {
    try {
        await connectToDatabase()
        await initBlogs();
        await initComments();
        console.log("Initialized database successfully")
    } catch (error) {
        console.log("Database initializing error: " + error)
    }
})()