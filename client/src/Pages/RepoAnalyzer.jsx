import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const RepoAnalyzer = () => {
    const { owner, repo } = useParams();
    // const githubUrl = `https://github.com/${owner}/${repo}`;s

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchRepoData = async () => {
            if (!owner || !repo) return;

            setLoading(true);
            try {
                const response = await axios.post(`https://open-nest-server.onrender.com/analyze`, {
                    repo: `${owner}/${repo}`,
                });
                const result = response.data;

                const languages = Object.entries(result.languages).map(([language, bytes]) => ({
                    language,
                    bytes,
                }));
                const totalBytes = languages.reduce((sum, lang) => sum + lang.bytes, 0);
                const formattedLanguages = languages.map((l) => ({
                    language: l.language,
                    percentage: ((l.bytes / totalBytes) * 100).toFixed(2),
                }));

                setData({ ...result, languages: formattedLanguages });
            } catch (error) {
                console.error(error);
                alert(`Error fetching data. Make sure the repo exists. ${error.message}`);
            }
            setLoading(false);
        };

        fetchRepoData();
    }, [owner, repo]);

    const chartData = {
        labels: data?.languages?.map((l) => l.language),
        datasets: [
            {
                data: data?.languages?.map((l) => l.percentage),
                backgroundColor: ['#38bdf8', '#f472b6', '#34d399', '#fcd34d', '#a78bfa', '#fb7185'],
            },
        ],
    };

    if (!owner || !repo) return null;

    return (
        <div className="min-h-screen bg-gray-900 text-white p-6 font-sans">
            <div className="max-w-4xl mx-auto space-y-10">
                <header className="text-center">
                    <h1 className="text-4xl font-bold"> <b className='text-purple-400'>Insights</b>: <span className='text-blue-400'>{repo}</span> by <span className='text-green-400'>{owner}</span></h1>
                    {/* <p className="text-gray-400 mt-2">Analyzing: {githubUrl}   {owner}/{repo}</p> */}
                </header>

                {loading && (
                    <div className="text-center text-gray-300 text-xl animate-pulse">Fetching repository data...</div>
                )}

                {data && (
                    <div className="space-y-10">
                        {/* Basic Info */}
                        <section className="bg-gray-800 p-6 rounded-xl shadow-lg">
                            <h2 className="text-2xl font-semibold">{data.name}</h2>
                            <p className="text-gray-400">{data.description}</p>
                            <div className="flex flex-wrap gap-4 text-sm mt-4">
                                <span>⭐ Stars: {data.stars}</span>
                                <span>🍴 Forks: {data.forks}</span>
                                <span>🐛 Issues: {data.openIssues}</span>
                                <span>🔀 Pull Requests: {data.openPRs}</span>
                            </div>
                        </section>

                        {/* Language Chart */}
                        <section className="bg-gray-800 p-6 rounded-xl shadow-lg">
                            <h2 className="text-2xl font-semibold mb-4">🧠 Language Breakdown</h2>
                            <div className="w-full md:w-1/2 mx-auto">
                                <Pie data={chartData} />
                            </div>
                        </section>

                        {/* Contributors */}
                        <section className="bg-gray-800 p-6 rounded-xl shadow-lg">
                            <h2 className="text-2xl font-semibold mb-4">👥 Top Contributors</h2>
                            {data.contributors?.length > 0 ? (
                                <ul className="divide-y divide-gray-700">
                                    {data.contributors.slice(0, 5).map((c, i) => (
                                        <li key={i} className="flex justify-between py-3">
                                            <span>{c.login}</span>
                                            <span className="text-gray-400">{c.contributions} contributions</span>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p className="text-gray-400">No contributors found.</p>
                            )}
                        </section>
                    </div>
                )}
            </div>
        </div>
    );
};

export default RepoAnalyzer;
