import mongoose from "mongoose";

const connectDB = async () => {
    try {
        mongoose.connection.on("connected", () => { console.log("Database connected successfully") });
        let mongooseURL = process.env.MONGODB_URL;
        const projectName = 'resume-builder';

        if (!mongooseURL) {
            throw new Error("MONGODB_URL environment variable not set")

        }
        if (mongooseURL) {
            mongooseURL = mongooseURL.slice(0, -1)
        }
        await mongoose.connect(`${mongooseURL}/${projectName}`)
    } catch (error) {
        console.error("Error connecting to MongoDb:", error)
    }
}

export default connectDB