
"use client";

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface PollResultChartProps {
  data: {
    option: string;
    votes: number;
  }[];
}

export function PollResultChart({ data }: PollResultChartProps) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="option" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="votes" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  );
}
