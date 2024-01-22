import { connectToDatabase } from "@utils/database";
import Prompt from "@models/prompt";

export const POST = async (req, res) => {
    const { userId, prompt, tag, commentReference } = await req.json();
    console.log(userId, prompt, tag, commentReference);
    try {
        await connectToDatabase();
        const newPrompt = await Prompt.create({
            creator: userId,
            prompt: prompt,
            tag: tag ? tag : null,
            likes: 0,
            dislikes: 0,
            commentReference: commentReference ? commentReference : null,
            createdAt: Date.now(),
            updatedAt: Date.now(),
        });

        await newPrompt.save();
        return new Response(JSON.stringify(newPrompt), { status: 201 });

    } catch (error) {
        return new Response("Failed to create a new prompt", { status: 500 });
    }
}