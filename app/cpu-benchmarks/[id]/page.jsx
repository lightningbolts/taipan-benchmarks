"use client"
import { useState } from "react"
import { useSession } from "next-auth/react";
import BenchmarkPage from "@components/BenchmarkPage";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
// import { ObjectId } from "mongodb";

const BenchmarkResult = ({ params }) => {
    const searchParams = useSearchParams();
    // const userName = searchParams.get("name");
    const key = searchParams.get("key");
    // console.log(key)
    const [benchmarkData, setBenchmarkData] = useState([]);
    const { data: session } = useSession();
    console.log(session)
    // console.log(params)
    useEffect(() => {
        const fetchPosts = async () => {
            const response = await fetch(`/api/cpu-benchmarks/${params?.id}`);
            const data = await response.json();
            // console.log(data)
            setBenchmarkData(data);
        };

        if (params?.id) fetchPosts();
    }, [params.id, session?.user.id]);


    return (
        <BenchmarkPage
            benchmarkData={benchmarkData}
        />
    );
};

export default BenchmarkResult;
