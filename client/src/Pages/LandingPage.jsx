import React from "react";
import Navbar from "../components/Navbar";

export default function LandingPage() {
    return (
        <div className="min-h-screen bg-black text-white font-sans pl-12 relative overflow-hidden">
            {/* Creating a shiny black gradient background effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black z-0"></div>
            <div className="absolute inset-0 bg-black opacity-70 z-0"></div>
            
            {/* Subtle radial gradient for shine effect */}
            <div className="absolute top-1/4 left-1/4 w-full h-full bg-gradient-to-br from-gray-800 to-transparent opacity-5 rounded-full blur-3xl z-0"></div>
            
            {/* Content container with relative positioning to appear above the gradient overlay */}
            <div className="relative z-10">
                {/* Keeping navbar unchanged as requested */}
                <Navbar />

                {/* Hero section with logo/brand element */}
                <div className="flex items-center justify-center pt-8 pb-2 ml-4">
                    {/* <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-900 rounded-md mr-2"></div> */}
                    {/* <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-500 to-blue-900 bg-clip-text text-transparent">RepoMatch</h1> */}
                </div>

                <main className="text-center px-6 py-20 ml-4">
                    <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-500 to-blue-900 bg-clip-text text-transparent">Connecting Developers to Open Source Opportunities</h2>
                    <p className="text-lg md:text-xl text-purple-200 mb-8 max-w-2xl mx-auto">
                        RepoMatch is an open-source platform that helps contributors discover and get matched with GitHub repositories based on skills, interests, and contribution history.
                    </p>
                    <button className="bg-gradient-to-r from-purple-500 to-blue-900 px-6 py-3 rounded-xl text-white font-semibold transition hover:opacity-90">Explore Matches</button>
                </main>

                <section id="features" className="px-6 py-20 ml-4 relative">
                    {/* Subtle shine effect for this section */}
                    <div className="absolute inset-0 bg-gradient-to-r from-gray-900 to-black opacity-80 z-0"></div>
                    
                    <div className="relative z-10">
                        <h3 className="text-3xl font-bold text-center mb-12 bg-gradient-to-r from-purple-500 to-blue-900 bg-clip-text text-transparent">Features</h3>
                        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                            <div className="bg-gradient-to-b from-black to-gray-900 p-6 rounded-xl shadow-lg border border-transparent bg-gradient-to-r from-purple-500 to-blue-900 bg-clip-padding">
                                <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-900 rounded-md mb-4"></div>
                                <h4 className="text-xl font-semibold mb-2">Smart Repo Matching</h4>
                                <p className="text-purple-200">Match developers with GitHub repositories using tags, topics, and commit patterns.</p>
                            </div>
                            <div className="bg-gradient-to-b from-black to-gray-900 p-6 rounded-xl shadow-lg border border-transparent bg-gradient-to-r from-purple-500 to-blue-900 bg-clip-padding">
                                <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-900 rounded-md mb-4"></div>
                                <h4 className="text-xl font-semibold mb-2">Contributor Profiles</h4>
                                <p className="text-purple-200">Build a profile with skills, tech stack, and preferred contribution areas.</p>
                            </div>
                            <div className="bg-gradient-to-b from-black to-gray-900 p-6 rounded-xl shadow-lg border border-transparent bg-gradient-to-r from-purple-500 to-blue-900 bg-clip-padding">
                                <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-900 rounded-md mb-4"></div>
                                <h4 className="text-xl font-semibold mb-2">Project Insights</h4>
                                <p className="text-purple-200">Get details like activity level, open issues, labels, and onboarding difficulty.</p>
                            </div>
                        </div>
                    </div>
                </section>

                <section id="how-it-works" className="px-6 py-20 bg-gradient-to-b from-black to-gray-950 ml-4 relative">
                    <div className="absolute inset-0 bg-black opacity-70 z-0"></div>
                    
                    <div className="relative z-10">
                        <h3 className="text-3xl font-bold text-center mb-12 bg-gradient-to-r from-purple-500 to-blue-900 bg-clip-text text-transparent">How It Works</h3>
                        <div className="max-w-4xl mx-auto space-y-6 text-purple-200">
                            <div className="flex items-center">
                                <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-900 rounded-md mr-4 flex items-center justify-center font-bold">1</div>
                                <p>Sign in with GitHub and import your public contributions.</p>
                            </div>
                            <div className="flex items-center">
                                <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-900 rounded-md mr-4 flex items-center justify-center font-bold">2</div>
                                <p>Customize your interests, tech stack, and preferred project types.</p>
                            </div>
                            <div className="flex items-center">
                                <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-900 rounded-md mr-4 flex items-center justify-center font-bold">3</div>
                                <p>Get matched with repositories aligned with your profile.</p>
                            </div>
                            <div className="flex items-center">
                                <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-900 rounded-md mr-4 flex items-center justify-center font-bold">4</div>
                                <p>Explore projects, filter by onboarding ease, and start contributing.</p>
                            </div>
                        </div>
                    </div>
                </section>

                <section id="team" className="px-6 py-20 bg-gradient-to-b from-gray-950 to-black ml-4 relative">
                    {/* Light beam effect */}
                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-64 h-32 bg-purple-900 opacity-10 blur-3xl rounded-full z-0"></div>
                    
                    <div className="relative z-10">
                        <h3 className="text-3xl font-bold text-center mb-12 bg-gradient-to-r from-purple-500 to-blue-900 bg-clip-text text-transparent">Meet the Team</h3>
                        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto text-center">
                            <div>
                                <div className="w-24 h-24 mx-auto bg-gradient-to-r from-purple-500 to-blue-900 rounded-full mb-4 p-1">
                                    <div className="w-full h-full bg-black rounded-full"></div>
                                </div>
                                <h4 className="font-semibold text-purple-100">Alex - Dev Lead</h4>
                                <p className="text-purple-300">Designs the matching algorithm and GitHub API integration.</p>
                            </div>
                            <div>
                                <div className="w-24 h-24 mx-auto bg-gradient-to-r from-purple-500 to-blue-900 rounded-full mb-4 p-1">
                                    <div className="w-full h-full bg-black rounded-full"></div>
                                </div>
                                <h4 className="font-semibold text-purple-100">Sam - UX Designer</h4>
                                <p className="text-purple-300">Crafts accessible, contributor-friendly experiences.</p>
                            </div>
                            <div>
                                <div className="w-24 h-24 mx-auto bg-gradient-to-r from-purple-500 to-blue-900 rounded-full mb-4 p-1">
                                    <div className="w-full h-full bg-black rounded-full"></div>
                                </div>
                                <h4 className="font-semibold text-purple-100">Jordan - Community Manager</h4>
                                <p className="text-purple-300">Connects developers and maintainers, grows the open-source ecosystem.</p>
                            </div>
                        </div>
                    </div>
                </section>

                <section id="contact" className="px-6 py-20 bg-black ml-4 relative">
                    {/* Subtle shine effect */}
                    <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-gray-900 to-transparent opacity-10 rounded-full blur-3xl z-0"></div>
                    
                    <div className="relative z-10">
                        <h3 className="text-3xl font-bold text-center mb-6 bg-gradient-to-r from-purple-500 to-blue-900 bg-clip-text text-transparent">Get In Touch</h3>
                        <form className="max-w-xl mx-auto space-y-4">
                            <div className="bg-gradient-to-r from-purple-500 to-blue-900 p-0.5 rounded">
                                <input className="w-full px-4 py-2 rounded bg-gradient-to-b from-black to-gray-950 text-white" type="text" placeholder="Your Name" />
                            </div>
                            <div className="bg-gradient-to-r from-purple-500 to-blue-900 p-0.5 rounded">
                                <input className="w-full px-4 py-2 rounded bg-gradient-to-b from-black to-gray-950 text-white" type="email" placeholder="Your Email" />
                            </div>
                            <div className="bg-gradient-to-r from-purple-500 to-blue-900 p-0.5 rounded">
                                <textarea className="w-full px-4 py-2 rounded bg-gradient-to-b from-black to-gray-950 text-white" rows="5" placeholder="Your Message"></textarea>
                            </div>
                            <button className="bg-gradient-to-r from-purple-500 to-blue-900 px-6 py-3 rounded-xl text-white font-semibold transition hover:opacity-90 w-full">Send Message</button>
                        </form>
                    </div>
                </section>

                <footer className="text-center p-6 border-t border-transparent bg-gradient-to-r from-purple-500 to-blue-900 bg-clip-padding text-purple-100 bg-black ml-4">
                    <div className="flex justify-center items-center space-x-2">
                        <div className="w-6 h-6 bg-gradient-to-r from-purple-500 to-blue-900 rounded-md"></div>
                        <p>&copy; {new Date().getFullYear()} RepoMatch. Built with ❤ by open-source contributors.</p>
                    </div>
                </footer>
            </div>
        </div>
    );
}