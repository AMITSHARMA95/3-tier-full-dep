import { motion } from "framer-motion";

export default function AdminPage() {
  const messages = [
    { id: 1, name: "Rahul", email: "rahul@gmail.com", message: "Hello Amit!" },
    { id: 2, name: "Priya", email: "priya@gmail.com", message: "Nice Website!" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <motion.h2
        className="text-3xl font-bold mb-6 text-center"
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        Admin Panel - Messages
      </motion.h2>

      <div className="bg-white shadow-md rounded-xl overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-3">ID</th>
              <th className="p-3">Name</th>
              <th className="p-3">Email</th>
              <th className="p-3">Message</th>
            </tr>
          </thead>
          <tbody>
            {messages.map((msg, i) => (
              <motion.tr
                key={msg.id}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.3 }}
                className="border-b hover:bg-gray-50"
              >
                <td className="p-3">{msg.id}</td>
                <td className="p-3">{msg.name}</td>
                <td className="p-3">{msg.email}</td>
                <td className="p-3">{msg.message}</td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

