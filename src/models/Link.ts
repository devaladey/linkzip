import mongoose, { Schema, models } from "mongoose"

const LinkSchema = new Schema(
    {
        longUrl: {
            type: String,
            required: [true, "Long URL is required"],
        },
        shortCode: {
            type: String,
            required: [true, "Short code is required"],
            unique: [true, "Short code must be unique"],
        },
        clicks: {
            type: Number,
            default: 0,
        },
        status: {
            type: String,
            enum: {
                message: "Status must be either 'active' or 'inactive'",
                values: ["active", "inactive"],
            },
            default: "active",
        },
        maxClicks: {
            type: Number
        },
        expiresAt: { 
            type: Date 
        }
    },
    { timestamps: true }
)

export const Link = models.Link || mongoose.model("Link", LinkSchema)
