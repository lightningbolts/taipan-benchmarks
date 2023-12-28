import { connectToDatabase } from "@utils/database";
import Bench from "@models/benchmark";
import { NextRequest } from "next/server";
export const GET = async (request, { params }) => {
    try {
        const searchParams = request.nextUrl.searchParams;
        const keyParam = searchParams.get("key");
        await connectToDatabase();
        const bench = await Bench.findById(params.id).populate("creator");
        if (!bench) {
            return new Response("Benchmark not found", { status: 404 });
        }
        return new Response(JSON.stringify(bench), { status: 200 });
    } catch (error) {
        return new Response("Failed to fetch benchmark", { status: 500 });
    }
}

export const PATCH = async (request, { params }) => {
    const existingBench = await request.json();
    try {
        await connectToDatabase();
        console.log("existingBench", existingBench);
        // Update benchmark
        const newBenchmark = await Bench.findByIdAndUpdate(params.id, existingBench, { new: true });
        console.log("newBenchmark", newBenchmark);
        await newBenchmark.save();
        return new Response(JSON.stringify(newBenchmark), { status: 200 });
    } catch (error) {
        return new Response("Failed to update benchmark", { status: 500 });
    }
}