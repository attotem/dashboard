import React from "react";
import { RadialBarChart, RadialBar, PolarAngleAxis } from "recharts";

export default function RadialChart({ servicedCarsPercentage }) {
    const getColor = (percentage) => {
        return "rgb(182, 51, 46)";
    };

    const fillColor = getColor(servicedCarsPercentage);

    const data = [
        {
            uv: servicedCarsPercentage,
            fill: fillColor,
        }
    ];

    const centerX = 250;
    const centerY = 250;

    return (
        <RadialBarChart
            width={500}
            height={500}
            cx={centerX}
            cy={centerY}
            innerRadius={150}
            outerRadius={200}
            barSize={10}
            startAngle={180}
            endAngle={-180}
            data={data}
        >
            <PolarAngleAxis type="number" domain={[0, 100]} tick={false} />
            <RadialBar
                cornerRadius={10}
                minAngle={15}
                background
                clockWise
                dataKey="uv"
                fill={fillColor} 
            />
            <text x={centerX} y={centerY} fill="black" textAnchor="middle" dominantBaseline="central" fontSize="40">
                {`${servicedCarsPercentage}%`}
            </text>
        </RadialBarChart>
    );
}
