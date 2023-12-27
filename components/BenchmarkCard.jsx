"use client";

import { useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";

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
    return (
        <div className='prompt_card'>
            <div className='flex justify-between items-start gap-5'>
                <div className='flex flex-col'>
                    <h3 className='font-satoshi font-semibold text-gray-900'>
                        {/* Capitalize first letter */}
                        {post.os_info.charAt(0).toUpperCase() + post.os_info.slice(1)}
                    </h3>
                    <p className='font-inter text-sm text-gray-500'>
                        {post.cpu_model}
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
                    <p className="font-inter text-sm text-gray-500">
                        Speedup: {post.speedup}
                    </p>
                    <p className="font-inter text-sm text-gray-500">
                        Efficiency: {post.efficiency}
                    </p>
                    <p className="font-inter text-sm text-gray-500">
                        CPU Utilization: {post.cpu_utilization}
                    </p>
                    <p className="font-inter text-sm text-gray-500">
                        Time: {post.time}
                    </p>

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