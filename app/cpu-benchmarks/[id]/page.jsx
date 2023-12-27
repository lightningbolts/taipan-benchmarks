"use client"
import { useState } from "react"
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import BenchmarkPage from "@components/BenchmarkPage";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

const BenchmarkResult = ({ params }) => {
    const searchParams = useSearchParams();
    // const userName = searchParams.get("name");
    const key = searchParams.get("key");
    // console.log(key)
    const [benchmarkData, setBenchmarkData] = useState([]);
    // console.log(params)
    useEffect(() => {
        const fetchPosts = async () => {
            const response = await fetch(`/api/cpu-benchmarks/${params?.id}?key=${key ? key : ""}}`);
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
