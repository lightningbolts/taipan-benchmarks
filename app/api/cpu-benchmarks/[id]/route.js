import { connectToDatabase } from "@utils/database";
import Bench from "@models/benchmark";
import { NextRequest } from "next/server";
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

export const PATCH = async (request, { params }) => {
    const { cpu_model, os_info, digits, single_core_score, multi_core_score, speedup, efficiency, cpu_utilization, time, hostname, processes, key } = await request.json();
    const { data: session, status } = await useSession();
    const searchParams = request.nextUrl.searchParams;
    const keyParam = searchParams.get("key");

    try {
        await connectToDatabase();
        const existingBench = await Bench.findById(params.id);
        if (!existingBench) {
            return new Response("Benchmark not found", { status: 404 });
        }
        existingBench.cpu_model = cpu_model;
        existingBench.os_info = os_info;
        existingBench.digits = digits;
        existingBench.single_core_score = single_core_score;
        existingBench.multi_core_score = multi_core_score;
        existingBench.speedup = speedup;
        existingBench.efficiency = efficiency;
        existingBench.cpu_utilization = cpu_utilization;
        existingBench.time = time;
        existingBench.hostname = hostname;
        existingBench.processes = processes;
        existingBench.key = key;
        // If the user is not logged in, don't update the creator
        if (keyParam === key) {
            existingBench.creator = session?.user?.id;
        }
        await existingBench.save();
        return new Response(JSON.stringify(existingBench), { status: 200 });
    } catch (error) {
        return new Response("Failed to update benchmark", { status: 500 });
    }
}