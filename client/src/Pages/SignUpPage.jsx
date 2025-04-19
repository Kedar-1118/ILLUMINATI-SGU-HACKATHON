import { useState } from 'react';
import { MarkGithubIcon, DeviceDesktopIcon, RocketIcon } from '@primer/octicons-react';

const GitHubSignup = () => {
    const [isLoading, setIsLoading] = useState(false);

    const handleGitHubLogin = () => {
        setIsLoading(true);
        // GitHub OAuth URL construction
        const clientId = process.env.REACT_APP_GITHUB_CLIENT_ID;
        const redirectUri = process.env.REACT_APP_GITHUB_REDIRECT_URI;
        const scope = 'user:email';
        const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}`;

        window.location.href = githubAuthUrl;
    };

    return (
        <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col items-center justify-center p-6">
            <div className="max-w-md w-full space-y-8">
                {/* Header Section */}
                <div className="text-center">
                    <RocketIcon className="h-16 w-16 text-purple-500 mx-auto mb-4 animate-pulse" />
                    <h2 className="text-4xl font-extrabold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
                        Join RepoMatch
                    </h2>
                    <p className="mt-4 text-gray-400">
                        Connect with GitHub to find projects matching your skills
                    </p>
                </div>

                {/* GitHub OAuth Button */}
                <div className="mt-8 space-y-6">
                    <button
                        onClick={handleGitHubLogin}
                        disabled={isLoading}
                        className="w-full flex items-center justify-center space-x-3 py-4 px-6 border border-gray-700 rounded-xl bg-gray-800 hover:bg-gray-750 transition-all duration-200 disabled:opacity-50"
                    >
                        {isLoading ? (
                            <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        ) : (
                            <>
                                <MarkGithubIcon className="h-6 w-6" />
                                <span className="text-lg">Continue with GitHub</span>
                            </>
                        )}
                    </button>


                    {/* Divider */}
                    {/* <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-700"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-2 bg-gray-900 text-gray-400">or</span>
                        </div>
                    </div> */}

                    {/* Alternative Signup (Optional) */}
                    {/* <div className="space-y-4">
                        <input
                            type="email"
                            placeholder="Email address"
                            className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-purple-500"
                        />
                        <button className="w-full py-3 px-6 bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors duration-200">
                            Get Started
                        </button>
                    </div> */}
                </div>

                {/* Footer Text */}
                <p className="mt-8 text-center text-sm text-gray-400">
                    By joining, you agree to our
                    <a href="#" className="text-purple-400 hover:text-purple-300 ml-1">
                        Terms of Service
                    </a>
                </p>
            </div>
        </div>
    );
};

export default GitHubSignup;