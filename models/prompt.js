import { Schema, model, models } from "mongoose";

const PromptSchema = new Schema({
    creator: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    prompt: {
        type: String,
        required: [true, "Prompt is required"],
    },
    tag: {
        type: String,
        required: [true, "Tag is required"],
    },
    likes: {
        type: Number,
        default: 0,
    },
    dislikes: {
        type: Number,
        default: 0,
    },
    commentReference: {
        type: Schema.Types.ObjectId,
        ref: "Prompt",
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
    },
});

const Prompt = models.Prompt || model("Prompt", PromptSchema);

export default Prompt;