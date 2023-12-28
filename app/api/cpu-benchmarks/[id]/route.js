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
    const { cpu_model, os_info, digits, single_core_score, multi_core_score,
        speedup, efficiency, cpu_utilization, time, hostname, processes, key
    } = await request.json();
    try {
        await connectToDatabase();
        const benchmark = await Bench.findById(params.id);
        if (!benchmark) {
            return new Response("Benchmark not found", { status: 404 });
        }
        benchmark.cpu_model = cpu_model;
        benchmark.os_info = os_info;
        benchmark.digits = digits;
        benchmark.single_core_score = single_core_score;
        benchmark.multi_core_score = multi_core_score;
        benchmark.speedup = speedup;
        benchmark.efficiency = efficiency;
        benchmark.cpu_utilization = cpu_utilization;
        benchmark.time = time;
        benchmark.hostname = hostname;
        benchmark.processes = processes;
        benchmark.key = key;
        const newBenchmark = await benchmark.save();
        return new Response(JSON.stringify(newBenchmark), { status: 200 });
    } catch (error) {
        return new Response("Failed to update benchmark", { status: 500 });
    }
}