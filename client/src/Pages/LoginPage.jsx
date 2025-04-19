import { useState } from 'react';
import {
    EnvelopeIcon,
    LockClosedIcon,
    ArrowPathIcon,
    CheckCircleIcon,
} from '@heroicons/react/24/outline';
import { Navigate } from 'react-router-dom';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showOTPModal, setShowOTPModal] = useState(false);
    const [otp, setOtp] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [otpSent, setOtpSent] = useState(false);
    const [otpMessage, setOtpMessage] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [canResend, setCanResend] = useState(false);
    const [resendTimer, setResendTimer] = useState(60);

    const handleLogin = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        const isEmail = email.includes('@');
        const loginPayload = isEmail
            ? { email, password }
            : { login: email, password };

        try {
            const response = await fetch('http://localhost:5000/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(loginPayload),
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Login successful:', data);
                Navigate('/');
            }
        } catch (err) {
            console.error('Login error:', err);
        }

        setIsLoading(false);
    };

    const handleForgotPassword = () => {
        if (!email) {
            alert('Please enter your email first');
            return;
        }
        setShowOTPModal(true); // Just show modal, don’t send OTP yet
    };

    const handleSendOTP = async () => {
        setIsLoading(true);

        const isEmail = email.includes('@');
        const loginPayload = isEmail ? { email } : { login: email };

        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/user/send-otp`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(loginPayload),
            });

            if (response.ok) {
                setOtpSent(true);
                setOtpMessage('OTP sent successfully to your email.');
                startResendTimer();
                setTimeout(() => setOtpMessage(''), 4000);
            } else {
                setOtpMessage('Failed to send OTP. Please try again.');
                setTimeout(() => setOtpMessage(''), 4000);
            }
        } catch (err) {
            console.error('Error sending OTP:', err);
        }

        setIsLoading(false);
    };

    const startResendTimer = () => {
        setCanResend(false);
        setResendTimer(60);

        const interval = setInterval(() => {
            setResendTimer(prev => {
                if (prev <= 1) {
                    clearInterval(interval);
                    setCanResend(true);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
    };


    const handleOTPVerification = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/user/verify-otp`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, otp, password: newPassword }),
            });

            const data = await response.json();
            if (response.ok) {
                // console.log('OTP verified:', data);

                alert('OTP Verified ,Password changed successfully!');
                setShowOTPModal(false);
            } else {
                alert(data.message || 'OTP verification failed');
            }
        } catch (err) {
            console.error('OTP verification error:', err);
            alert('Failed to verify OTP.');
        }

        setIsLoading(false);
    };

    return (
        <div className="min-h-screen bg-gray-900 text-white flex flex-col justify-center py-12 px-6 lg:px-8 ">
            {otpMessage && (
                <div className={`fixed top-4 left-1/2 transform -translate-x-1/2 z-50 
                ${otpMessage === 'OTP sent successfully to your email.' ? 'bg-green-600' : 'bg-red-600'} 
                text-white py-2 px-4 rounded-md shadow-lg w-fit flex items-center justify-center gap-2`}>
                    {otpMessage === 'OTP sent successfully to your email.'
                        ? <CheckCircleIcon className="h-5 w-5 text-white" />
                        : <ArrowPathIcon className="h-5 w-5 text-white" />}
                    <span className="text-sm font-medium">{otpMessage}</span>
                </div>
            )}


            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <h2 className="mt-6 text-center text-3xl font-extrabold text-purple-400">
                    Welcome to RepoMatch
                </h2>
                <p className="mt-2 text-center text-sm text-gray-400">
                    Match with GitHub repositories based on your skills
                </p>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-gray-800 py-8 px-6 shadow rounded-lg">
                    <form onSubmit={handleLogin} className="space-y-6">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-300">
                                Email or GitHub Username
                            </label>
                            <div className="mt-1 relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <EnvelopeIcon className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    type="text"
                                    name="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    className="w-full pl-10 pr-3 py-2 bg-gray-700 text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                                    placeholder="you@example.com"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-300">
                                Password
                            </label>
                            <div className="mt-1 relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <LockClosedIcon className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    type="password"
                                    name="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    className="w-full pl-10 pr-3 py-2 bg-gray-700 text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                                    placeholder="••••••••"
                                />
                            </div>
                        </div>

                        <div className="flex items-center justify-between">
                            <label className="flex items-center text-sm text-gray-300">
                                <input type="checkbox" className="mr-2 rounded text-purple-600" />
                                Remember me
                            </label>
                            <button
                                type="button"
                                onClick={handleForgotPassword}
                                className="text-sm text-purple-400 hover:text-purple-300"
                                disabled={isLoading}
                            >
                                Forgot password?
                            </button>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md text-sm font-medium bg-purple-600 hover:bg-purple-700 disabled:opacity-50"
                        >
                            {isLoading ? (
                                <ArrowPathIcon className="h-5 w-5 animate-spin" />
                            ) : (
                                'Sign in'
                            )}
                        </button>
                    </form>
                </div>
            </div>

            {showOTPModal && (
                <div className="fixed z-10 inset-0 flex items-center justify-center bg-black bg-opacity-60">
                    <div className="bg-gray-800 rounded-lg p-6 w-full max-w-sm text-center">
                        <div className="mb-4 text-purple-400 font-bold text-lg">
                            OTP Verification
                        </div>

                        <p className="text-sm text-gray-300 mb-2">
                            { }
                        </p>

                        <button
                            onClick={handleSendOTP}
                            disabled={isLoading}
                            className="w-full py-2 mb-4 bg-purple-600 text-white rounded hover:bg-purple-700"
                        >
                            {isLoading ? 'Sending OTP...' : 'Send OTP'}
                        </button>

                        {otpSent && (
                            <>
                                <label htmlFor="newPassword" className="block text-sm font-medium text-gray-300 text-left mb-1">
                                    New Password
                                </label>
                                <input
                                    type="password"
                                    name="newPassword"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    required
                                    className="w-full pl-3 pr-3 py-2 bg-gray-700 text-white border border-gray-600 rounded-md mb-4"
                                    placeholder="Enter new password"
                                />

                                <form onSubmit={handleOTPVerification}>
                                    <input
                                        type="text"
                                        value={otp}
                                        onChange={(e) => setOtp(e.target.value)}
                                        placeholder="Enter 6-digit OTP"
                                        className="w-full text-center text-lg bg-gray-700 text-white border border-gray-600 rounded-md py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-purple-500"
                                        maxLength="6"
                                    />
                                    <button
                                        type="submit"
                                        className="w-full py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
                                    >
                                        Verify OTP
                                    </button>
                                </form>
                                <div className="text-center mt-2 mb-4">
                                    {canResend ? (
                                        <button
                                            onClick={handleSendOTP}
                                            className="text-sm text-purple-400 hover:text-purple-300"
                                        >
                                            Resend OTP
                                        </button>
                                    ) : (
                                        <p className="text-xs text-gray-400">
                                            You can resend OTP in {resendTimer}s
                                        </p>
                                    )}
                                </div>

                            </>
                        )}
                    </div>
                </div>
            )}

        </div>
    );
};

export default LoginPage;
