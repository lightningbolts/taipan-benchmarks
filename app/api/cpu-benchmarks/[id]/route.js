import { connectToDatabase } from "@utils/database";
import Bench from "@models/benchmark";
import { NextRequest } from "next/server";
export const GET = async (request, { params }) => {
    try {
        const searchParams = request.nextUrl.searchParams;
        const keyParam = searchParams.get("key");
        await connectToDatabase();
        const bench = await Bench.findById(params.id);
        if (!bench) {
            return new Response("Benchmark not found", { status: 404 });
        }
        return new Response(JSON.stringify(bench), { status: 200 });
    } catch (error) {
        return new Response("Failed to fetch benchmark", { status: 500 });
    }
}

export const PATCH = async (request, { params }) => {
    const { creator } = await request.json();
    try {
        await connectToDatabase();
        if (!benchmark) {
            return new Response("Benchmark not found", { status: 404 });
        }
        console.log(creator);
        const updatedBenchmark = await Bench.findByIdAndUpdate(params.id, { creator }, { new: true });
        console.log(updatedBenchmark);
        return new Response(JSON.stringify(updatedBenchmark), { status: 200 });
    } catch (error) {
        return new Response("Failed to update benchmark", { status: 500 });
    }
}