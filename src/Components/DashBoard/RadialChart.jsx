import React from "react";
import { RadialBarChart, RadialBar, PolarAngleAxis, ResponsiveContainer } from "recharts";

export default function RadialChart({ servicedCarsPercentage }) {
    const getColor = () => {
        return "rgb(182, 51, 46)";
    };

    const fillColor = getColor(servicedCarsPercentage);

    const data = [
        {
            uv: servicedCarsPercentage,
            fill: fillColor,
        }
    ];



    return (
        <ResponsiveContainer width="100%" height="100%">
            <RadialBarChart
                cx="50%"
                cy="50%"
                innerRadius="80%"
                outerRadius="800%"
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
                <text x="50%" y="50%" fill="black" textAnchor="middle" dominantBaseline="central" fontSize="40">
                    {`${servicedCarsPercentage}%`}
                </text>
            </RadialBarChart>
        </ResponsiveContainer>
    );
}
