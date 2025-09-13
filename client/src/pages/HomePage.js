import { motion } from "framer-motion";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-100 to-teal-100">
      <motion.h1
        className="text-5xl font-bold text-gray-900"
        initial={{ opacity: 0, y: -60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        Amit Sharma
      </motion.h1>

      <motion.p
        className="text-lg text-gray-600 mt-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
      >
        DevOps Engineer
      </motion.p>

      <motion.a
        href="https://linkedin.com/in/amit-sharma-a11837243"
        target="_blank"
        rel="noreferrer"
        className="mt-8 bg-blue-600 text-white px-6 py-2 rounded-full shadow-lg hover:bg-blue-700 transition"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        Connect on LinkedIn
      </motion.a>
    </div>
  );
}

