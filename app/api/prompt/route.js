import { connectToDatabase } from "@utils/database";
import Prompt from "@models/prompt";
import { revalidatePath } from "next/cache";

export const GET = async (request) => {
    try {
        await connectToDatabase();
        const prompts = await Prompt.find({}).populate("creator");
        revalidatePath(request.url)
        return new Response(JSON.stringify(prompts), { status: 200 });
    } catch (error) {
        return new Response("Failed to fetch all prompts", { status: 500 });
    }
}