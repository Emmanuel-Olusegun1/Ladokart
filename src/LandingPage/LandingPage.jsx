import { Link } from 'react-router-dom';
import { FiChevronRight, FiCheckCircle, FiShield, FiMessageSquare, FiAward } from 'react-icons/fi';
import { motion } from 'framer-motion';

// Animation variants
const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.8 } }
};

const slideUp = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.6 } }
};

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white font-sans antialiased">
      {/* Glass Navbar */}
      <nav className="fixed w-full bg-white/80 backdrop-blur-md z-50 border-b border-gray-100">
        <div className="container mx-auto px-5 py-3 flex justify-between items-center">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex items-center space-x-2"
          >
            <div className="w-9 h-9 rounded-lg bg-gradient-to-r from-emerald-500 to-teal-500 flex items-center justify-center text-white font-bold shadow-sm">LK</div>
            <span className="text-lg font-semibold text-emerald-600">Ladokart</span>
          </motion.div>
          
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/how-it-works" className="text-gray-600 hover:text-emerald-600 text-sm font-medium transition">How it works</Link>
            <Link to="/login" className="text-gray-600 hover:text-emerald-600 text-sm font-medium transition">Sign In</Link>
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
              <Link to="/register" className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white text-sm font-medium px-4 py-2 rounded-lg transition shadow-sm hover:shadow-md">
                Join Now
              </Link>
            </motion.div>
          </div>
        </div>
      </nav>

      {/* Hero Section with Background Image */}
      <motion.section 
        initial="hidden"
        animate="visible"
        className="relative pt-28 pb-20 md:pt-36 md:pb-28 overflow-hidden"
      >
        {/* Background Image with Gradient Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://res.cloudinary.com/dzibfknxq/image/upload/v1747103753/abstract-store-with-futuristic-concept-architecture_23-2150861984.jpg_eytuir.jpg" // Replace with your campus image
            alt="LAUTECH Campus"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/50 to-gray-900/20"></div>
        </div>
        
        <div className="container mx-auto px-5 relative z-10">
          <motion.div 
            variants={fadeIn}
            className="max-w-2xl mx-auto text-center"
          >
            <motion.div 
              variants={slideUp}
              className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800 mb-4"
            >
              EXCLUSIVE FOR LADOKITES • BETA ACCESS
            </motion.div>
            
            <motion.h1 
              variants={slideUp}
              transition={{ delay: 0.2 }}
              className="text-4xl md:text-5xl font-bold text-white mb-5 leading-tight"
            >
              Trade Smarter <span className="bg-gradient-to-r  to-teal-300 bg-clip-text text-gray-200 rounded-lg pr-2">Within Campus</span>
            </motion.h1>
            
            <motion.p 
              variants={slideUp}
              transition={{ delay: 0.3 }}
              className="text-lg text-gray-300 mb-8 max-w-xl mx-auto"
            >
              LAUTECH's first dedicated marketplace for students. Buy, sell, and exchange items with verified peers.
            </motion.p>
            
            <motion.div 
              variants={slideUp}
              transition={{ delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-3 justify-center"
            >
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
                <Link
                  to="/register"
                  className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-medium px-6 py-3 rounded-lg transition shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
                >
                  <span>Get Early Access</span>
                  <FiChevronRight className="w-4 h-4" />
                </Link>
              </motion.div>
              
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
                <Link
                  to="/browse"
                  className="bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 text-white font-medium px-6 py-3 rounded-lg transition flex items-center justify-center space-x-2"
                >
                  <span>See How It Works</span>
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
        </motion.section>
      

      {/* Features Section - Modern Cards */}
      <section className="relative pt-32 pb-20 bg-white">
        <div className="container mx-auto px-5">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="max-w-3xl mx-auto text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Designed for <span className="bg-gradient-to-r  to-teal-300 bg-clip-text text-gray-500 rounded-lg pr-2">Ladokites</span></h2>
            <p className="text-lg text-gray-600">Everything you need for safe campus trading</p>
          </motion.div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                icon: <FiCheckCircle className="w-6 h-6 text-emerald-500" />,
                title: "Verified Peers Only",
                desc: "Every user is manually verified as a LAUTECH student",
                color: "bg-emerald-50"
              },
              {
                icon: <FiShield className="w-6 h-6 text-emerald-500" />,
                title: "Safe Meetup Spots",
                desc: "Pre-approved campus locations for exchanges",
                color: "bg-emerald-50"
              },
              {
                icon: <FiMessageSquare className="w-6 h-6 text-emerald-500" />,
                title: "In-App Messaging",
                desc: "Chat without sharing personal contacts",
                color: "bg-emerald-50"
              }
            ].map((feature, i) => (
              <motion.div 
                key={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={slideUp}
                transition={{ delay: i * 0.1 }}
                className={`${feature.color} p-6 rounded-xl border border-gray-200 hover:border-emerald-300 transition-all hover:shadow-lg`}
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

      {/* How It Works - Modern Timeline */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-5">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="max-w-3xl mx-auto text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-500 mb-4">Simple as 1-2-3</h2>
            <p className="text-lg text-gray-600">Start trading in minutes</p>
          </motion.div>
          
          <div className="max-w-4xl mx-auto">
            {[
              {
                step: "1",
                title: "Join with LAUTECH Email",
                desc: "Verify your student status in 2 minutes"
              },
              {
                step: "2",
                title: "List or Browse Items",
                desc: "Textbooks, gadgets, hostel essentials"
              },
              {
                step: "3",
                title: "Meet & Exchange",
                desc: "At safe campus locations"
              }
            ].map((step, i) => (
              <motion.div 
                key={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={slideUp}
                transition={{ delay: i * 0.15 }}
                className="flex flex-col md:flex-row items-start mb-10 last:mb-0"
              >
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-bold text-lg mb-4 md:mb-0 md:mr-6">
                  {step.step}
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">{step.title}</h3>
                  <p className="text-gray-600">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA - Modern Gradient */}
      <section className="py-20 bg-gradient-to-br from-gray-900 to-emerald-900 text-white">
        <div className="container mx-auto px-5 text-center">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="max-w-2xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Trade Like a Pro?</h2>
            <p className="text-xl text-gray-300 mb-8">
              Join the first 200 Ladokites and get early-adopter benefits
            </p>
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
              <Link
                to="/register"
                className="inline-block bg-white hover:bg-gray-100 text-emerald-600 font-medium px-8 py-3 rounded-lg text-lg transition shadow-lg hover:shadow-xl"
              >
                Claim Your Spot Now
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Footer - Modern Minimal */}
      <footer className="py-12 bg-white border-t border-gray-100">
        <div className="container mx-auto px-5">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-6 md:mb-0">
              <div className="w-8 h-8 rounded-md bg-gradient-to-r from-emerald-500 to-teal-500 flex items-center justify-center text-white font-bold text-sm">LK</div>
              <span className="text-lg font-semibold text-gray-800">Ladokart</span>
            </div>
            <div className="flex flex-wrap justify-center gap-6">
              <Link to="/privacy" className="text-sm text-gray-600 hover:text-emerald-600 transition">Privacy</Link>
              <Link to="/terms" className="text-sm text-gray-600 hover:text-emerald-600 transition">Terms</Link>
              <Link to="/contact" className="text-sm text-gray-600 hover:text-emerald-600 transition">Contact</Link>
              <Link to="/blog" className="text-sm text-gray-600 hover:text-emerald-600 transition">Blog</Link>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-100 text-center md:text-left">
            <p className="text-sm text-gray-500">© {new Date().getFullYear()} Ladokart. Exclusive for LAUTECH students.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}