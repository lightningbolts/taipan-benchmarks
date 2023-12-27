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
    // const { cpu_model, os_info, digits, single_core_score, multi_core_score, speedup, efficiency, cpu_utilization, time, hostname } = await request.json();
    const bench = await request.json();
    try {
        await connectToDatabase();
        const newBench = await Bench.create(bench);
        await newBench.save();
        return new Response(JSON.stringify(newBench), { status: 201 });
    } catch (error) {
        console.log(error, "error");
        return new Response("Failed to create a new cpu benchmark", { status: 500 });
    }
}