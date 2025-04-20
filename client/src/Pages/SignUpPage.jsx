import { useState } from "react";

import {
    MarkGithubIcon,
    RocketIcon,
    PeopleIcon,
    FlameIcon,
    DeviceDesktopIcon,
} from "@primer/octicons-react";

import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const GitHubSignup = () => {
    const [isLoading, setIsLoading] = useState(false);

    const handleGitHubLogin = () => {
        setIsLoading(true);
        const clientId = process.env.REACT_APP_GITHUB_CLIENT_ID;
        const redirectUri = process.env.REACT_APP_GITHUB_REDIRECT_URI;
        const scope = "user:email";
        const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}`;
        window.location.href = githubAuthUrl;
    };

    return (
        <div className="min-h-screen bg-black text-gray-100 relative overflow-hidden px-6 py-10">
            {/* Glowing BG circles */}
            <div className="absolute top-0 left-0 w-80 h-80 bg-purple-700 opacity-20 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-0 right-0 w-80 h-80 bg-pink-600 opacity-20 rounded-full blur-3xl animate-pulse" />

            {/* Main container */}
            <div className="max-w-xl mx-auto z-10 relative">
                {/* Header */}
                <div className="text-center">
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.6 }}
                    >
                        <RocketIcon className="h-16 w-16 text-purple-500 mx-auto mb-4 animate-bounce" />
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-4xl font-extrabold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent"
                    >
                        Join OpenNest
                    </motion.h2>
                    <p className="mt-4 text-gray-400 text-lg">
                        Find open-source projects that match your skills effortlessly.
                    </p>
                </div>

                {/* GitHub Login */}
                <motion.div
                    className="mt-10"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                >
                    <button
                        onClick={handleGitHubLogin}
                        disabled={isLoading}
                        className="w-full flex items-center justify-center space-x-3 py-4 px-6 border border-purple-700 rounded-xl bg-gradient-to-r from-gray-800 to-gray-900 hover:from-gray-700 transition-all duration-300 disabled:opacity-50"
                    >
                        {isLoading ? (
                            <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        ) : (
                            <>
                                <MarkGithubIcon className="h-6 w-6" />
                                <span className="text-lg font-medium">Continue with GitHub</span>
                            </>
                        )}
                    </button>
                </motion.div>

                {/* Highlights */}
                <motion.div
                    className="mt-12 space-y-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6, duration: 0.8 }}
                >
                    <h3 className="text-center text-xl font-semibold text-purple-300">
                        Why Join OpenNest?
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div className="flex items-start gap-3">
                            <FlameIcon className="text-pink-500 mt-1" />
                            <div>
                                <h4 className="font-semibold text-white">Get Matched Instantly</h4>
                                <p className="text-sm text-gray-400">AI-powered project recommendations.</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <PeopleIcon className="text-purple-400 mt-1" />
                            <div>
                                <h4 className="font-semibold text-white">Grow Your Network</h4>
                                <p className="text-sm text-gray-400">Collaborate with maintainers & devs.</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <DeviceDesktopIcon className="text-blue-400 mt-1" />
                            <div>
                                <h4 className="font-semibold text-white">Showcase Skills</h4>
                                <p className="text-sm text-gray-400">Auto-sync with your GitHub profile.</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <RocketIcon className="text-green-400 mt-1" />
                            <div>
                                <h4 className="font-semibold text-white">Launch Your Career</h4>
                                <p className="text-sm text-gray-400">Contribute & get noticed by recruiters.</p>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Login Button */}
                <div className="flex justify-center mt-10">
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-gradient-to-r from-purple-500 to-blue-900 px-6 py-3 rounded-xl text-white font-semibold transition shadow-md"
                    >
                        <Link to="/login">Login</Link>
                    </motion.button>
                </div>

                {/* Footer */}
                <p className="mt-12 text-center text-sm text-gray-500">
                    By joining, you agree to our
                    <a href="#" className="text-purple-400 hover:underline ml-1">
                        Terms of Service
                    </a>
                </p>
            </div>
        </div>
    );
};

export default GitHubSignup;
