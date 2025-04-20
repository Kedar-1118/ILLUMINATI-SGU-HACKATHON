import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
    BarChart, Bar,
    LineChart, Line,
    XAxis, YAxis,
    Tooltip, ResponsiveContainer, CartesianGrid
} from 'recharts';
import dayjs from 'dayjs';

const groupContributions = (data, period = 'week') => {
    const grouped = {};

    data.forEach(day => {
        const key = period === 'month'
            ? dayjs(day.date).format('YYYY-MM')
            : dayjs(day.date).startOf('week').format('YYYY-MM');

        grouped[key] = (grouped[key] || 0) + day.count;
    });

    return Object.entries(grouped).map(([date, total]) => ({ date, total }));
};

const ContributionChart = ({ username }) => {
    let period = 'week';
    const [data, setData] = useState([]);

    useEffect(() => {
        if (!username) return;

        const fetchData = async () => {
            try {
                const response = await axios.get(`https://github-contributions-api.jogruber.de/v4/${username}`);
                const contributionData = response.data.contributions.map(day => ({
                    date: day.date,
                    count: day.count,
                }));

                const grouped = groupContributions(contributionData, period);
                setData(grouped);
            } catch (error) {
                console.error("Error fetching contribution data:", error);
            }
        };

        fetchData();
    }, [username, period]);

    return (
        <div className="bg-gray-800 text-white rounded-2xl shadow-lg p-6 space-y-10">
            <h2 className="text-2xl font-semibold text-center">
                GitHub {period === 'month' ? 'Monthly' : 'Weekly'}   <span className="text-blue-400">Contributions</span>
            </h2>

            {/* Bar Chart */}
            {/* <div>
                <h3 className="text-xl font-medium mb-2">📦 Bar Chart View</h3>
                <div className="w-full h-80">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={data}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#4b5563" />
                            <XAxis
                                dataKey="date"
                                stroke="#9ca3af"
                                tick={{ fontSize: 12 }}
                            />
                            <YAxis stroke="#9ca3af" tick={{ fontSize: 12 }} />
                            <Tooltip
                                contentStyle={{ backgroundColor: '#1f2937', borderColor: '#374151', color: 'white' }}
                                itemStyle={{ color: '#d1d5db' }}
                                labelStyle={{ color: '#9ca3af' }}
                            />
                            <Bar dataKey="total" fill="#60a5fa" radius={[4, 4, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div> */}

            {/* Line Chart */}
            <div>
                {/* <h3 className="text-xl font-medium mb-2">📈 Line Chart View</h3> */}
                <div className="w-full h-80">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={data}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#4b5563" />
                            <XAxis
                                dataKey="date"
                                stroke="#9ca3af"
                                tick={{ fontSize: 12 }}
                            />
                            <YAxis stroke="#9ca3af" tick={{ fontSize: 12 }} />
                            <Tooltip
                                contentStyle={{ backgroundColor: '#1f2937', borderColor: '#374151', color: 'white' }}
                                itemStyle={{ color: '#d1d5db' }}
                                labelStyle={{ color: '#9ca3af' }}
                            />
                            <Line
                                type="monotone"
                                dataKey="total"
                                stroke="#38bdf8"
                                strokeWidth={2}
                                dot={false}
                                activeDot={{ r: 6 }}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};

export default ContributionChart;
