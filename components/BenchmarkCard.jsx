"use client";

import { useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";

const BenchmarkCard = ({ post, handleTagClick }) => {
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
    // Remove (R) from Intel(R) and (TM) from Core(TM) and Processor and CPU and "__th Gen" and "with Radeon Graphics", but don't remove Core
    cpu_model = cpu_model.replace(/\(R\)/g, "");
    cpu_model = cpu_model.replace(/\(TM\)/g, "");
    cpu_model = cpu_model.replace(/Processor/g, "");
    cpu_model = cpu_model.replace(/CPU/g, "");
    cpu_model = cpu_model.replace(/with Radeon Graphics/g, "");
    // Remove extra spaces
    cpu_model = cpu_model.replace(/\s\s+/g, " ");
    // Remove spaces at the beginning and end
    cpu_model = cpu_model.trim();

    return (
        <div className='prompt_card'>
            <div className='flex justify-between items-start gap-5'>
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
                    <p className='font-inter text-sm text-gray-500'>
                        Single Core Score: {post.single_core_score}
                    </p>
                    <p className='font-inter text-sm text-gray-500'>
                        Multi Core Score: {post.multi_core_score}
                    </p>
                    <a href={`/cpu-benchmarks/${post._id}`}
                        className='font-inter text-sm text-blue-500 hover-brighten'>
                        View Full Benchmark
                    </a>

                </div>
                {/* <div className='copy_btn' onClick={handleCopy}>
                    <Image
                        src={
                            copied === post.prompt
                                ? "/assets/icons/tick.svg"
                                : "/assets/icons/copy.svg"
                        }
                        alt={copied === post.prompt ? "tick_icon" : "copy_icon"}
                        width={12}
                        height={12}
                    />
                </div> */}
            </div>
        </div>
    );
}

export default BenchmarkCard;