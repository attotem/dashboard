import React, { useEffect, useState } from "react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";

export default function Linechart({ data }) {


    return (
        <AreaChart
            width={900}
            height={280}
            data={data}
            margin={{
                top: 10,
                right: 30,
                left: 0,
                bottom: 0
            }}
        >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Area type="monotone" dataKey="dailySpending" stroke="rgb(182, 51, 46)" fill="rgb(182, 51, 46)" />
        </AreaChart>
    );
}
