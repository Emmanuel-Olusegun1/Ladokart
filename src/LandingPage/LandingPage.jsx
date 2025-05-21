import { Link } from 'react-router-dom';
import { FiChevronRight, FiCheckCircle, FiShield, FiMessageSquare, FiAward, FiShoppingCart, FiBook, FiUsers } from 'react-icons/fi';
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

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

export default function LandingPage() {
  return (
    <div className="min-h-screen font-sans antialiased bg-white">
      {/* Glass Navbar */}
      <nav className="fixed w-full bg-white/80 backdrop-blur-md z-50 shadow-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-3 flex justify-between items-center">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex items-center space-x-2"
          >
            <div className="w-9 h-9 rounded-lg bg-gradient-to-r from-emerald-500 to-teal-500 flex items-center justify-center text-white font-bold shadow-sm">LK</div>
            <span className="text-lg font-semibold text-gray-900">Ladokart</span>
          </motion.div>
          
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/how-it-works" className="text-gray-600 hover:text-emerald-600 text-base font-medium transition">How it works</Link>
            <Link to="/login" className="text-gray-600 hover:text-emerald-600 text-base font-medium transition">Sign In</Link>
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
              <Link to="/register" className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white text-base font-medium px-5 py-2 rounded-lg transition shadow-sm hover:shadow-md">
                Join Now
              </Link>
            </motion.div>
          </div>

          {/* Mobile menu button */}
          <button className="md:hidden text-gray-600 focus:outline-none">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-28 pb-20 md:pt-36 md:pb-28 overflow-hidden bg-gradient-to-br from-gray-900 to-emerald-900">
        <div className="absolute inset-0 z-0 opacity-20">
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/50 to-gray-900/20"></div>
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row items-center">
            <motion.div 
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              className="lg:w-1/2 mb-12 lg:mb-0 lg:pr-10"
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
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-5 leading-tight"
              >
                Campus Commerce <span className="text-emerald-300">Made Simple</span>
              </motion.h1>
              
              <motion.p 
                variants={slideUp}
                transition={{ delay: 0.3 }}
                className="text-lg text-gray-300 mb-8"
              >
                LAUTECH's premier marketplace connecting students to buy, sell, and trade securely within campus.
              </motion.p>
              
              <motion.div 
                variants={slideUp}
                transition={{ delay: 0.4 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
                  <Link
                    to="/register"
                    className="bg-emerald-500 hover:bg-emerald-600 text-white font-medium px-6 py-3 rounded-lg transition flex items-center justify-center space-x-2 shadow-lg"
                  >
                    <span>Get Started - It's Free</span>
                    <FiChevronRight className="w-4 h-4" />
                  </Link>
                </motion.div>
                <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
                  <Link
                    to="/how-it-works"
                    className="bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 text-white font-medium px-6 py-3 rounded-lg transition flex items-center justify-center space-x-2"
                  >
                    <span>How It Works</span>
                  </Link>
                </motion.div>
              </motion.div>

              <motion.div 
                variants={slideUp}
                transition={{ delay: 0.5 }}
                className="mt-8 flex items-center space-x-4 text-sm text-gray-300"
              >
                <div className="flex -space-x-2">
                  {[1, 2, 3].map((item) => (
                    <img 
                      key={item}
                      src={`https://randomuser.me/api/portraits/${item % 2 === 0 ? 'women' : 'men'}/${item}.jpg`}
                      alt="User"
                      className="w-8 h-8 rounded-full border-2 border-emerald-500"
                    />
                  ))}
                </div>
                <div>
                  <p>Trusted by 500+ Ladokites</p>
                  <div className="flex items-center">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg key={star} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                    <span className="ml-1">5.0 (200+ reviews)</span>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="lg:w-1/2 relative"
            >
              <div className="relative bg-white rounded-xl shadow-2xl overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-emerald-500 to-teal-500"></div>
                <div className="p-4">
                  <div className="flex items-center space-x-2 mb-4">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                  <div className="bg-gray-50 rounded-lg overflow-hidden">
                    <img 
                      src="https://res.cloudinary.com/dzibfknxq/image/upload/v1747103753/abstract-store-with-futuristic-concept-architecture_23-2150861984.jpg_eytuir.jpg"
                      alt="Ladokart Marketplace"
                      className="w-full h-auto object-cover"
                    />
                  </div>
                  <div className="mt-4 p-4">
                    <div className="flex justify-between items-center mb-3">
                      <h3 className="font-semibold text-gray-900">Latest Listings</h3>
                      <span className="text-xs text-emerald-600 bg-emerald-100 px-2 py-1 rounded">Live</span>
                    </div>
                    <div className="space-y-3">
                      {[
                        { icon: <FiBook className="text-emerald-500" />, title: "Chemistry Textbook", price: "₦3,500" },
                        { icon: <FiShoppingCart className="text-emerald-500" />, title: "Hostel Fridge", price: "₦15,000" },
                      ].map((item, index) => (
                        <div key={index} className="flex items-center justify-between p-2 hover:bg-gray-50 rounded transition">
                          <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 rounded-md bg-emerald-50 flex items-center justify-center">
                              {item.icon}
                            </div>
                            <span className="text-sm font-medium text-gray-700">{item.title}</span>
                          </div>
                          <span className="text-sm font-semibold text-emerald-600">{item.price}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <div className="py-6 bg-gray-50 border-b">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center items-center gap-6 md:gap-12">
            <p className="text-xs uppercase text-gray-500 font-medium">Trusted by students from:</p>
            {['Science', 'Engineering', 'Agriculture', 'Management', 'Health'].map((dept, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="text-sm font-medium text-gray-700"
              >
                {dept}
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="max-w-3xl mx-auto text-center mb-16"
          >
            <span className="inline-block px-3 py-1 text-xs font-semibold text-emerald-600 bg-emerald-50 rounded-full mb-3">WHY CHOOSE LADOKART</span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">The <span className="text-emerald-600">Smart Way</span> to Trade on Campus</h2>
            <p className="text-lg text-gray-600">Everything you need for safe, convenient campus trading</p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {[
              {
                icon: <FiCheckCircle className="w-6 h-6 text-emerald-500" />,
                title: "Verified Students Only",
                desc: "Every user is manually verified as a LAUTECH student through institutional email",
                bg: "bg-emerald-50"
              },
              {
                icon: <FiShield className="w-6 h-6 text-emerald-500" />,
                title: "Safe Exchange Zones",
                desc: "Pre-approved campus locations monitored for secure transactions",
                bg: "bg-emerald-50"
              },
              {
                icon: <FiMessageSquare className="w-6 h-6 text-emerald-500" />,
                title: "Secure Messaging",
                desc: "Built-in chat system so you never need to share personal contacts",
                bg: "bg-emerald-50"
              },
              {
                icon: <FiShoppingCart className="w-6 h-6 text-emerald-500" />,
                title: "Diverse Categories",
                desc: "From textbooks to gadgets, hostel items to services - all in one place",
                bg: "bg-emerald-50"
              },
            
          
            ].map((feature, i) => (
              <motion.div 
                key={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={slideUp}
                transition={{ delay: i * 0.1 }}
                className={`${feature.bg} p-6 rounded-xl border border-gray-200 hover:border-emerald-300 transition-all hover:shadow-lg`}
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

      {/* How It Works */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              className="lg:w-1/2"
            >
              <span className="inline-block px-3 py-1 text-xs font-semibold text-emerald-600 bg-emerald-50 rounded-full mb-3">GET STARTED</span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Start Trading in <span className="text-emerald-600">3 Easy Steps</span></h2>
              <p className="text-lg text-gray-600 mb-8">Join thousands of LAUTECH students buying and selling safely on campus</p>
              
              <div className="space-y-8">
                {[
                  {
                    step: "1",
                    title: "Create Your Profile",
                    desc: "Verify with your LAUTECH email address in minutes"
                  },
                  {
                    step: "2",
                    title: "Browse or List Items",
                    desc: "Find what you need or sell what you don't use anymore"
                  },
                  {
                    step: "3",
                    title: "Connect & Exchange",
                    desc: "Meet at safe campus locations to complete your trade"
                  }
                ].map((step, i) => (
                  <motion.div 
                    key={i}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={slideUp}
                    transition={{ delay: i * 0.15 }}
                    className="flex items-start"
                  >
                    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-bold text-lg mr-6 flex-shrink-0">
                      {step.step}
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-800 mb-2">{step.title}</h3>
                      <p className="text-gray-600">{step.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              viewport={{ once: true }}
              className="lg:w-1/2"
            >
              <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
                <div className="aspect-w-16 aspect-h-9 bg-gray-100 rounded-lg overflow-hidden mb-6">
                  <img 
                    src="https://res.cloudinary.com/dzibfknxq/image/upload/v1747103753/abstract-store-with-futuristic-concept-architecture_23-2150861984.jpg_eytuir.jpg"
                    alt="Ladokart in action"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="text-center">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">See Ladokart in Action</h3>
                  <p className="text-gray-600 mb-4">Watch how easy it is to buy and sell within campus</p>
                  <button className="inline-flex items-center justify-center px-6 py-2 border border-transparent text-base font-medium rounded-md text-white bg-emerald-600 hover:bg-emerald-700 shadow-sm">
                    Watch Demo
                  </button>
                </div>
              </div>
            </motion.div>
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
            className="max-w-3xl mx-auto text-center mb-16"
          >
            <span className="inline-block px-3 py-1 text-xs font-semibold text-emerald-600 bg-emerald-50 rounded-full mb-3">TESTIMONIALS</span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">What <span className="text-emerald-600">Ladokites</span> Are Saying</h2>
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
                className="bg-gray-50 p-6 rounded-xl border border-gray-200 hover:border-emerald-300 transition-all hover:shadow-lg"
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
      <section className="py-20 bg-gradient-to-br from-emerald-900 to-teal-800 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Join the Campus Trading Revolution</h2>
            <p className="text-xl text-emerald-100 mb-8">
              Be part of LAUTECH's first dedicated student marketplace
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
                <Link
                  to="/register"
                  className="inline-block bg-white hover:bg-gray-100 text-emerald-600 font-medium px-8 py-3 rounded-lg text-lg transition shadow-lg hover:shadow-xl"
                >
                  Sign Up Free
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
                <Link
                  to="/demo"
                  className="inline-block bg-transparent border-2 border-white hover:bg-white/10 text-white font-medium px-8 py-3 rounded-lg text-lg transition"
                >
                  See Demo
                </Link>
              </motion.div>
            </div>
            <p className="mt-4 text-sm text-emerald-200">No credit card required • Verified LAUTECH students only</p>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="max-w-3xl mx-auto text-center mb-16"
          >
            <span className="inline-block px-3 py-1 text-xs font-semibold text-emerald-600 bg-emerald-50 rounded-full mb-3">FAQS</span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Frequently Asked <span className="text-emerald-600">Questions</span></h2>
            <p className="text-lg text-gray-600">Everything you need to know about Ladokart</p>
          </motion.div>
          
          <div className="max-w-3xl mx-auto space-y-4">
            {[
              {
                question: "How do I verify my LAUTECH student status?",
                answer: "Simply sign up with your official LAUTECH email address (@student.lautech.edu.ng). We'll send a verification link to complete your registration."
              },
              {
                question: "Is there a fee to use Ladokart?",
                answer: "No, Ladokart is completely free for LAUTECH students to use. We may introduce premium features in the future, but the core marketplace will always remain free."
              },
              {
                question: "How do I ensure safe transactions?",
                answer: "We recommend meeting in public, well-lit areas on campus during daylight hours. Ladokart provides designated safe exchange zones across campus for your convenience."
              },
              {
                question: "What items can I list for sale?",
                answer: "You can list textbooks, electronics, hostel items, and other student essentials. Prohibited items include anything illegal or against LAUTECH policies."
              }
            ].map((faq, i) => (
              <motion.div 
                key={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={slideUp}
                transition={{ delay: i * 0.1 }}
                className="border border-gray-200 rounded-lg overflow-hidden"
              >
                <button className="w-full flex justify-between items-center p-5 text-left hover:bg-gray-50 transition">
                  <h3 className="font-medium text-gray-900">{faq.question}</h3>
                  <svg className="w-5 h-5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div className="px-5 pb-5 text-gray-600">
                  <p>{faq.answer}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-emerald-600 to-teal-600 rounded-xl p-8 md:p-12">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="mb-6 md:mb-0 md:mr-8">
                <h2 className="text-2xl md:text-3xl font-bold mb-2">Ready to transform your campus experience?</h2>
                <p className="text-emerald-100">Join thousands of LAUTECH students buying and selling smarter</p>
              </div>
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
                <Link
                  to="/register"
                  className="inline-block bg-white hover:bg-gray-100 text-emerald-600 font-medium px-8 py-3 rounded-lg text-lg transition shadow-lg hover:shadow-xl whitespace-nowrap"
                >
                  Get Started Now
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-gray-50 border-t border-gray-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
            <div className="col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 rounded-md bg-gradient-to-r from-emerald-500 to-teal-500 flex items-center justify-center text-white font-bold text-sm">LK</div>
                <span className="text-lg font-semibold text-gray-800">Ladokart</span>
              </div>
              <p className="text-gray-600 mb-4">LAUTECH's premier student marketplace for secure, convenient trading.</p>
              <div className="flex space-x-4">
                {['twitter', 'facebook', 'instagram'].map((social) => (
                  <a key={social} href="#" className="text-gray-500 hover:text-emerald-600">
                    <span className="sr-only">{social}</span>
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d={`M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z`} />
                    </svg>
                  </a>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">Product</h3>
              <ul className="space-y-3">
                <li><Link to="/features" className="text-gray-600 hover:text-emerald-600">Features</Link></li>
                <li><Link to="/pricing" className="text-gray-600 hover:text-emerald-600">Pricing</Link></li>
                <li><Link to="/testimonials" className="text-gray-600 hover:text-emerald-600">Testimonials</Link></li>
                <li><Link to="/updates" className="text-gray-600 hover:text-emerald-600">Updates</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">Company</h3>
              <ul className="space-y-3">
                <li><Link to="/about" className="text-gray-600 hover:text-emerald-600">About</Link></li>
                <li><Link to="/blog" className="text-gray-600 hover:text-emerald-600">Blog</Link></li>
                <li><Link to="/careers" className="text-gray-600 hover:text-emerald-600">Careers</Link></li>
                <li><Link to="/contact" className="text-gray-600 hover:text-emerald-600">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">Legal</h3>
              <ul className="space-y-3">
                <li><Link to="/privacy" className="text-gray-600 hover:text-emerald-600">Privacy</Link></li>
                <li><Link to="/terms" className="text-gray-600 hover:text-emerald-600">Terms</Link></li>
                <li><Link to="/security" className="text-gray-600 hover:text-emerald-600">Security</Link></li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-500">© {new Date().getFullYear()} Ladokart. Exclusive for LAUTECH students.</p>
            <div className="mt-4 md:mt-0 flex space-x-6">
              <Link to="/app" className="text-sm text-gray-500 hover:text-emerald-600">Mobile App</Link>
              <Link to="/status" className="text-sm text-gray-500 hover:text-emerald-600">Status</Link>
              <Link to="/help" className="text-sm text-gray-500 hover:text-emerald-600">Help Center</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}