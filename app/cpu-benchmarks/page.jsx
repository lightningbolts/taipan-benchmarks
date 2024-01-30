"use client"
import React, {useEffect, useState} from 'react';
import BarChart from "@components/BarChart";
import Footer from "@components/Footer";

const Page = () => {
    const [cpuScores, setCpuScores] = useState([]);
    const [activeTab, setActiveTab] = useState('single');
    const [tabStates, setTabStates] = useState({
        isSingleCore: true,
        isMultiCore: false,
        isSpeedup: false,
        isEfficiency: false,
    });

    const handleTabChange = (tab) => {
        setActiveTab(tab);
        setTabStates({
            isSingleCore: tab === 'single',
            isMultiCore: tab === 'multi',
            isSpeedup: tab === 'speedup',
            isEfficiency: tab === 'efficiency',
        });
    }
    useEffect(() => {
        // Fetch CPU scores from an API or database
        const fetchCpuScores = async () => {
            try {
                const response = await fetch('/api/cpu-benchmarks', { cache: 'no-store' });

                const data = await response.json();
                setCpuScores(data);
            } catch (error) {
                console.error('Error fetching CPU scores:', error);
            }
        };

        fetchCpuScores();
    }, []);

    // Get the average score for each CPU Model
    const calculateAverageScore = (scoreType) => {
        const cpuModelScores = {};

        cpuScores.forEach((cpu) => {
            if (cpuModelScores[cpu.cpu_model]) {
                cpuModelScores[cpu.cpu_model].push(cpu[scoreType]);
            } else {
                cpuModelScores[cpu.cpu_model] = [cpu[scoreType]];
            }
        });

        const averageScores = {};

        Object.keys(cpuModelScores).forEach((cpuModel) => {
            const cpuModelScore = cpuModelScores[cpuModel];
            const sum = cpuModelScore.reduce((a, b) => a + b, 0);
            const avg = (sum / cpuModelScore.length) || 0;
            averageScores[cpuModel] = avg.toFixed(2);
        });

        return averageScores;
    }

    // Sort the CPU Models by their average scores
    const sortScores = (scoreType) => {
        const scores = calculateAverageScore(scoreType);
        return Object.entries(scores).sort((a, b) => b[1] - a[1]);
    }

    // Get number of items in single core scores
    const getSingleCoreScoresLength = () => {
        const scores = calculateAverageScore("single_core_score");
        return Object.values(scores).length;
    }

    const chartWidth = `100vh`;
    const chartHeight = `${getSingleCoreScoresLength() * 60}px`;

    return (
        <div>
            <h1 className='head_text text-center w-full blue_gradient'>
                CPU Benchmark Results. Now.
            </h1>
            <br />
            <br />
            <br />
            <br />

            <div style={{ border: '1px solid #ccc', borderRadius: '10px', padding: '10px' }} className="w-full flex">
                <div style={{ display: 'flex', justifyContent: 'left', alignItems: 'center', height: '100%' }}>
                    <button onClick={() => handleTabChange('single')} className={`text-center black_btn ${activeTab === 'single' ? 'active-tab' : ''}`} style={{ marginRight: '10px' }}>
                        {activeTab === 'single' ? <strong>Single Core</strong> : 'Single Core'}
                    </button>
                    <button onClick={() => handleTabChange('multi')} className={`text-center black_btn ${activeTab === 'multi' ? 'active-tab' : ''}`}>
                        {activeTab === 'multi' ? <strong>Multi Core</strong> : 'Multi Core'}
                    </button>
                    <button onClick={() => handleTabChange('speedup')} className={`text-center black_btn ${activeTab === 'speedup' ? 'active-tab' : ''}`} style={{ marginLeft: '10px' }}>
                        {activeTab === 'speedup' ? <strong>Speedup</strong> : 'Speedup'}
                    </button>
                    <button onClick={() => handleTabChange('efficiency')} className={`text-center black_btn ${activeTab === 'efficiency' ? 'active-tab' : ''}`} style={{ marginLeft: '10px' }}>
                        {activeTab === 'efficiency' ? <strong>Efficiency</strong> : 'Efficiency'}
                    </button>
                </div>
            </div>
            <br />
            <br />
            <br />
            <br />
            {activeTab === 'single' && (
                <BarChart
                    data={sortScores('single_core_score')}
                    width={chartWidth}
                    height={chartHeight}
                    scoreType='single_core_score'
                    tabStates={tabStates}
                />
            )}
            {activeTab === 'multi' && (
                <BarChart
                    data={sortScores('multi_core_score')}
                    width={chartWidth}
                    height={chartHeight}
                    scoreType='multi_core_score'
                    tabStates={tabStates}
                />
            )}
            {activeTab === 'speedup' && (
                <BarChart
                    data={sortScores('speedup')}
                    width={chartWidth}
                    height={chartHeight}
                    scoreType='speedup'
                    tabStates={tabStates}
                />
            )}
            {activeTab === 'efficiency' && (
                <BarChart
                    data={sortScores('efficiency')}
                    width={chartWidth}
                    height={chartHeight}
                    scoreType='efficiency'
                    tabStates={tabStates}
                />
            )}

            <div className="mt-5 flex-center"></div>
            <Footer />
        </div>
    );
};

export default Page;
