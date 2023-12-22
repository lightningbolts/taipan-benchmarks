import { connectToTaipanDatabase } from "@utils/database";
import Prompt from "@models/prompt";

export const GET = async (request) => {
    try {
        await connectToTaipanDatabase();
        const prompts = await Prompt.find({}).populate("creator");
        return new Response(JSON.stringify(prompts), { status: 200 });
    } catch (error) {
        return new Response("Failed to fetch all cpu benchmarks", { status: 500 });
    }
}