import React, { useRef, useState } from "react";
import Navbar from "../components/Navbar";
import { FaGithub, FaRocket, FaUsers } from "react-icons/fa";
import { motion } from "framer-motion";
import emailjs from '@emailjs/browser';

export default function LandingPage() {
    const form = useRef();
    const [isSent, setIsSent] = useState(false);

    const sendEmail = (e) => {
        e.preventDefault();

        emailjs.sendForm(
            'service_iwcex8f',       // Replace with your EmailJS service ID
            'template_qkt8ldj',      // Replace with your EmailJS template ID
            form.current,
            'Tf0tiIa2jbW73zyab'        // Replace with your EmailJS public key
        ).then(
            (result) => {
                console.log(result.text);
                setIsSent(true);
                form.current.reset();
            },
            (error) => {
                console.log(error.text);
            }
        );
    };

  
