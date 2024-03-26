import React from "react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

export default function Linechart({ data }) {

    return (
        <ResponsiveContainer width="100%" height="90%">
            <AreaChart
                data={data}
                margin={{
                    top: 10,
                    right: 30,
                    left: 0,
                    bottom: 0,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="dailySpending" stroke="rgb(182, 51, 46)" fill="rgb(182, 51, 46)" />
            </AreaChart>
        </ResponsiveContainer>
    );
}
