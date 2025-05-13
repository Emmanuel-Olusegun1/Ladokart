import { FiUserCheck, FiUpload, FiMessageSquare, FiShield, FiCheckCircle } from 'react-icons/fi';
import { motion } from 'framer-motion';


// Animation variants
const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.8 } }
  };
  
  const slideUp = {
    hidden: { y: 30, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.6 } }
  };

export default function HowItWorks() {
 

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Animated Hero */}
      <motion.section 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="pt-32 pb-24 bg-gradient-to-r from-emerald-500 to-teal-600"
      >
        <div className="container mx-auto px-5 text-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="inline-block px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-sm text-white text-sm font-medium mb-4"
          >
            LAUTECH EXCLUSIVE
          </motion.div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
            How <span className="text-emerald-200">Ladokart</span> Works
          </h1>
          <p className="text-xl text-emerald-100 max-w-2xl mx-auto">
            The modern way to buy, sell and trade within campus - safely and efficiently
          </p>
        </div>
      </motion.section>
  {/* Steps Section */}
  <section className="py-20">
        <div className="container mx-auto px-5">
          <div className="max-w-4xl mx-auto">
            {/* Step 1 */}
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={slideUp}
              className="flex flex-col md:flex-row gap-8 items-center mb-20"
            >
              <div className="flex-shrink-0 w-full md:w-1/3">
                <div className="bg-emerald-100 p-6 rounded-xl flex items-center justify-center">
                  <FiUserCheck className="w-16 h-16 text-emerald-600" />
                </div>
              </div>
              <div className="flex-1">
                <div className="flex items-center mb-4">
                  <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center mr-3 font-bold">1</div>
                  <h2 className="text-2xl font-bold text-gray-800">Verify Your Account</h2>
                </div>
                <p className="text-gray-600 mb-4">
                  Sign up with your LAUTECH email address or matric number. Our team manually verifies each student to ensure a safe community.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <FiCheckCircle className="text-emerald-500 mt-1 mr-2 flex-shrink-0" />
                    <span>Approval typically takes less than 24 hours</span>
                  </li>
                  <li className="flex items-start">
                    <FiCheckCircle className="text-emerald-500 mt-1 mr-2 flex-shrink-0" />
                    <span>Only visible to other LAUTECH students</span>
                  </li>
                </ul>
              </div>
            </motion.div>

            {/* Step 2 */}
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={slideUp}
              transition={{ delay: 0.1 }}
              className="flex flex-col md:flex-row gap-8 items-center mb-20"
            >
              <div className="flex-shrink-0 w-full md:w-1/3 order-1 md:order-2">
                <div className="bg-blue-100 p-6 rounded-xl flex items-center justify-center">
                  <FiUpload className="w-16 h-16 text-blue-600" />
                </div>
              </div>
              <div className="flex-1 order-2 md:order-1">
                <div className="flex items-center mb-4">
                  <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center mr-3 font-bold">2</div>
                  <h2 className="text-2xl font-bold text-gray-800">List or Browse Items</h2>
                </div>
                <p className="text-gray-600 mb-4">
                  Create listings in under a minute or browse items from other students. Our categories make it easy to find what you need.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <FiCheckCircle className="text-blue-500 mt-1 mr-2 flex-shrink-0" />
                    <span>Clear photos and detailed descriptions</span>
                  </li>
                  <li className="flex items-start">
                    <FiCheckCircle className="text-blue-500 mt-1 mr-2 flex-shrink-0" />
                    <span>Filter by price, condition, and location</span>
                  </li>
                </ul>
              </div>
            </motion.div>

            {/* Step 3 */}
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={slideUp}
              transition={{ delay: 0.2 }}
              className="flex flex-col md:flex-row gap-8 items-center mb-20"
            >
              <div className="flex-shrink-0 w-full md:w-1/3">
                <div className="bg-purple-100 p-6 rounded-xl flex items-center justify-center">
                  <FiMessageSquare className="w-16 h-16 text-purple-600" />
                </div>
              </div>
              <div className="flex-1">
                <div className="flex items-center mb-4">
                  <div className="w-8 h-8 rounded-full bg-purple-600 text-white flex items-center justify-center mr-3 font-bold">3</div>
                  <h2 className="text-2xl font-bold text-gray-800">Connect & Chat</h2>
                </div>
                <p className="text-gray-600 mb-4">
                  Message sellers or buyers directly through our secure in-app chat. No need to share personal contact information.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <FiCheckCircle className="text-purple-500 mt-1 mr-2 flex-shrink-0" />
                    <span>Real-time messaging with read receipts</span>
                  </li>
                  <li className="flex items-start">
                    <FiCheckCircle className="text-purple-500 mt-1 mr-2 flex-shrink-0" />
                    <span>Chat history saved for reference</span>
                  </li>
                </ul>
              </div>
            </motion.div>

            {/* Step 4 */}
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={slideUp}
              transition={{ delay: 0.3 }}
              className="flex flex-col md:flex-row gap-8 items-center"
            >
              <div className="flex-shrink-0 w-full md:w-1/3 order-1 md:order-2">
                <div className="bg-amber-100 p-6 rounded-xl flex items-center justify-center">
                  <FiShield className="w-16 h-16 text-amber-600" />
                </div>
              </div>
              <div className="flex-1 order-2 md:order-1">
                <div className="flex items-center mb-4">
                  <div className="w-8 h-8 rounded-full bg-amber-600 text-white flex items-center justify-center mr-3 font-bold">4</div>
                  <h2 className="text-2xl font-bold text-gray-800">Safe Meetup</h2>
                </div>
                <p className="text-gray-600 mb-4">
                  Arrange to meet at approved campus locations. We recommend high-traffic areas during daylight hours.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <FiCheckCircle className="text-amber-500 mt-1 mr-2 flex-shrink-0" />
                    <span>Library, Faculty buildings, or Cafeteria</span>
                  </li>
                  <li className="flex items-start">
                    <FiCheckCircle className="text-amber-500 mt-1 mr-2 flex-shrink-0" />
                    <span>Rate your trading partner after completion</span>
                  </li>
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Safety Tips Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-5">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="max-w-4xl mx-auto text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Safety First</h2>
            <p className="text-xl text-gray-600">Recommended practices for safe trading</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                icon: <FiShield className="w-8 h-8 text-emerald-600" />,
                title: "Meet in Public",
                desc: "Always choose high-traffic campus locations"
              },
              {
                icon: <FiCheckCircle className="w-8 h-8 text-blue-600" />,
                title: "Inspect Items",
                desc: "Check electronics/textbooks before payment"
              },
              {
                icon: <FiUserCheck className="w-8 h-8 text-purple-600" />,
                title: "Verify Profiles",
                desc: "Check user ratings and verification status"
              }
            ].map((tip, i) => (
              <motion.div
                key={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={slideUp}
                transition={{ delay: i * 0.1 }}
                className="bg-gray-50 p-8 rounded-xl border border-gray-200 hover:border-emerald-300 transition"
              >
                <div className="w-12 h-12 rounded-lg bg-white flex items-center justify-center shadow-sm mb-4 mx-auto">
                  {tip.icon}
                </div>
                <h3 className="text-xl font-semibold text-center text-gray-800 mb-2">{tip.title}</h3>
                <p className="text-gray-600 text-center">{tip.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-emerald-600 to-teal-600 text-white">
        <div className="container mx-auto px-5 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <h2 className="text-3xl font-bold mb-6">Ready to Get Started?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Join LAUTECH's trusted student marketplace today
            </p>
            <motion.div 
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="flex flex-col md:flex-row justify-center gap-4"
            >
              <a
                href="/register"
                className="bg-white hover:bg-gray-100 text-emerald-600 font-bold px-8 py-4 rounded-lg text-lg transition shadow-lg hover:shadow-xl"
              >
                Sign Up Now - It's Free
              </a>

              <a
                href="/"
                className="bg-white hover:bg-gray-100 text-emerald-600 font-bold px-8 py-4 rounded-lg text-lg transition shadow-lg hover:shadow-xl"
              >
                Go Back To Mainpage
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}