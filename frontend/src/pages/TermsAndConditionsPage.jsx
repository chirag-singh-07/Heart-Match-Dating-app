import { motion } from "framer-motion";
import { ShieldAlert, HeartHandshake, Users, FileText } from "lucide-react";

const TermsAndConditionsPage = () => {
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
          <FileText className="h-10 w-10 text-rose-500" />
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            Terms & Conditions
          </h1>
        </div>
        <p className="mt-4 text-lg md:text-xl text-gray-700">
          By using <span className="font-bold text-rose-600">HeartMatch</span>,
          you agree to our fair & respectful dating guidelines.
        </p>
      </motion.div>

      {/* Grid Sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-6xl mx-auto mt-12">
        {/* Section 1: Respectful Community */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-white p-8 rounded-2xl shadow-xl flex flex-col items-center text-center"
        >
          <Users className="h-12 w-12 text-rose-500 mb-4" />
          <h2 className="text-2xl font-semibold">Respectful Community</h2>
          <p className="mt-3 text-gray-600">
            We foster a safe & friendly environment. Disrespectful behavior
            won't be tolerated.
          </p>
          <img
            src="https://images.pexels.com/photos/3184405/pexels-photo-3184405.jpeg"
            alt="Respectful Community"
            className="mt-4 rounded-xl w-full object-cover"
          />
        </motion.div>

        {/* Section 2: No Fake Profiles */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-white p-8 rounded-2xl shadow-xl flex flex-col items-center text-center"
        >
          <ShieldAlert className="h-12 w-12 text-rose-500 mb-4" />
          <h2 className="text-2xl font-semibold">No Fake Profiles</h2>
          <p className="mt-3 text-gray-600">
            Users must provide real information. Fake accounts & catfishing are
            strictly prohibited.
          </p>
          <img
            src="https://cdn.pixabay.com/photo/2022/04/07/11/22/fake-7117315_1280.png"
            alt="No Fake Profiles"
            className="mt-4 rounded-xl w-full object-cover"
          />
        </motion.div>

        {/* Section 3: Safe Dating Tips */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="bg-white p-8 rounded-2xl shadow-xl flex flex-col items-center text-center"
        >
          <HeartHandshake className="h-12 w-12 text-rose-500 mb-4" />
          <h2 className="text-2xl font-semibold">Safe Dating Tips</h2>
          <p className="mt-3 text-gray-600">
            Always meet in public places and never share sensitive information
            with strangers.
          </p>
          <img
            src="https://images.pexels.com/photos/3693370/pexels-photo-3693370.jpeg"
            alt="Safe Dating"
            className="mt-4 rounded-xl w-full object-cover"
          />
        </motion.div>

        {/* Section 4: Privacy Matters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="bg-white p-8 rounded-2xl shadow-xl flex flex-col items-center text-center"
        >
          <FileText className="h-12 w-12 text-rose-500 mb-4" />
          <h2 className="text-2xl font-semibold">Privacy Matters</h2>
          <p className="mt-3 text-gray-600">
            We respect your privacy. Your data is never shared with advertisers
            or third parties.
          </p>
          <img
            src="https://images.pexels.com/photos/3184357/pexels-photo-3184357.jpeg"
            alt="Privacy Protection"
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
          By continuing to use{" "}
          <span className="text-rose-600 font-bold">HeartMatch</span>, you
          accept our Terms & Conditions.
        </p>
        <button className="mt-4 px-6 py-3 bg-rose-500 text-white rounded-lg shadow-lg text-lg font-medium hover:bg-rose-600 transition duration-300">
          I Accept ❤️
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

export default TermsAndConditionsPage;
