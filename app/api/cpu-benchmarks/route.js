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