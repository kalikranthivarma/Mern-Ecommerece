const mongoose = require("mongoose")
const { GridFSBucket } = require("mongodb")

function getMongoUri() {
    const rawValue = process.env.MONGODB_URL

    if (!rawValue) {
        throw new Error("MONGODB_URL is missing")
    }

    const mongoUri = rawValue.trim().replace(/^['"]|['"]$/g, "")

    if (!mongoUri.startsWith("mongodb://") && !mongoUri.startsWith("mongodb+srv://")) {
        throw new Error('Invalid MONGODB_URL. It must start with "mongodb://" or "mongodb+srv://"')
    }

    return mongoUri
}

const connectDB = async (app) => {
    try {
        const mongoUri = getMongoUri()
        await mongoose.connect(mongoUri)
        console.log("DB connected successfully")

        const bucket = new GridFSBucket(mongoose.connection.db, {
            bucketName: "uploads"
        })

        app.locals.bucket = bucket
        console.log("grid file storage bucket created successfully")
    } catch (err) {
        console.error("Database connection failed:", err.message)
        process.exit(1)
    }
}

module.exports = connectDB
