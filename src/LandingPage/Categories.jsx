import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
        FiSearch, 
        FiFilter, 
        FiGrid, 
        FiList, 
        FiBook, 
        FiSmartphone, 
        FiHome, 
        FiUser
      } from 'react-icons/fi';
import { motion } from 'framer-motion';

const categories = [
  {
    id: 1,
    name: 'Textbooks',
    icon: <FiBook className="w-6 h-6" />,
    color: 'bg-blue-100 text-blue-600',
    items: 128,
    popular: true
  },
  {
    id: 2,
    name: 'Electronics',
    icon: <FiSmartphone className="w-6 h-6" />,
    color: 'bg-purple-100 text-purple-600',
    items: 86,
    popular: true
  },
  {
    id: 3,
    name: 'Hostel Items',
    icon: <FiHome className="w-6 h-6" />,
    color: 'bg-amber-100 text-amber-600',
    items: 64
  },
  {
    id: 4,
    name: 'Fashion',
    icon: <FiUser className="w-6 h-6" />,
    color: 'bg-pink-100 text-pink-600',
    items: 42
  },
  {
    id: 5,
    name: 'Stationery',
    icon: <FiBook className="w-6 h-6" />,
    color: 'bg-emerald-100 text-emerald-600',
    items: 37
  },
  {
    id: 6,
    name: 'Services',
    icon: <FiSmartphone className="w-6 h-6" />,
    color: 'bg-indigo-100 text-indigo-600',
    items: 29
  },
  {
    id: 7,
    name: 'Sports',
    icon: <FiHome className="w-6 h-6" />,
    color: 'bg-red-100 text-red-600',
    items: 23
  },
  {
    id: 8,
    name: 'Others',
    icon: <FiUser className="w-6 h-6" />,
    color: 'bg-gray-100 text-gray-600',
    items: 15
  }
];

export default function Categories() {
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState('grid');
  const [activeFilter, setActiveFilter] = useState('all');

  const filteredCategories = categories.filter(category => {
    const matchesSearch = category.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = activeFilter === 'all' || (activeFilter === 'popular' && category.popular);
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Header */}
      <div className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-16">
        <div className="container mx-auto px-5 text-center">
          <h1 className="text-4xl font-bold mb-4">Browse Categories</h1>
          <p className="text-xl text-emerald-100 max-w-2xl mx-auto">
            Find exactly what you're looking for in LAUTECH's marketplace
          </p>
        </div>
      </div>

      {/* Controls Section */}
      <div className="container mx-auto px-5 py-8 -mt-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-xl shadow-md p-5 border border-gray-100"
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            {/* Search Bar */}
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiSearch className="text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg bg-gray-50 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                placeholder="Search categories..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Filters */}
            <div className="flex items-center space-x-4">
              <div className="relative">
                <button 
                  className="flex items-center space-x-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition"
                  onClick={() => setActiveFilter(activeFilter === 'popular' ? 'all' : 'popular')}
                >
                  <FiFilter />
                  <span>{activeFilter === 'popular' ? 'Popular Only' : 'All Categories'}</span>
                </button>
              </div>

              {/* View Toggle */}
              <div className="flex bg-gray-100 rounded-lg p-1">
                <button 
                  className={`p-2 rounded-md ${viewMode === 'grid' ? 'bg-white shadow-sm' : ''}`}
                  onClick={() => setViewMode('grid')}
                >
                  <FiGrid />
                </button>
                <button 
                  className={`p-2 rounded-md ${viewMode === 'list' ? 'bg-white shadow-sm' : ''}`}
                  onClick={() => setViewMode('list')}
                >
                  <FiList />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Categories Grid */}
      <div className="container mx-auto px-5 pb-20">
        {filteredCategories.length === 0 ? (
          <div className="text-center py-16">
            <h3 className="text-xl font-medium text-gray-600">No categories found</h3>
            <p className="text-gray-500 mt-2">Try adjusting your search or filter</p>
          </div>
        ) : viewMode === 'grid' ? (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {filteredCategories.map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ y: -5 }}
                className="bg-white rounded-xl shadow-sm hover:shadow-md border border-gray-100 overflow-hidden transition-all"
              >
                <Link 
                  to={`/browse?category=${category.name.toLowerCase()}`}
                  className="block h-full"
                >
                  <div className="p-6">
                    <div className={`w-12 h-12 rounded-lg ${category.color} flex items-center justify-center mb-4`}>
                      {category.icon}
                    </div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-1">{category.name}</h3>
                    <p className="text-sm text-gray-500">{category.items} items available</p>
                  </div>
                  {category.popular && (
                    <div className="px-4 py-2 bg-emerald-50 text-emerald-600 text-xs font-medium">
                      Popular Category
                    </div>
                  )}
                </Link>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-4"
          >
            {filteredCategories.map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ x: 5 }}
                className="bg-white rounded-lg shadow-sm hover:shadow-md border border-gray-100 overflow-hidden transition-all"
              >
                <Link 
                  to={`/browse?category=${category.name.toLowerCase()}`}
                  className="block"
                >
                  <div className="flex items-center p-5">
                    <div className={`w-10 h-10 rounded-lg ${category.color} flex items-center justify-center mr-4`}>
                      {category.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-800">{category.name}</h3>
                      <p className="text-sm text-gray-500">{category.items} items available</p>
                    </div>
                    {category.popular && (
                      <span className="px-3 py-1 bg-emerald-50 text-emerald-600 text-xs font-medium rounded-full">
                        Popular
                      </span>
                    )}
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-16">
        <div className="container mx-auto px-5 text-center">
          <h2 className="text-2xl font-bold mb-4">Can't find what you're looking for?</h2>
          <p className="text-lg text-emerald-100 mb-6 max-w-2xl mx-auto">
            Suggest a new category and we'll add it to the marketplace
          </p>
          <button className="bg-white hover:bg-gray-100 text-emerald-600 font-medium px-6 py-3 rounded-lg shadow-md hover:shadow-lg transition">
            Request a Category
          </button>
        </div>
      </div>
    </div>
  );
}