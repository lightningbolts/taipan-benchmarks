"use client"
import { useState } from "react"
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import BenchmarkPage from "@components/BenchmarkPage";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { set } from "mongoose";

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
            console.log(key, data.key);
            if (session && data.hostname && !/^[0-9a-fA-F]{24}$/.test(data.hostname)) {
                if (key && key.toString() === data.key.toString()) {
                    data.hostname = session?.user?.id;
                    // console.log(data, "data");
                    const patchResponse = await fetch(`/api/cpu-benchmarks/${params?.id}?key=${key}`, {
                        method: "PATCH",
                        body: JSON.stringify({
                            data: data
                        }),
                    });
                }
                setBenchmarkData(data);
            }
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
