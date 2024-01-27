"use client"
import React, { useEffect, useState } from 'react';
import BarChart from "@components/BarChart";
import Footer from "@components/Footer";

const Page = () => {
    const [cpuScores, setCpuScores] = useState([]);
    const [isSingleCore, setIsSingleCore] = useState(true);
    const [isMultiCore, setIsMultiCore] = useState(false);
    const [isApple, setIsApple] = useState(false);
    const [isIntel, setIsIntel] = useState(false);
    const [isAMD, setIsAMD] = useState(false);
    const [isWindows, setIsWindows] = useState(false);
    const [isMacOS, setIsMacOS] = useState(false);
    const [isLinux, setIsLinux] = useState(false);
    const [activeTab, setActiveTab] = useState('single');

    const setAllFalse = () => {
        setIsSingleCore(false);
        setIsMultiCore(false);
        setIsApple(false);
        setIsIntel(false);
        setIsAMD(false);
        setIsWindows(false);
        setIsMacOS(false);
        setIsLinux(false);
    }

    const handleTabChange = (tab) => {
        setActiveTab(tab);
        if (tab === 'single') {
            setAllFalse();
            setIsSingleCore(true);
        } else if (tab === 'multi') {
            setAllFalse();
            setIsMultiCore(true);
        } else if (tab === 'apple') {
            setAllFalse();
            setIsApple(true);
        } else if (tab === 'intel') {
            setAllFalse();
            setIsIntel(true);
        } else if (tab === 'amd') {
            setAllFalse();
            setIsAMD(true);
        } else if (tab === 'windows') {
            setAllFalse();
            setIsWindows(true);
        } else if (tab === 'macos') {
            setAllFalse();
            setIsMacOS(true);
        } else if (tab === 'linux') {
            setAllFalse();
            setIsLinux(true);
        }
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

    // Get the average single core score for each CPU Model
    const calculateAverageSingleCoreScore = () => {
        const cpuModelScores = {};

        cpuScores.forEach((cpu) => {
            if (cpuModelScores[cpu.cpu_model]) {
                cpuModelScores[cpu.cpu_model].push(cpu.single_core_score);
            } else {
                cpuModelScores[cpu.cpu_model] = [cpu.single_core_score];
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
    // Get the average multi core score for each CPU Model
    const calculateAverageMultiCoreScore = () => {
        const cpuModelScores = {};

        cpuScores.forEach((cpu) => {
            if (cpuModelScores[cpu.cpu_model]) {
                cpuModelScores[cpu.cpu_model].push(cpu.multi_core_score);
            } else {
                cpuModelScores[cpu.cpu_model] = [cpu.multi_core_score];
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

    // Retrieve all the single core scores with CPU Model as key and score as value in an array
    const getSingleCoreScores = () => {
        const scores = [];

        cpuScores.forEach((cpu) => {
            scores.push([cpu.cpu_model, cpu.single_core_score]);
        });

        return scores;
    }

    // Retrieve all the multi core scores with CPU Model as key and score as value in an array
    const getMultiCoreScores = () => {
        const scores = [];

        cpuScores.forEach((cpu) => {
            scores.push([cpu.cpu_model, cpu.multi_core_score]);
        });

        return scores;
    }

    // Sort the CPU Models by their average single core scores
    const sortSingleCoreScores = () => {
        const scores = calculateAverageSingleCoreScore();
        const sortedScores = Object.entries(scores).sort((a, b) => b[1] - a[1]);

        return sortedScores;
    }

    // Sort the CPU Models by their average multi core scores
    const sortMultiCoreScores = () => {
        const scores = calculateAverageMultiCoreScore();
        const sortedScores = Object.entries(scores).sort((a, b) => b[1] - a[1]);

        return sortedScores;
    }

    // Get max single core score
    const getMaxSingleCoreScore = () => {
        const scores = calculateAverageSingleCoreScore();
        const maxScore = Math.max(...Object.values(scores));

        return maxScore;
    }

    // Get max multi core score
    const getMaxMultiCoreScore = () => {
        const scores = calculateAverageMultiCoreScore();
        const maxScore = Math.max(...Object.values(scores));

        return maxScore;
    }

    // Get number of items in single core scores
    const getSingleCoreScoresLength = () => {
        const scores = calculateAverageSingleCoreScore();
        const length = Object.values(scores).length;

        return length;
    }

    // Get number of items in multi core scores

    const getMultiCoreScoresLength = () => {
        const scores = calculateAverageMultiCoreScore();
        const length = Object.values(scores).length;

        return length;
    }

    const chartWidth = `100vh`;
    const chartHeight = `${getSingleCoreScoresLength() * 60}px`;

    return (
        <div>
            <h1 className='head_text text-center blue_gradient'>
                CPU Benchmark Results
                <br className='max-md:hidden' />
                <span className='orange_gradient text-center w-full flex-center'>
                    {' '}
                    Right now.
                </span>
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
                </div>
            </div>
            <br />
            <br />
            <br />
            <br />
            {isSingleCore ? (
                <div style={{ width: chartWidth, height: chartHeight, overflow: 'auto' }} className="w-full">
                    <BarChart data={sortSingleCoreScores()} />
                </div>
            ) : (
                <div style={{ width: chartWidth, height: chartHeight, overflow: 'auto' }} className="w-full">
                    <BarChart data={sortMultiCoreScores()} />
                </div>
            )}
            <div className="mt-5 flex-center"></div>
            <Footer />
        </div>
    );
};

export default Page;
