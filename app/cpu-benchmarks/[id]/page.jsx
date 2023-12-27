"use client"
import { useState } from "react"
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import BenchmarkPage from "@components/BenchmarkPage";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

const BenchmarkResult = ({ params }) => {
    const searchParams = useSearchParams();
    // const userName = searchParams.get("name");

    const [benchmarkData, setBenchmarkData] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            const response = await fetch(`/api/cpu-benchmarks/${params?.id}`);
            const data = await response.json();

            setBenchmarkData(data);
        };

        if (params?.id) fetchPosts();
    }, [params.id]);


    return (
        <BenchmarkPage
            benchmarkData={benchmarkData}
        />
    );
};

export default BenchmarkResult;
