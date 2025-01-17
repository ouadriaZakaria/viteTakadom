import React from "react";
import { motion } from "framer-motion";

const Hero = () => {
  return (
    <div className="bg-gradient-to-r from-blue-500 to-purple-600 py-20">
      <div className="container mx-auto text-center">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl md:text-6xl font-bold text-white mb-4"
        >
          Welcome to E-Learning
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-lg md:text-xl text-gray-200 mb-8"
        >
          Learn anything, anytime, anywhere.
        </motion.p>
        <motion.a
          href="/courses"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="inline-block bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
        >
          Explore Courses
        </motion.a>
      </div>
    </div>
  );
};

export default Hero;