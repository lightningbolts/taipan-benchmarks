import { connectToDatabase } from "@utils/database";
import Bench from "@models/benchmark";
import { useSession } from "next-auth/react";

export const PATCH = async (request, { params }) => {
    try {
        await connectToDatabase();
        const existingBench = await Bench.findById(params.id);
        if (!existingBench) {
            return new Response("Benchmark not found", { status: 404 });
        }
        // Check if user is logged in
        const { data: session, status } = await useSession();
        // If user is logged in and the key in the url matches the benchmark key, update the benchmark
        if (status === 200 && session && params.key === existingBench.key) {
            existingBench.user = session.user.name;
        } else {
            return new Response("Unauthorized", { status: 401 });
        }
        await existingBench.save();
        return new Response(JSON.stringify(existingBench), { status: 200 });
    } catch (error) {
        return new Response("Failed to update benchmark", { status: 500 });
    }
}