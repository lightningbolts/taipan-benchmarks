import User from "@models/user";
import { connectToDatabase } from "@utils/database";

export const GET = async (request) => {
    try {
        await connectToDatabase();
        // Find a user by their id
        const user = await User.findById(request.params.id);
        if (!user) {
            return new Response("User not found", { status: 404 });
        }
        // Get user attributes
        const { _id, username, email, createdAt, updatedAt } = user;
        // Return user attributes
        return new Response(JSON.stringify({ _id, username, email, createdAt, updatedAt }), { status: 200 });
    } catch (error) {
        return new Response("Failed to fetch all prompts", { status: 500 });
    }
}