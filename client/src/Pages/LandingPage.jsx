import React, { useRef, useState } from "react";
import { FaGithub, FaRocket, FaUsers, FaLock, FaCodeBranch, FaChartLine } from "react-icons/fa";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";
import { Link } from "react-router-dom";

export default function LandingPage() {
    const form = useRef();
    const [isSent, setIsSent] = useState(false);

    const sendEmail = (e) => {
        e.preventDefault();

        emailjs
            .sendForm(
                "service_iwcex8f",
                "template_qkt8ldj",
                form.current,
                "Tf0tiIa2jbW73zyab"
            )
            .then(
                () => {
                    setIsSent(true);
                    form.current.reset();
                },
                () => setIsSent(false)
            );
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-black via-gray-950 to-black text-white font-sans relative overflow-hidden">
            {/* Animated Background Effects */}
            <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-purple-800 opacity-20 blur-3xl rounded-full animate-pulse z-0"></div>
            <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-blue-900 opacity-10 blur-2xl rounded-full animate-ping z-0"></div>

            <div className="relative z-20">
                {/* Animated Branding */}
                <div className="text-center pt-10">
                    <motion.h1
                        initial={{ opacity: 0, y: -30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1 }}
                        className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent tracking-wide"
                    >
                        OpenNest
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="text-purple-300 mt-2"
                    >
                        Where open-source minds connect.
                    </motion.p>
                </div>

                {/* Hero Section */}
                <main className="text-center px-6 py-20">
                    <motion.h2
                        initial={{ opacity: 0, y: -50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1 }}
                        className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-blue-700 bg-clip-text text-transparent"
                    >
                        Discover. Match. Contribute.
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="text-lg md:text-xl text-purple-200 mb-8 max-w-2xl mx-auto"
                    >
                        Join the open-source revolution and get matched with projects that suit your skills.
                    </motion.p>

                    <div className="flex flex-col md:flex-row justify-center gap-4 mt-6">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="bg-gradient-to-r from-purple-600 to-blue-800 px-6 py-3 rounded-xl text-white font-semibold transition shadow-lg"
                        >
                            <Link to="/github-signup">Get Started</Link>
                        </motion.button>
                    </div>
                </main>

                {/* Features Section */}
                <section className="py-20 px-6 bg-gradient-to-b from-gray-950 to-black">
                    <h3 className="text-3xl font-bold text-center mb-12 bg-gradient-to-r from-purple-500 to-blue-700 bg-clip-text text-transparent">
                        Platform Highlights
                    </h3>
                    <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                        {[
                            { icon: <FaGithub />, title: "GitHub Sync", text: "Seamlessly sync your contributions." },
                            { icon: <FaRocket />, title: "Smart Matching", text: "AI-powered recommendations." },
                            { icon: <FaUsers />, title: "Community Focus", text: "Connect with maintainers." },
                            { icon: <FaCodeBranch />, title: "Track Contributions", text: "Monitor your PRs and commits." },
                            { icon: <FaLock />, title: "Secure Login", text: "OAuth2 GitHub Authentication." },
                            { icon: <FaChartLine />, title: "Growth Analytics", text: "Visualize your open-source journey." }
                        ].map((card, idx) => (
                            <motion.div
                                key={idx}
                                whileHover={{ scale: 1.05 }}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: idx * 0.1 }}
                                className="bg-gradient-to-b from-black to-gray-900 p-6 rounded-2xl shadow-lg border border-purple-800 text-center"
                            >
                                <div className="text-3xl text-purple-400 mb-4">{card.icon}</div>
                                <h4 className="text-xl font-semibold mb-2 text-purple-100">{card.title}</h4>
                                <p className="text-purple-300">{card.text}</p>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* Contact Section */}
                <section className="py-20 px-6 bg-gradient-to-b from-black to-gray-950">
                    <h3 className="text-3xl font-bold text-center mb-6 bg-gradient-to-r from-purple-500 to-blue-700 bg-clip-text text-transparent">
                        Connect With Us
                    </h3>
                    <motion.form
                        ref={form}
                        onSubmit={sendEmail}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1 }}
                        className="max-w-xl mx-auto space-y-4"
                    >
                        <input
                            type="text"
                            name="user_name"
                            placeholder="Name"
                            required
                            className="w-full px-4 py-3 rounded-lg bg-black bg-opacity-70 border border-purple-800 text-white placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-700"
                        />
                        <input
                            type="email"
                            name="user_email"
                            placeholder="Email"
                            required
                            className="w-full px-4 py-3 rounded-lg bg-black bg-opacity-70 border border-purple-800 text-white placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-700"
                        />
                        <textarea
                            name="message"
                            rows="5"
                            placeholder="Message"
                            required
                            className="w-full px-4 py-3 rounded-lg bg-black bg-opacity-70 border border-purple-800 text-white placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-700"
                        ></textarea>
                        <button
                            type="submit"
                            className="w-full py-3 bg-gradient-to-r from-purple-500 to-blue-900 text-white rounded-xl font-semibold hover:opacity-90 transition"
                        >
                            Send
                        </button>
                        {isSent && (
                            <p className="text-green-400 text-center mt-4">
                                Your message has been sent!
                            </p>
                        )}
                    </motion.form>
                </section>
            </div>
        </div>
    );
}
