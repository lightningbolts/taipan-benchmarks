import {connectToDatabase} from "@utils/database";
import Prompt from "@models/prompt";

export const GET = async (request, { params }) => {
    try {
        await connectToDatabase();
        // Get all the prompts that have the same commentReference as the one in the params
        const prompt = await Prompt.find({commentReference: params.id}).populate("creator");
        if (!prompt) {
            return new Response("Prompt not found", { status: 404 });
        }
        return new Response(JSON.stringify(prompt), { status: 200 });
    } catch (error) {
        return new Response(`Failed to fetch prompt`, { status: 500 });
    }
}