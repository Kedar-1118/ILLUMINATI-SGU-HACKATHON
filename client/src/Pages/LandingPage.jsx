import React, { useRef, useState } from "react";
import { FaGithub, FaRocket, FaUsers } from "react-icons/fa";
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
                "service_iwcex8f", // Replace with your EmailJS service ID
                "template_qkt8ldj", // Replace with your EmailJS template ID
                form.current,
                "Tf0tiIa2jbW73zyab" // Replace with your EmailJS public key
            )
            .then(
                (result) => {
                    console.log(result.text);
                    setIsSent(true);
                    form.current.reset();
                },
                (error) => {
                    console.log(error.text);
                    setIsSent(false);
                }
            );
    };

    return (
        <div className="min-h-screen bg-black text-white font-sans relative overflow-hidden">
            {/* Shiny animated background */}
            <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black animate-pulse z-0"></div>
            <div className="absolute top-1/4 left-1/4 w-full h-full bg-gradient-radial from-purple-900 to-transparent opacity-10 rounded-full blur-3xl z-0"></div>

            <div className="relative z-20">
                {/* Hero Section */}
                <main className="text-center px-6 py-20">
                    <motion.h2
                        initial={{ opacity: 0, y: -50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1 }}
                        className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-500 to-blue-900 bg-clip-text text-transparent"
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

                    {/* Buttons */}
                    <div className="flex flex-col md:flex-row justify-center gap-4 mt-6">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="bg-gradient-to-r from-purple-500 to-blue-900 px-6 py-3 rounded-xl text-white font-semibold transition shadow-md"
                        >
                            <Link to="/github-signup">Get Started</Link>
                        </motion.button>
                    </div>
                </main>

                {/* Cards Section */}
                <section className="py-20 px-6">
                    <h3 className="text-3xl font-bold text-center mb-12 bg-gradient-to-r from-purple-500 to-blue-900 bg-clip-text text-transparent">
                        Platform Highlights
                    </h3>
                    <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                        {/* Card 1 */}
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="bg-gradient-to-b from-black to-gray-900 p-6 rounded-2xl shadow-lg border border-purple-800 text-center"
                        >
                            <div className="text-3xl text-purple-400 mb-4">
                                <FaGithub />
                            </div>
                            <h4 className="text-xl font-semibold mb-2 text-purple-100">GitHub Sync</h4>
                            <p className="text-purple-300">Seamlessly sync your contributions.</p>
                        </motion.div>

                        {/* Card 2 */}
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="bg-gradient-to-b from-black to-gray-900 p-6 rounded-2xl shadow-lg border border-purple-800 text-center"
                        >
                            <div className="text-3xl text-purple-400 mb-4">
                                <FaRocket />
                            </div>
                            <h4 className="text-xl font-semibold mb-2 text-purple-100">Smart Matching</h4>
                            <p className="text-purple-300">AI-powered recommendations.</p>
                        </motion.div>

                        {/* Card 3 */}
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            className="bg-gradient-to-b from-black to-gray-900 p-6 rounded-2xl shadow-lg border border-purple-800 text-center"
                        >
                            <div className="text-3xl text-purple-400 mb-4">
                                <FaUsers />
                            </div>
                            <h4 className="text-xl font-semibold mb-2 text-purple-100">Community Focus</h4>
                            <p className="text-purple-300">Connect with maintainers.</p>
                        </motion.div>
                    </div>
                </section>

                {/* Contact Section */}
                <section className="py-20 px-6 bg-gradient-to-b from-gray-950 to-black relative">
                    <h3 className="text-3xl font-bold text-center mb-6 bg-gradient-to-r from-purple-500 to-blue-900 bg-clip-text text-transparent">
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
