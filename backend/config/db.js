const mongoose = require("mongoose")
const { GridFSBucket } = require("mongodb")

const MONGO_ENV_KEYS = ["MONGODB_URL", "DATABASE_URL", "MONGO_URL"]

function maskValue(value) {
    if (!value) {
        return "[empty]"
    }

    const trimmed = String(value).trim()
    if (!trimmed) {
        return "[blank]"
    }

    return `${trimmed.slice(0, 24)}... (length: ${trimmed.length})`
}

function normalizeMongoUri(rawValue, sourceKey) {
    let mongoUri = String(rawValue).trim()

    mongoUri = mongoUri.replace(/^export\s+/i, "")
    mongoUri = mongoUri.replace(new RegExp(`^${sourceKey}\\s*=\\s*`, "i"), "")
    mongoUri = mongoUri.replace(/^['"]|['"]$/g, "")

    const uriMatch = mongoUri.match(/mongodb(?:\+srv)?:\/\/\S+/i)
    if (uriMatch) {
        mongoUri = uriMatch[0]
    }

    if (!mongoUri.startsWith("mongodb://") && !mongoUri.startsWith("mongodb+srv://")) {
        throw new Error(
            `Invalid ${sourceKey}. Preview received: ${maskValue(rawValue)}. It must start with "mongodb://" or "mongodb+srv://"`
        )
    }

    return mongoUri
}

function getMongoUri() {
    for (const key of MONGO_ENV_KEYS) {
        const rawValue = process.env[key]
        if (!rawValue) {
            continue
        }

        return normalizeMongoUri(rawValue, key)
    }

    throw new Error(`MongoDB connection string is missing. Checked: ${MONGO_ENV_KEYS.join(", ")}`)
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
