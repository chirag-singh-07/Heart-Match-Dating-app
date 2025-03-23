import { motion } from "framer-motion";
import { Lock, ShieldCheck, Eye, UserCheck } from "lucide-react";

const PrivacyPolicyPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50 to-rose-100 text-rose-900 px-6 md:px-12 py-16">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center max-w-3xl mx-auto"
      >
        <div className="flex items-center justify-center space-x-2">
          <Lock className="h-10 w-10 text-rose-500" />
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            Privacy & Security
          </h1>
        </div>
        <p className="mt-4 text-lg md:text-xl text-gray-700">
          Your data, your love story. We ensure security & trust at every step.
          💖
        </p>
      </motion.div>

      {/* Grid Sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-6xl mx-auto mt-12">
        {/* Section 1: Data Security */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-white p-8 rounded-2xl shadow-xl flex flex-col items-center text-center"
        >
          <ShieldCheck className="h-12 w-12 text-rose-500 mb-4" />
          <h2 className="text-2xl font-semibold">Data Protection</h2>
          <p className="mt-3 text-gray-600">
            End-to-end encryption keeps your chats & personal details safe.
          </p>
          <img
            src="https://images.pexels.com/photos/3183197/pexels-photo-3183197.jpeg"
            alt="Secure Data"
            className="mt-4 rounded-xl w-full object-cover"
          />
        </motion.div>

        {/* Section 2: Verified Profiles */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-white p-8 rounded-2xl shadow-xl flex flex-col items-center text-center"
        >
          <UserCheck className="h-12 w-12 text-rose-500 mb-4" />
          <h2 className="text-2xl font-semibold">Verified Profiles</h2>
          <p className="mt-3 text-gray-600">
            All profiles go through verification to ensure real connections.
          </p>
          <img
            src="https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg"
            alt="Verified Users"
            className="mt-4 rounded-xl w-full object-cover"
          />
        </motion.div>

        {/* Section 3: Privacy First */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="bg-white p-8 rounded-2xl shadow-xl flex flex-col items-center text-center"
        >
          <Eye className="h-12 w-12 text-rose-500 mb-4" />
          <h2 className="text-2xl font-semibold">Privacy First</h2>
          <p className="mt-3 text-gray-600">
            No ads, no tracking. We do not share your data with third parties.
          </p>
          <img
            src="https://cdn.pixabay.com/photo/2016/03/04/10/13/note-1235695_1280.jpg"
            alt="Privacy Protection"
            className="mt-4 rounded-xl w-full object-cover"
          />
        </motion.div>

        {/* Section 4: Control Over Data */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="bg-white p-8 rounded-2xl shadow-xl flex flex-col items-center text-center"
        >
          <Lock className="h-12 w-12 text-rose-500 mb-4" />
          <h2 className="text-2xl font-semibold">You Control Your Data</h2>
          <p className="mt-3 text-gray-600">
            Download, edit, or delete your data anytime. You’re in charge.
          </p>
          <img
            src="https://media.istockphoto.com/id/1465316262/photo/businessman-inspecting-paperwork-document-of-business-data-analysis-working-management-report.jpg?s=2048x2048&w=is&k=20&c=VEvCMPYmhlUWj_9h3-UfiUvGe1fNsooxgmZXLJ7WYwY="
            alt="Control Data"
            className="mt-4 rounded-xl w-full object-cover"
          />
        </motion.div>
      </div>

      {/* Agreement Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.8 }}
        className="mt-16 bg-white p-8 rounded-2xl shadow-xl text-center max-w-3xl mx-auto"
      >
        <p className="text-gray-600 text-lg">
          By using <span className="text-rose-600 font-bold">HeartMatch</span>,
          you agree to our Privacy Policy.
        </p>
        <button className="mt-4 px-6 py-3 bg-rose-500 text-white rounded-lg shadow-lg text-lg font-medium hover:bg-rose-600 transition duration-300">
          I Agree ❤️
        </button>
      </motion.div>

      {/* Footer */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1 }}
        className="mt-12 text-center text-gray-600 text-sm"
      >
        <p>
          Need help? Contact us at{" "}
          <span className="text-rose-600 font-semibold">
            support@heartmatch.com
          </span>
        </p>
      </motion.div>
    </div>
  );
};

export default PrivacyPolicyPage;
