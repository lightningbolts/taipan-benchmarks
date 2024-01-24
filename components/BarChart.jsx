import React, { useRef, useEffect, useState } from 'react';

const BarChart = ({ data }) => {
    const svgRef = useRef();
    const [barWidth, setBarWidth] = useState(0);
    const height = 50;
    const barGap = 5;
    const maxData = Math.max(...data.map(([, value]) => value)) * 2;

    // remove decimals from data values
    data.forEach(([, value], i) => {
        data[i][1] = Math.round(value);
    });
    const scale = (value) => (value / maxData) * barWidth;

    useEffect(() => {
        if (svgRef.current) {
            setBarWidth(svgRef.current.getBoundingClientRect().width);
        }
    }, []);

    return (
        <svg ref={svgRef} height={height * data.length + height + 4 * barGap} className="w-full flex">
            {data.map(([index, value], i) => {
                const rectWidth = scale(value) * 0.7;
                return (
                    <g key={index}>
                        <text
                            x={0} // Adjust this value as needed
                            y={i * (height + barGap) + height / 2}
                            fill="black"
                            dominantBaseline="middle"
                        >
                            {index}
                        </text>
                        <rect
                            x={400} // Adjust this value as needed
                            y={i * (height + barGap)}
                            width={rectWidth}
                            height={height}
                            fill={index.includes('Intel') ? '#76c6ff' : index.includes('AMD') ? '#ff7676' : index.includes('Apple') ? '#9a9a9a' : '#000000'}
                        />
                        <text
                            x={400 + (rectWidth > 50 ? rectWidth - 10 : rectWidth + 10)} // Adjust this value as needed
                            y={i * (height + barGap) + height / 2}
                            fill="black"
                            dominantBaseline="middle"
                            textAnchor={rectWidth > 50 ? 'end' : 'start'}
                        >
                            {value}
                        </text>
                    </g>
                );
            })}
            <line x1="400" y1={height * data.length + height + 2 * barGap} x2="400" y2="0" stroke="black" /> {/* y-axis */}
        </svg>
    );
};

export default BarChart;