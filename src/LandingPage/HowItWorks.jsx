import { FiUserCheck, FiUpload, FiMessageSquare, FiShield, FiCheckCircle, FiArrowRight, FiMapPin, FiSearch, FiThumbsUp } from 'react-icons/fi';
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

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

export default function HowItWorks() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative pt-32 pb-24 bg-gradient-to-br from-emerald-600 to-teal-600 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/50 to-gray-900/20"></div>
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="inline-flex items-center px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-sm text-white text-sm font-medium mb-6"
          >
            LAUTECH STUDENT EXCLUSIVE
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight"
          >
            How <span className="text-emerald-200">Ladokart</span> Works
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-xl text-emerald-100 max-w-3xl mx-auto"
          >
            The modern, safe way to buy, sell and trade within campus - designed exclusively for LAUTECH students
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-8 flex flex-col sm:flex-row justify-center gap-4"
          >
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
              <a
                href="/register"
                className="inline-flex items-center justify-center bg-white hover:bg-gray-100 text-emerald-600 font-medium px-6 py-3 rounded-lg transition shadow-lg hover:shadow-xl"
              >
                Get Started Now
                <FiArrowRight className="ml-2" />
              </a>
            </motion.div>
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
              <a
                href="/demo"
                className="inline-flex items-center justify-center bg-transparent border-2 border-white hover:bg-white/10 text-white font-medium px-6 py-3 rounded-lg transition"
              >
                Watch Demo Video
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Steps Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="max-w-4xl mx-auto text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Simple <span className="text-emerald-600">4-Step</span> Process</h2>
            <p className="text-lg text-gray-600">From signup to successful trade in minutes</p>
          </motion.div>

          <div className="max-w-5xl mx-auto space-y-20">
            {/* Step 1 */}
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="flex flex-col lg:flex-row gap-12 items-center"
            >
              <motion.div 
                variants={slideUp}
                className="flex-shrink-0 w-full lg:w-1/3 relative"
              >
                <div className="bg-emerald-50 p-8 rounded-2xl border border-emerald-100 shadow-sm">
                  <FiUserCheck className="w-16 h-16 text-emerald-600 mx-auto" />
                </div>
                <div className="absolute -top-4 -left-4 w-12 h-12 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xl font-bold shadow-lg">
                  1
                </div>
              </motion.div>
              
              <motion.div 
                variants={slideUp}
                transition={{ delay: 0.1 }}
                className="flex-1 text-center lg:text-left"
              >
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Verify Your Student Status</h3>
                <p className="text-gray-600 mb-6">
                  Sign up with your LAUTECH email address (@student.lautech.edu.ng) or matric number. Our verification team confirms each student to maintain a trusted community.
                </p>
                <ul className="space-y-3 max-w-md mx-auto lg:mx-0">
                  {[
                    "Approval typically within 24 hours",
                    "Only visible to verified LAUTECH students",
                    "No personal data shared publicly"
                  ].map((item, i) => (
                    <li key={i} className="flex items-start">
                      <FiCheckCircle className="text-emerald-500 mt-1 mr-3 flex-shrink-0" />
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </motion.div>

            {/* Step 2 */}
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="flex flex-col lg:flex-row gap-12 items-center"
            >
              <motion.div 
                variants={slideUp}
                className="flex-shrink-0 w-full lg:w-1/3 relative lg:order-2"
              >
                <div className="bg-blue-50 p-8 rounded-2xl border border-blue-100 shadow-sm">
                  <FiUpload className="w-16 h-16 text-blue-600 mx-auto" />
                </div>
                <div className="absolute -top-4 -left-4 w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center text-xl font-bold shadow-lg">
                  2
                </div>
              </motion.div>
              
              <motion.div 
                variants={slideUp}
                transition={{ delay: 0.1 }}
                className="flex-1 text-center lg:text-left lg:order-1"
              >
                <h3 className="text-2xl font-bold text-gray-800 mb-4">List or Discover Items</h3>
                <p className="text-gray-600 mb-6">
                  Create detailed listings in under a minute or browse thousands of items from fellow students. Our intelligent search helps you find exactly what you need.
                </p>
                <ul className="space-y-3 max-w-md mx-auto lg:mx-0">
                  {[
                    "Textbooks, gadgets, hostel essentials",
                    "Filter by price, condition & location",
                    "Save favorite listings for later"
                  ].map((item, i) => (
                    <li key={i} className="flex items-start">
                      <FiCheckCircle className="text-blue-500 mt-1 mr-3 flex-shrink-0" />
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </motion.div>

            {/* Step 3 */}
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="flex flex-col lg:flex-row gap-12 items-center"
            >
              <motion.div 
                variants={slideUp}
                className="flex-shrink-0 w-full lg:w-1/3 relative"
              >
                <div className="bg-purple-50 p-8 rounded-2xl border border-purple-100 shadow-sm">
                  <FiMessageSquare className="w-16 h-16 text-purple-600 mx-auto" />
                </div>
                <div className="absolute -top-4 -left-4 w-12 h-12 rounded-full bg-purple-600 text-white flex items-center justify-center text-xl font-bold shadow-lg">
                  3
                </div>
              </motion.div>
              
              <motion.div 
                variants={slideUp}
                transition={{ delay: 0.1 }}
                className="flex-1 text-center lg:text-left"
              >
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Secure In-App Messaging</h3>
                <p className="text-gray-600 mb-6">
                  Communicate directly through our encrypted chat system. Negotiate prices, ask questions, and arrange meetups without sharing personal contact information.
                </p>
                <ul className="space-y-3 max-w-md mx-auto lg:mx-0">
                  {[
                    "Real-time messaging with read receipts",
                    "Chat history always available",
                    "Report suspicious activity instantly"
                  ].map((item, i) => (
                    <li key={i} className="flex items-start">
                      <FiCheckCircle className="text-purple-500 mt-1 mr-3 flex-shrink-0" />
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </motion.div>

            {/* Step 4 */}
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="flex flex-col lg:flex-row gap-12 items-center"
            >
              <motion.div 
                variants={slideUp}
                className="flex-shrink-0 w-full lg:w-1/3 relative lg:order-2"
              >
                <div className="bg-amber-50 p-8 rounded-2xl border border-amber-100 shadow-sm">
                  <FiShield className="w-16 h-16 text-amber-600 mx-auto" />
                </div>
                <div className="absolute -top-4 -left-4 w-12 h-12 rounded-full bg-amber-600 text-white flex items-center justify-center text-xl font-bold shadow-lg">
                  4
                </div>
              </motion.div>
              
              <motion.div 
                variants={slideUp}
                transition={{ delay: 0.1 }}
                className="flex-1 text-center lg:text-left lg:order-1"
              >
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Safe Campus Exchange</h3>
                <p className="text-gray-600 mb-6">
                  Meet at approved campus locations to complete your trade. Our reputation system helps build trust within the LAUTECH community.
                </p>
                <ul className="space-y-3 max-w-md mx-auto lg:mx-0">
                  {[
                    "Recommended high-traffic meetup spots",
                    "Rate your trading partner afterwards",
                    "24/7 support for any issues"
                  ].map((item, i) => (
                    <li key={i} className="flex items-start">
                      <FiCheckCircle className="text-amber-500 mt-1 mr-3 flex-shrink-0" />
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Safety Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="max-w-4xl mx-auto text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Built for <span className="text-emerald-600">Safety</span> & <span className="text-emerald-600">Trust</span></h2>
            <p className="text-lg text-gray-600">Key features that make Ladokart the safest campus marketplace</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                icon: <FiUserCheck className="w-8 h-8 text-emerald-600" />,
                title: "Student Verification",
                desc: "Every user manually verified as a LAUTECH student",
                color: "bg-emerald-50",
                border: "border-emerald-100"
              },
              {
                icon: <FiMapPin className="w-8 h-8 text-blue-600" />,
                title: "Safe Meetup Spots",
                desc: "Pre-approved campus locations for exchanges",
                color: "bg-blue-50",
                border: "border-blue-100"
              },
              {
                icon: <FiSearch className="w-8 h-8 text-purple-600" />,
                title: "Transparent Listings",
                desc: "Detailed item descriptions with clear photos",
                color: "bg-purple-50",
                border: "border-purple-100"
              },
              {
                icon: <FiShield className="w-8 h-8 text-amber-600" />,
                title: "Secure Messaging",
                desc: "Chat without sharing personal contacts",
                color: "bg-amber-50",
                border: "border-amber-100"
              },
              {
                icon: <FiThumbsUp className="w-8 h-8 text-teal-600" />,
                title: "Reputation System",
                desc: "Rate transactions to build community trust",
                color: "bg-teal-50",
                border: "border-teal-100"
              },
              {
                icon: <FiCheckCircle className="w-8 h-8 text-indigo-600" />,
                title: "24/7 Support",
                desc: "Dedicated team to resolve any issues",
                color: "bg-indigo-50",
                border: "border-indigo-100"
              }
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={slideUp}
                transition={{ delay: (i % 3) * 0.1 }}
                className={`${feature.color} p-6 rounded-xl border ${feature.border} hover:shadow-md transition-all`}
              >
                <div className="w-12 h-12 rounded-lg bg-white flex items-center justify-center shadow-sm mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="max-w-4xl mx-auto text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Trusted by <span className="text-emerald-600">Ladokites</span></h2>
            <p className="text-lg text-gray-600">Hear from students who've transformed their campus experience</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                name: "Adeola Johnson",
                dept: "Computer Science",
                rating: 5,
                comment: "Sold my textbooks in hours! Better prices than the bookstore and no middlemen.",
                avatar: "https://randomuser.me/api/portraits/women/44.jpg"
              },
              {
                name: "Chinedu Okoro",
                dept: "Mechanical Engineering",
                rating: 5,
                comment: "Found the exact hostel fridge I needed at half the price of a new one. Lifesaver!",
                avatar: "https://randomuser.me/api/portraits/men/32.jpg"
              },
              {
                name: "Bisi Adekunle",
                dept: "Biochemistry",
                rating: 5,
                comment: "The verification system makes me feel safe meeting other students on campus.",
                avatar: "https://randomuser.me/api/portraits/women/68.jpg"
              }
            ].map((testimonial, i) => (
              <motion.div 
                key={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={slideUp}
                transition={{ delay: i * 0.1 }}
                className="bg-gray-50 p-6 rounded-xl border border-gray-200 hover:shadow-lg transition-all"
              >
                <div className="flex items-center mb-4">
                  <img src={testimonial.avatar} alt={testimonial.name} className="w-12 h-12 rounded-full mr-4" />
                  <div>
                    <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                    <p className="text-sm text-gray-600">{testimonial.dept}</p>
                  </div>
                </div>
                <div className="flex mb-3">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-700">"{testimonial.comment}"</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-emerald-600 to-teal-600 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-bold mb-6"
            >
              Ready to Join LAUTECH's Marketplace?
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-xl mb-8"
            >
              Thousands of Ladokites are already buying and selling smarter
            </motion.p>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="flex flex-col sm:flex-row justify-center gap-4"
            >
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
                <a
                  href="/register"
                  className="inline-flex items-center justify-center bg-white hover:bg-gray-100 text-emerald-600 font-bold px-8 py-4 rounded-lg text-lg transition shadow-lg hover:shadow-xl"
                >
                  Get Started - It's Free
                  <FiArrowRight className="ml-2" />
                </a>
              </motion.div>
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
                <a
                  href="/"
                  className="inline-flex items-center justify-center bg-transparent border-2 border-white hover:bg-white/10 text-white font-bold px-8 py-4 rounded-lg text-lg transition"
                >
                  Back to Homepage
                </a>
              </motion.div>
            </motion.div>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
              className="mt-4 text-sm text-emerald-100"
            >
              No credit card required • Verified LAUTECH students only
            </motion.p>
          </div>
        </div>
      </section>
    </div>
  );
}