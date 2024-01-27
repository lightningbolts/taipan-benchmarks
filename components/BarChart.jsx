import React, { useRef, useEffect, useState } from 'react';

const BarChart = ({ data }) => {
    const svgRef = useRef();
    const [barWidth, setBarWidth] = useState(0);
    const [browserHeight, setBrowserHeight] = useState(window.innerHeight);
    const height = 50;
    const barGap = 5;
    const maxData = Math.max(...data.map(([, value]) => value)) * 2;

    // remove decimals from data values
    data.forEach(([, value], i) => {
        data[i][1] = Math.round(value);
    });

    // Remove (R) from Intel(R) and (TM) from Core(TM) and Processor and CPU and "__th Gen" and "with Radeon Graphics", but don't remove Core for all cpu models
    data.forEach(([index, value], i) => {
        let cpu_model = index;
        cpu_model = cpu_model.replace(/\(R\)/g, "");
        cpu_model = cpu_model.replace(/\(TM\)/g, "");
        cpu_model = cpu_model.replace(/Processor/g, "");
        cpu_model = cpu_model.replace(/CPU/g, "");
        cpu_model = cpu_model.replace(/with Radeon Graphics/g, "");
        // Remove extra spaces
        cpu_model = cpu_model.replace(/\s\s+/g, " ");
        // Remove spaces at the beginning and end
        cpu_model = cpu_model.trim();
        data[i][0] = cpu_model;
    });
    const scale = (value) => (value / maxData) * (browserHeight - height - barGap);
    useEffect(() => {
        if (svgRef.current) {
            setBarWidth(svgRef.current.getBoundingClientRect().width);
        }
        const handleResize = () => {
            setBrowserHeight(window.innerHeight);
        };
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <svg ref={svgRef} height={height * data.length + height + 4 * barGap} className="w-full">
            {data.map(([index, value], i) => {
                const rectWidth = scale(value);
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
                            x={300} // Adjust this value as needed
                            y={i * (height + barGap)}
                            width={rectWidth}
                            height={height}
                            fill={index.includes('Intel') ? '#76c6ff' : index.includes('AMD') ? '#ff7676' : index.includes('Apple') ? '#9a9a9a' : '#000000'}
                        />
                        <text
                            x={300 + (rectWidth > 50 ? rectWidth - 10 : rectWidth + 10)} // Adjust this value as needed
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
            <line
                x1="300"
                y1="0"
                x2="300"
                y2={(height + barGap) * data.length - barGap}
                stroke="black"
            />
        </svg>
    );
};

export default BarChart;