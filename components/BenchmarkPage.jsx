import React from 'react';

const BenchmarkPage = ({ benchmarkData }) => {
    return (
        <div className="container mx-auto">
            <h1 className="text-2xl font-bold mb-4">Benchmark Results</h1>
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <h2 className="text-lg font-bold mb-2">CPU Model</h2>
                    <p>{benchmarkData.cpu_model}</p>
                </div>
                <div>
                    <h2 className="text-lg font-bold mb-2">OS Info</h2>
                    <p>{benchmarkData.os_info}</p>
                </div>
                <div>
                    <h2 className="text-lg font-bold mb-2">Cores</h2>
                    <p>{benchmarkData.processes}</p>
                </div>
                <div>
                    <h2 className="text-lg font-bold mb-2">Single Core Score</h2>
                    <p>{benchmarkData.single_core_score}</p>
                </div>
                <div>
                    <h2 className="text-lg font-bold mb-2">Multi Core Score</h2>
                    <p>{benchmarkData.multi_core_score}</p>
                </div>
                <div>
                    <h2 className="text-lg font-bold mb-2">Speedup</h2>
                    <p>{benchmarkData.speedup}</p>
                </div>
                <div>
                    <h2 className="text-lg font-bold mb-2">Efficiency</h2>
                    <p>{benchmarkData.efficiency}</p>
                </div>
                <div>
                    <h2 className="text-lg font-bold mb-2">CPU Utilization</h2>
                    <p>{benchmarkData.cpu_utilization}</p>
                </div>
                <div>
                    <h2 className="text-lg font-bold mb-2">Time</h2>
                    <p>{benchmarkData.time}</p>
                </div>
                <div>
                    <h2 className="text-lg font-bold mb-2">Hostname</h2>
                    <p>{benchmarkData.hostname}</p>
                </div>
                {benchmarkData.creator && (
                    <div>
                        <h2 className="text-lg font-bold mb-2">Creator</h2>
                        <p>{benchmarkData.creator.name}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default BenchmarkPage;
