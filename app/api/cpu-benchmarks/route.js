import { connectToDatabase } from "@utils/database";
import Bench from "@models/benchmark";
export const GET = async (request) => {
    try {
        await connectToDatabase();
        const benchmarks = await Bench.find({});
        return new Response(JSON.stringify(benchmarks), { status: 200 });
    } catch (error) {
        return new Response("Failed to fetch all cpu benchmarks", { status: 500 });
    }
}

export const POST = async (request, res) => {
    const bench = await request.json();
    try {
        await connectToDatabase();
        // remove any additional whitespace from the cpu model
        bench.cpu_model = bench.cpu_model.trim();
        const newBench = await Bench.create(bench);
        await newBench.save();
        return new Response(JSON.stringify(newBench), { status: 201 });
    } catch (error) {
        console.log(error, "error");
        return new Response("Failed to create a new cpu benchmark", { status: 500 });
    }
}

export const PATCH = async (request) => {
    try {
        await connectToDatabase();
        // Get all benchmarks
        const benchmarks = await Bench.find({});
        // Trim the cpu_model field for every benchmark
        benchmarks.forEach(async (bench) => {
            bench.cpu_model = bench.cpu_model.trim();
            await bench.save();
            await Bench.findByIdAndUpdate(bench._id, bench);
        });
        return new Response("Successfully updated cpu benchmarks", { status: 200 });
    } catch (error) {
        return new Response("Failed to update cpu benchmarks", { status: 500 });
    }
}