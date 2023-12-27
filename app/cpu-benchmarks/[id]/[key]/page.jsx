"use client"
import { useState } from "react"
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import BenchmarkPage from "@components/BenchmarkPage";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

const BenchmarkResult = ({ params }) => {
    const router = useRouter();
    const session = useSession();
    const [benchmarkData, setBenchmarkData] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            const response = await fetch(`/api/cpu-benchmarks/${params?.id}`);
            const data = await response.json();
            setBenchmarkData(data);
        };

        if (params?.id) fetchPosts();
    }, [params.id]);

    const updateBenchmark = async () => {

        if (!params?.id) return console.log("Benchmark ID not found")

        try {
            const response = await fetch(`/api/cpu-benchmarks/${params?.id}/${params?.key}`, {
                method: "PATCH",
                body: JSON.stringify({
                    cpu_model: benchmarkData.cpu_model,
                    os_info: benchmarkData.os_info,
                    digits: benchmarkData.digits,
                    single_core_score: benchmarkData.single_core_score,
                    multi_core_score: benchmarkData.multi_core_score,
                    speedup: benchmarkData.speedup,
                    efficiency: benchmarkData.efficiency,
                    cpu_utilization: benchmarkData.cpu_utilization,
                    time: benchmarkData.time,
                    hostname: benchmarkData.hostname,
                    processes: benchmarkData.processes,
                    key: benchmarkData.key,
                    user: benchmarkData.session?.user.id,
                })
            })

            if (response.ok) {
                router.push("/")
            }
        } catch (e) {
            console.log(e)
        }
    }
    updateBenchmark();

    return (
        <BenchmarkPage
            benchmarkData={benchmarkData}
        />
    );
};

export default BenchmarkResult;
