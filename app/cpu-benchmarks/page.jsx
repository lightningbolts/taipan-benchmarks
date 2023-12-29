"use client"
import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, BarController, BarElement, Title, Tooltip, Legend } from 'chart.js';

const Page = () => {
    const [cpuScores, setCpuScores] = useState([]);

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

    console.log(calculateAverageSingleCoreScore());
    console.log(calculateAverageMultiCoreScore());

    // Create two charts, one for single core scores and one for multi core scores
    // const chartData = {
    //     labels: Object.keys(calculateAverageSingleCoreScore()),
    //     datasets: [
    //         {
    //             label: 'Single Core Score',
    //             data: Object.values(calculateAverageSingleCoreScore()),
    //             backgroundColor: 'rgba(75, 192, 192, 0.6)',
    //             borderWidth: 4,
    //         },
    //         {
    //             label: 'Multi Core Score',
    //             data: Object.values(calculateAverageMultiCoreScore()),
    //             backgroundColor: 'rgba(153, 102, 255, 0.6)',
    //             borderWidth: 4,
    //         },
    //     ],
    // };

    // Chart.register(CategoryScale, Bar);

    const state = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [
            {
                label: 'My First dataset',
                backgroundColor: 'rgba(255,99,132,0.2)',
                borderColor: 'rgba(255,99,132,1)',
                borderWidth: 1,
                hoverBackgroundColor: 'rgba(255,99,132,0.4)',
                hoverBorderColor: 'rgba(255,99,132,1)',
                data: [65, 59, 80, 81, 56, 55, 40]
            }
        ]
    }

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
            <h1>Average CPU Score:</h1>
            <Bar data={state} />
        </div>
    );
};

export default Page;
