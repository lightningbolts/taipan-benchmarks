"use client"
import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, BarController, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { set } from 'mongoose';

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

    // Get all the CPU models
    const cpuModels = Object.keys(calculateAverageSingleCoreScore());
    const cpuModels2 = Object.keys(calculateAverageMultiCoreScore());
    // Get all the average single core scores
    const singleCoreScores = Object.values(calculateAverageSingleCoreScore());
    // Get all the average multi core scores
    const multiCoreScores = Object.values(calculateAverageMultiCoreScore());

    // console.log(calculateAverageSingleCoreScore());
    // console.log(calculateAverageMultiCoreScore());

    // Create two datasets from the average scores
    const labels = cpuModels;
    const labels2 = cpuModels2;
    const data = {
        labels: cpuModels.sort((a, b) => calculateAverageSingleCoreScore()[b] - calculateAverageSingleCoreScore()[a]),
        datasets: [{
            axis: 'y',
            label: 'Single Core Score',
            data: singleCoreScores.sort((a, b) => b - a),
            fill: false,
            backgroundColor: singleCoreScores.map((score, index) => {
                const cpuModel = labels[index];
                if (cpuModel.includes('Intel')) {
                    return 'rgba(54, 162, 235, 0.2)';
                } else if (cpuModel.includes('AMD')) {
                    return 'rgba(255, 99, 132, 0.2)';
                } else if (cpuModel.includes('Apple')) {
                    return 'rgba(0, 0, 0, 0.2)';
                }
                return 'rgba(0, 0, 0, 0.2)'; // Default color
            }),
            borderColor: singleCoreScores.map((score, index) => {
                const cpuModel = labels[index];
                if (cpuModel.includes('Intel')) {
                    return 'rgb(54, 162, 235)';
                } else if (cpuModel.includes('AMD')) {
                    return 'rgb(255, 99, 132)';
                } else if (cpuModel.includes('Apple')) {
                    return 'rgb(0, 0, 0)';
                }
                return 'rgb(0, 0, 0)'; // Default color
            }),
            borderWidth: 1
        }]
    };

    const config = {
        type: 'bar',
        data,
        options: {
            indexAxis: 'y',
        }
    };

    const data2 = {
        labels: cpuModels2.sort((a, b) => calculateAverageMultiCoreScore()[b] - calculateAverageMultiCoreScore()[a]),
        datasets: [{
            axis: 'y',
            label: 'Multi Core Score',
            data: multiCoreScores.sort((a, b) => b - a),
            fill: false,
            backgroundColor: multiCoreScores.map((score, index) => {
                const cpuModel = labels2[index];
                if (cpuModel.includes('Intel')) {
                    return 'rgba(54, 162, 235, 0.2)';
                } else if (cpuModel.includes('AMD')) {
                    return 'rgba(255, 99, 132, 0.2)';
                } else if (cpuModel.includes('Apple')) {
                    return 'rgba(0, 0, 0, 0.2)';
                }
                return 'rgba(0, 0, 0, 0.2)'; // Default color
            }),
            borderColor: multiCoreScores.map((score, index) => {
                const cpuModel = labels2[index];
                if (cpuModel.includes('Intel')) {
                    return 'rgb(54, 162, 235)';
                } else if (cpuModel.includes('AMD')) {
                    return 'rgb(255, 99, 132)';
                } else if (cpuModel.includes('Apple')) {
                    return 'rgb(0, 0, 0)';
                }
                return 'rgb(0, 0, 0)'; // Default color
            }),
            borderWidth: 1
        }]
    };

    const config2 = {
        type: 'bar',
        data: data2,
        options: {
            indexAxis: 'y',
        }
    };

    // Register the chart components
    Chart.register(
        CategoryScale,
        LinearScale,
        BarController,
        BarElement,
        Title,
        Tooltip,
        Legend
    );

    return (
        <div>
            <h1 className='head_text text-center blue_gradient'>
                CPU Benchmark Results
                <br className='max-md:hidden' />
                <span className='orange_gradient text-center'>
                    {' '}
                    Right now.
                </span>
            </h1>
            <br />
            <br />
            <br />
            <br />

            <div style={{ border: '1px solid #ccc', borderRadius: '10px', padding: '10px' }}>
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
                <div style={{ width: '100%', height: '100vh' }}>
                    <Bar {...config} className='' style={{ width: '100%', height: '100%' }} />
                </div>
            ) : (
                <div style={{ width: '100%', height: '100vh' }}>
                    <Bar {...config2} className='' style={{ width: '100%', height: '100%' }} />
                </div>
            )}
        </div>
    );
};

export default Page;
