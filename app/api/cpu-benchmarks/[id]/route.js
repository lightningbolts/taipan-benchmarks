import { connectToDatabase } from "@utils/database";
import Bench from "@models/benchmark";
import { useSession } from "next-auth/react";
export const GET = async (request, { params }) => {
    try {
        await connectToDatabase();
        const bench = await Bench.findById(params.id);
        // console.log(bench, "bench");
        if (!bench) {
            return new Response("Benchmark not found", { status: 404 });
        }
        return new Response(JSON.stringify(bench), { status: 200 });
    } catch (error) {
        return new Response("Failed to fetch benchmark", { status: 500 });
    }
}