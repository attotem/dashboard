import React from "react";
import { RadialBarChart, RadialBar, PolarAngleAxis } from "recharts";

export default function RadialChart({ servicedCarsPercentage }) {
    // Function to determine color based on the percentage
    const getColor = (percentage) => {
        if (percentage <= 33) return "rgb(182, 51, 46)"; // Red
        if (percentage <= 66) return "orange"; // Yellow
        return "rgb(34, 139, 34)"; // Green
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
                fill={fillColor} // Use dynamic fill color for the bar
            />
            {/* Use dynamic fill color for the text */}
            <text x={centerX} y={centerY} fill={fillColor} textAnchor="middle" dominantBaseline="central" fontSize="40">
                {`${servicedCarsPercentage}%`}
            </text>
        </RadialBarChart>
    );
}
