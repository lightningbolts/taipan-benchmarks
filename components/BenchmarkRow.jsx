"use client";

import { useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";

const BenchmarkRow = ({ post, handleTagClick }) => {
    const { data: session } = useSession();
    const pathName = usePathname();
    const router = useRouter();

    const [copied, setCopied] = useState("");

    const handleCopy = () => {
        setCopied(post.cpu_model);
        navigator.clipboard.writeText(post.cpu_model);
        setTimeout(() => setCopied(false), 3000);
    };

    let cpu_model = post.cpu_model;
    // Remove (R) from Intel(R) and (TM) from Core(TM) and Processor and CPU and "__th Gen" and "with Radeon Graphics"
    cpu_model = cpu_model.replace(/\(R\)/g, "");
    cpu_model = cpu_model.replace(/\(TM\)/g, "");
    cpu_model = cpu_model.replace(/Core/g, "");
    cpu_model = cpu_model.replace(/Processor/g, "");
    cpu_model = cpu_model.replace(/CPU/g, "");
    cpu_model = cpu_model.replace(/with Radeon Graphics/g, "");
    // Remove extra spaces
    cpu_model = cpu_model.replace(/\s\s+/g, " ");
    // Remove spaces at the beginning and end
    cpu_model = cpu_model.trim();

    return (
        <div className='mt-5 100vh flex-1 break-inside-avoid rounded-lg border border-gray-300 bg-white/20 bg-clip-padding p-6 pb-4 backdrop-blur-lg backdrop-filter md:w-[800px] w-full h-fit'>
            <div className='grid grid-cols-3 gap-5'>
                <div className='flex flex-col'>
                    <h3 className='font-satoshi font-semibold text-gray-900'>
                        {/* Capitalize first letter */}
                        {post.os_info.charAt(0).toUpperCase() + post.os_info.slice(1)}
                    </h3>
                    <p className='font-inter text-sm text-gray-500'>
                        {cpu_model}
                    </p>
                    <p className='font-inter text-sm text-gray-500'>
                        {post.processes} Cores
                    </p>
                    <a href={`/cpu-benchmarks/${post._id}`}
                       className='font-inter text-sm text-blue-500'>
                        View Full Benchmark
                    </a>
                </div>
                <div className='flex flex-col flex-center'>
                    <p className='font-inter text-sm text-gray-500'>
                        Single Core Score
                    </p>
                    <p className='font-inter text-4xl text-gray-500'>
                        {post.single_core_score}
                    </p>
                </div>
                <div className='flex flex-col flex-center'>
                    <p className='font-inter text-sm text-gray-500'>
                        Multi Core Score
                    </p>
                    <p className='font-inter text-4xl text-gray-500'>
                        {post.multi_core_score}
                    </p>
                </div>
            </div>
        </div>
    );
}

export default BenchmarkRow;