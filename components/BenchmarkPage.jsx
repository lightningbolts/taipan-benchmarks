import React from 'react';
import { useState } from "react"
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { set } from "mongoose";
const BenchmarkPage = ({ benchmarkData }) => {
    // Check if benchmarkData.cpu has Intel or AMD
    // If Intel, show Intel logo
    // If AMD, show AMD logo

    return (
        <div className="container px-4">
            <h1 className="head_text text-left black">Benchmark Results</h1>
            <br />
            <br />
            <br />
            <br />
            <br />
            <div className="flex flex-wrap -mx-4 -mb-10 text-left">
                <div className="sm:w-1/2 mb-10 px-4">
                    <div className="rounded-lg h-64 overflow-hidden">
                        <h1 className="text-2xl font-bold mb-4">Single Core Score</h1>
                        <h1 className="head_text black_gradient">{benchmarkData.single_core_score}</h1>
                    </div>
                    <h2 className="title-font text-2xl font-medium text-gray-900 mt-6 mb-3">CPU Model</h2>
                    <p className="leading-relaxed text-base">{benchmarkData.cpu_model}</p>
                    <h2 className="title-font text-2xl font-medium text-gray-900 mt-6 mb-3">Cores</h2>
                    <p className="leading-relaxed text-base">{benchmarkData.processes}</p>
                    <h2 className="title-font text-2xl font-medium text-gray-900 mt-6 mb-3">Speedup</h2>
                    <p className="leading-relaxed text-base">{benchmarkData.speedup}</p>
                    <h2 className="title-font text-2xl font-medium text-gray-900 mt-6 mb-3">Efficiency</h2>
                    <p className="leading-relaxed text-base">{benchmarkData.efficiency}</p>

                </div>
                <div className="sm:w-1/2 mb-10 px-4">
                    <div className="rounded-lg h-64 overflow-hidden">
                        <div className="rounded-lg h-64 overflow-hidden">
                            <h1 className="text-2xl font-bold mb-4">Multi Core Score</h1>
                            <h1 className="head_text black_gradient">{benchmarkData.multi_core_score}</h1>
                        </div>
                    </div>
                    <h2 className="title-font text-2xl font-medium text-gray-900 mt-6 mb-3">Operating System</h2>
                    <p className="leading-relaxed text-base">{benchmarkData.os_info}</p>
                    <h2 className="title-font text-2xl font-medium text-gray-900 mt-6 mb-3">CPU Utilization</h2>
                    <p className="leading-relaxed text-base">{benchmarkData.cpu_utilization}</p>
                    <h2 className="title-font text-2xl font-medium text-gray-900 mt-6 mb-3">Time</h2>
                    <p className="leading-relaxed text-base">{benchmarkData.time}</p>
                    <h2 className="title-font text-2xl font-medium text-gray-900 mt-6 mb-3">Hostname</h2>
                    <p className="leading-relaxed text-base">{benchmarkData.hostname}</p>
                </div>
            </div>
        </div>
    );
};

export default BenchmarkPage;
