import { useState, useEffect } from 'react';
import { 
  FiSearch, FiBell, FiMessageSquare, FiShoppingCart, 
  FiGrid, FiUser, FiSettings, FiLogOut, FiPlus, 
  FiMenu, FiX, FiBook, FiHome, FiShoppingBag 
} from 'react-icons/fi';

import {
  FaLaptop
} from 'react-icons/fa';

import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Sample data
  const categories = [
    { name: 'Textbooks', icon: <FiBook className="text-emerald-500" />, count: 124 },
    { name: 'Electronics', icon: <FaLaptop className="text-blue-500" />, count: 89 },
    { name: 'Hostel Items', icon: <FiHome className="text-amber-500" />, count: 76 },
    { name: 'Clothing', icon: <FiShoppingBag className="text-purple-500" />, count: 53 },
  ];
  
  const recentItems = [
    { 
      title: 'Chemistry Textbook 3rd Edition', 
      price: '₦3,500', 
      location: 'Faculty of Science', 
      image: 'https://via.placeholder.com/150',
      seller: 'Adeola J.'
    },
    { 
      title: 'Mini Fridge 50L', 
      price: '₦15,000', 
      location: 'Hostel B Block', 
      image: 'https://via.placeholder.com/150',
      seller: 'Chinedu O.'
    },
    { 
      title: 'Calculus Study Notes', 
      price: '₦1,200', 
      location: 'Library', 
      image: 'https://via.placeholder.com/150',
      seller: 'Bisi A.'
    },
  ];

  const notifications = [
    { text: 'Your listing has been approved', time: '2 min ago' },
    { text: 'New message from Chinedu', time: '15 min ago' },
    { text: 'Price drop on textbooks you viewed', time: '1 hr ago' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Menu Button */}
      <button 
        className="md:hidden fixed top-5 right-4 z-50 p-2 rounded-full bg-teal-600 text-white shadow-md cursor-pointer"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        {isMobileMenuOpen ? <FiX className="h-6 w-6" /> : <FiMenu className="h-6 w-6" />}
      </button>

      {/* Mobile Header Logo */}
      <div className="md:hidden flex items-center justify-center py-4">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-emerald-500 to-teal-500 flex items-center justify-center text-white font-bold">
            LK
          </div>
          <span className="text-lg font-semibold">Ladokart</span>
        </div>
      </div>

    

      {/* Navigation Sidebar */}
      {(isMobileMenuOpen || windowWidth >= 768) && (
        <motion.div 
          initial={{ x: windowWidth >= 768 ? 0 : -300 }}
          animate={{ x: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="fixed inset-y-0 left-0 w-64 bg-white shadow-md z-40 md:z-auto"
        >
          <div className="p-6">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-emerald-500 to-teal-500 flex items-center justify-center text-white font-bold">
                LK
              </div>
              <span className="text-xl font-semibold">Ladokart</span>
            </div>
          </div>
          
          <nav className="mt-8 px-4 space-y-1">
            <Link to="/dashboard" className="flex items-center px-4 py-3 text-emerald-600 bg-emerald-50 rounded-lg font-medium">
              <FiGrid className="mr-3" />
              Dashboard
            </Link>
            <Link to="/marketplace" className="flex items-center px-4 py-3 text-gray-600 hover:bg-gray-100 rounded-lg">
              <FiShoppingCart className="mr-3" />
              Marketplace
            </Link>
            <Link to="/messages" className="flex items-center px-4 py-3 text-gray-600 hover:bg-gray-100 rounded-lg">
              <FiMessageSquare className="mr-3" />
              Messages
            </Link>
            <Link to="/profile" className="flex items-center px-4 py-3 text-gray-600 hover:bg-gray-100 rounded-lg">
              <FiUser className="mr-3" />
              Profile
            </Link>
            <Link to="/settings" className="flex items-center px-4 py-3 text-gray-600 hover:bg-gray-100 rounded-lg">
              <FiSettings className="mr-3" />
              Settings
            </Link>
          </nav>
          
          <div className="absolute bottom-0 w-full p-4">
            <button className="w-full flex items-center justify-center px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg">
              <FiLogOut className="mr-3" />
              Sign Out
            </button>
          </div>
        </motion.div>
      )}

      {/* Main Content */}
      <div className={`${windowWidth >= 768 ? 'md:ml-64' : ''}`}>
        {/* Top Navigation */}
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
            <div className="flex-1 max-w-md ml-0 md:ml-0">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiSearch className="text-gray-400" />
                </div>
                <input
                  type="text"
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg bg-gray-50 focus:ring-emerald-500 focus:border-emerald-500"
                  placeholder="Search for items..."
                />
              </div>
            </div>
            
            <div className="ml-4 flex items-center space-x-4">
              <button className="p-2 text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100">
                <FiBell className="h-5 w-5" />
              </button>
              
              <div className="relative">
                <button className="flex items-center space-x-2">
                  <img 
                    className="w-8 h-8 rounded-full" 
                    src="https://randomuser.me/api/portraits/women/44.jpg" 
                    alt="User profile" 
                  />
                  <span className="hidden md:inline text-sm font-medium">Adeola J.</span>
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {/* Welcome Banner */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-r from-emerald-500 to-teal-600 rounded-xl p-6 text-white shadow-lg"
          >
            <h1 className="text-2xl font-bold">Welcome back, Adeola!</h1>
            <p className="mt-2 text-emerald-100">What would you like to do today?</p>
            
            <div className="mt-4 flex flex-wrap gap-3">
              <motion.button 
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center bg-white text-emerald-600 px-4 py-2 rounded-lg font-medium shadow-sm"
              >
                <FiPlus className="mr-2" />
                Sell an Item
              </motion.button>
              
              <motion.a
                href = '/marketplace'
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="flex hover:cursor-pointer items-center bg-white/20 backdrop-blur-sm border border-white/30 px-4 py-2 rounded-lg font-medium"
              >
                Browse Marketplace
              </motion.a>
            </div>
          </motion.div>

          {/* Quick Stats */}
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { title: 'Active Listings', value: 12, change: '+2', trend: 'up' },
              { title: 'Messages', value: 5, change: '+3', trend: 'up' },
              { title: 'Items Sold', value: 8, change: '0', trend: 'neutral' },
              { title: 'Account Rating', value: '4.8', change: '+0.2', trend: 'up' },
            ].map((stat, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-white p-4 rounded-xl shadow-sm border border-gray-100"
              >
                <p className="text-sm text-gray-500">{stat.title}</p>
                <div className="mt-2 flex items-baseline">
                  <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
                  {stat.change !== '0' && (
                    <span className={`ml-2 text-sm font-medium ${stat.trend === 'up' ? 'text-emerald-600' : 'text-red-600'}`}>
                      {stat.change}
                    </span>
                  )}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Categories */}
          <div className="mt-8">
            <h2 className="text-lg font-medium text-gray-900">Browse Categories</h2>
            <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-4">
              {categories.map((category, i) => (
                <motion.div 
                  key={i}
                  whileHover={{ y: -5 }}
                  className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center text-center"
                >
                  <div className="w-12 h-12 rounded-lg bg-gray-50 flex items-center justify-center text-2xl">
                    {category.icon}
                  </div>
                  <h3 className="mt-3 font-medium text-gray-900">{category.name}</h3>
                  <p className="mt-1 text-sm text-gray-500">{category.count} items</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Recent Items */}
          <div className="mt-8">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-medium text-gray-900">Recently Added</h2>
              <Link to="/marketplace" className="text-sm font-medium text-emerald-600 hover:text-emerald-500">
                View all
              </Link>
            </div>
            
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {recentItems.map((item, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100"
                >
                  <div className="h-40 bg-gray-100 overflow-hidden">
                    <img 
                      src={item.image} 
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-medium text-gray-900">{item.title}</h3>
                    <p className="mt-1 text-emerald-600 font-semibold">{item.price}</p>
                    <div className="mt-3 flex items-center justify-between text-sm text-gray-500">
                      <span>{item.location}</span>
                      <span>Seller: {item.seller}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Notifications */}
          <div className="mt-8">
            <h2 className="text-lg font-medium text-gray-900">Notifications</h2>
            <div className="mt-4 bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
              {notifications.map((notification, i) => (
                <div key={i} className={`p-4 ${i !== notifications.length - 1 ? 'border-b border-gray-100' : ''}`}>
                  <p className="text-gray-900">{notification.text}</p>
                  <p className="mt-1 text-sm text-gray-500">{notification.time}</p>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}