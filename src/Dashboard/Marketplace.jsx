import { useState, useEffect } from 'react';
import { 
  FiSearch, FiFilter, FiHeart, FiShoppingCart, FiMapPin, 
  FiStar, FiChevronDown, FiBook, FiHome, 
  FiShoppingBag, FiMonitor, FiSmartphone, FiHeadphones,
  FiPrinter, FiCamera, FiWatch, FiCpu, FiHardDrive,
  FiPlus, FiX, FiChevronLeft, FiChevronRight
} from 'react-icons/fi';
import { FaLaptop, FaMemory, FaGamepad, FaTshirt, FaBicycle } from 'react-icons/fa';
import { GiDesk, GiSofa, GiKitchenScale, GiElectric } from 'react-icons/gi';
import { motion, AnimatePresence } from 'framer-motion';

// Expanded categories with React Icons
const categories = [
  { id: 1, name: 'Textbooks', icon: <FiBook className="text-emerald-500" /> },
  { id: 2, name: 'Laptops', icon: <FaLaptop className="text-blue-500" /> },
  { id: 3, name: 'Hostel Items', icon: <FiHome className="text-amber-500" /> },
  { id: 4, name: 'Clothing', icon: <FaTshirt className="text-purple-500" /> },
  { id: 5, name: 'Furniture', icon: <GiSofa className="text-rose-500" /> },
  { id: 6, name: 'Stationery', icon: <FiBook className="text-indigo-500" /> },
  { id: 7, name: 'Sports', icon: <FaBicycle className="text-green-500" /> },
  { id: 8, name: 'Phones', icon: <FiSmartphone className="text-cyan-500" /> },
  { id: 9, name: 'Headphones', icon: <FiHeadphones className="text-pink-500" /> },
  { id: 10, name: 'Monitors', icon: <FiMonitor className="text-orange-500" /> },
  { id: 11, name: 'Printers', icon: <FiPrinter className="text-yellow-500" /> },
  { id: 12, name: 'Cameras', icon: <FiCamera className="text-lime-500" /> },
  { id: 13, name: 'Smartwatches', icon: <FiWatch className="text-red-500" /> },
  { id: 14, name: 'Components', icon: <FiCpu className="text-violet-500" /> },
  { id: 15, name: 'Storage', icon: <FiHardDrive className="text-sky-500" /> },
  { id: 16, name: 'Gaming', icon: <FaGamepad className="text-fuchsia-500" /> },
  { id: 17, name: 'Kitchen', icon: <GiKitchenScale className="text-amber-500" /> },
  { id: 18, name: 'Electronics', icon: <GiElectric className="text-blue-400" /> },
];

// Expanded items list with more gadgets and goods
const items = [
  // Original items
  { 
    id: 1,
    title: 'Chemistry Textbook 3rd Edition', 
    price: '₦3,500', 
    originalPrice: '₦5,000',
    location: 'Faculty of Science', 
    image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    seller: 'Adeola J.',
    rating: 4.8,
    category: 'Textbooks',
    posted: '2 hours ago',
    description: 'Like new condition with minimal highlighting. Includes practice problems with solutions.',
    condition: 'Excellent'
  },
  { 
    id: 2,
    title: 'MacBook Pro 2020 (16GB RAM)', 
    price: '₦250,000', 
    originalPrice: '₦350,000',
    location: 'Tech Park', 
    image: 'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    seller: 'TechGuy',
    rating: 4.9,
    category: 'Laptops',
    posted: '1 day ago',
    description: 'M1 Chip, 512GB SSD. Includes original box and charger. Battery health 92%.',
    condition: 'Very Good'
  },
  
  // New electronics
  { 
    id: 11,
    title: 'PlayStation 5 Digital Edition', 
    price: '₦280,000', 
    originalPrice: '₦350,000',
    location: 'Games Hub', 
    image: 'https://images.unsplash.com/photo-1607853202273-797f1c22a38e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    seller: 'GameMaster',
    rating: 4.9,
    category: 'Gaming',
    posted: '3 days ago',
    description: 'Includes 2 controllers and 3 games. Barely used, like new condition.',
    condition: 'Like New'
  },
  { 
    id: 12,
    title: 'Nintendo Switch OLED', 
    price: '₦150,000', 
    originalPrice: '₦190,000',
    location: 'Student Union', 
    image: 'https://images.unsplash.com/photo-1638547733525-779a7fc5e7cd?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    seller: 'ConsoleKing',
    rating: 4.7,
    category: 'Gaming',
    posted: '1 week ago',
    description: 'White version with Zelda game included. Original packaging.',
    condition: 'Excellent'
  },
  
  // New furniture
  { 
    id: 13,
    title: 'Study Desk with Drawers', 
    price: '₦18,000', 
    originalPrice: '₦25,000',
    location: 'Hostel A Block', 
    image: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    seller: 'FurniturePro',
    rating: 4.5,
    category: 'Furniture',
    posted: '5 days ago',
    description: 'Compact wooden desk perfect for small spaces. Some minor scratches.',
    condition: 'Good'
  },
  { 
    id: 14,
    title: 'Comfortable Study Chair', 
    price: '₦12,000', 
    originalPrice: '₦18,000',
    location: 'Hostel C Block', 
    image: 'https://images.unsplash.com/photo-1517705008128-361805f42e86?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    seller: 'ChairSeller',
    rating: 4.3,
    category: 'Furniture',
    posted: '2 days ago',
    description: 'Ergonomic chair with adjustable height. Good condition.',
    condition: 'Good'
  },
  
  // New kitchen items
  { 
    id: 15,
    title: 'Mini Refrigerator 50L', 
    price: '₦35,000', 
    originalPrice: '₦45,000',
    location: 'Hostel B Block', 
    image: 'https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    seller: 'ApplianceGuy',
    rating: 4.6,
    category: 'Kitchen',
    posted: '1 week ago',
    description: 'Energy efficient, works perfectly. Includes small freezer compartment.',
    condition: 'Very Good'
  },
  { 
    id: 16,
    title: 'Electric Kettle 1.5L', 
    price: '₦5,000', 
    originalPrice: '₦7,500',
    location: 'Hostel D Block', 
    image: 'https://images.unsplash.com/photo-1593784991095-a205069470b6?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    seller: 'KitchenEssentials',
    rating: 4.2,
    category: 'Kitchen',
    posted: '3 days ago',
    description: 'Fast boiling, auto shut-off feature. Slightly used but works perfectly.',
    condition: 'Good'
  },
  
  // New clothing
  { 
    id: 17,
    title: 'LAUTECH Hoodie (Size L)', 
    price: '₦4,500', 
    originalPrice: '₦6,500',
    location: 'Student Union', 
    image: 'https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    seller: 'CampusWear',
    rating: 4.7,
    category: 'Clothing',
    posted: '4 days ago',
    description: 'Official LAUTECH hoodie, worn only a few times. No stains or damage.',
    condition: 'Like New'
  },
  { 
    id: 18,
    title: 'Designer Jeans (Size 32)', 
    price: '₦7,000', 
    originalPrice: '₦12,000',
    location: 'Fashion Hub', 
    image: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    seller: 'DenimKing',
    rating: 4.5,
    category: 'Clothing',
    posted: '1 week ago',
    description: 'Premium quality jeans, slight wear but excellent condition overall.',
    condition: 'Good'
  },
  
  // New sports equipment
  { 
    id: 19,
    title: 'Football Boots (Size 42)', 
    price: '₦8,000', 
    originalPrice: '₦12,000',
    location: 'Sports Complex', 
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    seller: 'Sporty',
    rating: 4.4,
    category: 'Sports',
    posted: '2 days ago',
    description: 'Nike Mercurial boots, used for one season only. Great traction.',
    condition: 'Good'
  },
  { 
    id: 20,
    title: 'Yoga Mat + Blocks', 
    price: '₦6,500', 
    originalPrice: '₦9,000',
    location: 'Health Center', 
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    seller: 'YogaQueen',
    rating: 4.8,
    category: 'Sports',
    posted: '5 days ago',
    description: 'Premium thick mat with 2 foam blocks. Lightly used, excellent condition.',
    condition: 'Excellent'
  }
];

export default function Marketplace() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [priceRange, setPriceRange] = useState([0, 500000]);
  const [sortBy, setSortBy] = useState('Recent');
  const [showFilters, setShowFilters] = useState(false);
  const [likedItems, setLikedItems] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Load liked items from localStorage
  useEffect(() => {
    const savedLikes = localStorage.getItem('likedItems');
    if (savedLikes) setLikedItems(JSON.parse(savedLikes));
    
    const savedCart = localStorage.getItem('cartItems');
    if (savedCart) setCartItems(JSON.parse(savedCart));
  }, []);

  // Save liked items to localStorage
  useEffect(() => {
    localStorage.setItem('likedItems', JSON.stringify(likedItems));
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [likedItems, cartItems]);

  const filteredItems = items.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         item.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const price = parseInt(item.price.replace(/[^0-9]/g, ''));
    const matchesPrice = price >= priceRange[0] && price <= priceRange[1];
    
    return matchesSearch && matchesCategory && matchesPrice;
  }).sort((a, b) => {
    if (sortBy === 'Price: Low to High') {
      return parseInt(a.price.replace(/[^0-9]/g, '')) - parseInt(b.price.replace(/[^0-9]/g, ''));
    } else if (sortBy === 'Price: High to Low') {
      return parseInt(b.price.replace(/[^0-9]/g, '')) - parseInt(a.price.replace(/[^0-9]/g, ''));
    } else if (sortBy === 'Highest Rated') {
      return b.rating - a.rating;
    }
    // Default to recent (no sorting change)
    return 0;
  });

  const toggleLike = (itemId) => {
    setLikedItems(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId) 
        : [...prev, itemId]
    );
  };

  const addToCart = (item) => {
    setCartItems(prev => [...prev, item]);
  };

  const removeFromCart = (itemId) => {
    setCartItems(prev => prev.filter(item => item.id !== itemId));
  };

  const openItemDetails = (item) => {
    setSelectedItem(item);
    setCurrentImageIndex(0);
    document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
  };

  const closeItemDetails = () => {
    setSelectedItem(null);
    document.body.style.overflow = 'auto';
  };

  const nextImage = () => {
    setCurrentImageIndex(prev => (prev + 1) % 3); // Assuming 3 images per item
  };

  const prevImage = () => {
    setCurrentImageIndex(prev => (prev - 1 + 3) % 3);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">Ladokart Marketplace</h1>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <button className="p-2 text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100 relative">
                  <FiShoppingCart className="h-5 w-5" />
                  {cartItems.length > 0 && (
                    <span className="absolute -top-1 -right-1 bg-emerald-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {cartItems.length}
                    </span>
                  )}
                </button>
              </div>
              <div className="relative">
                <button className="flex items-center space-x-2">
                  <img 
                    className="w-8 h-8 rounded-full" 
                    src="https://randomuser.me/api/portraits/women/44.jpg" 
                    alt="User profile" 
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Search and Filter Bar */}
        <div className="bg-white rounded-xl shadow-sm p-4 mb-6 border border-gray-100">
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            <div className="flex-1 relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiSearch className="text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg bg-gray-50 focus:ring-emerald-500 focus:border-emerald-500"
                placeholder="Search for textbooks, electronics, etc..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-700"
            >
              <FiFilter />
              <span>Filters</span>
              <FiChevronDown className={`transition-transform ${showFilters ? 'rotate-180' : ''}`} />
            </motion.button>
            
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="block w-full pl-3 pr-10 py-2 border border-gray-300 rounded-lg bg-white focus:ring-emerald-500 focus:border-emerald-500"
              >
                <option>Recent</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Highest Rated</option>
              </select>
            </div>
          </div>
          
          {showFilters && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              transition={{ duration: 0.2 }}
              className="mt-4 pt-4 border-t border-gray-200"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-2">Category</h3>
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => setSelectedCategory('All')}
                      className={`px-3 py-1 rounded-full text-sm ${selectedCategory === 'All' ? 'bg-emerald-100 text-emerald-800' : 'bg-gray-100 text-gray-800'}`}
                    >
                      All
                    </button>
                    {categories.map(category => (
                      <button
                        key={category.id}
                        onClick={() => setSelectedCategory(category.name)}
                        className={`px-3 py-1 rounded-full text-sm flex items-center gap-1 ${selectedCategory === category.name ? 'bg-emerald-100 text-emerald-800' : 'bg-gray-100 text-gray-800'}`}
                      >
                        {category.icon} {category.name}
                      </button>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-2">Price Range</h3>
                  <div className="flex items-center gap-4">
                    <input
                      type="range"
                      min="0"
                      max="500000"
                      step="1000"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                    />
                    <div className="text-sm text-gray-600 whitespace-nowrap">
                      ₦{priceRange[0].toLocaleString()} - ₦{priceRange[1].toLocaleString()}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </div>
        
        {/* Category Quick Links */}
        <div className="mb-6">
          <div className="flex overflow-x-auto pb-4 gap-3">
            {categories.map(category => (
              <motion.button
                key={category.id}
                whileHover={{ y: -2 }}
                onClick={() => setSelectedCategory(category.name)}
                className={`flex flex-col items-center justify-center p-3 rounded-xl min-w-[100px] transition-colors ${selectedCategory === category.name ? 'bg-emerald-100' : 'bg-white shadow-sm border border-gray-100'}`}
              >
                <span className="text-2xl mb-1">{category.icon}</span>
                <span className="text-xs font-medium">{category.name}</span>
              </motion.button>
            ))}
          </div>
        </div>
        
        {/* Items Grid */}
        {filteredItems.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredItems.map(item => (
              <motion.div 
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ y: -5 }}
                className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 hover:shadow-md transition-all"
              >
                <div className="relative h-48 overflow-hidden group">
                  <img 
                    src={item.image} 
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 cursor-pointer"
                    onClick={() => openItemDetails(item)}
                  />
                  
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleLike(item.id);
                    }}
                    className="absolute top-3 right-3 p-2 bg-white/80 backdrop-blur-sm rounded-full shadow-sm hover:bg-red-100 transition-colors"
                  >
                    <FiHeart 
                      className={`h-5 w-5 ${likedItems.includes(item.id) ? 'fill-red-500 text-red-500' : 'text-gray-400 hover:text-red-500'}`} 
                    />
                  </button>
                  
                  {item.originalPrice && (
                    <div className="absolute top-3 left-3 bg-emerald-500 text-white text-xs font-bold px-2 py-1 rounded">
                      {Math.round((1 - (parseInt(item.price.replace(/[^0-9]/g, '')) / parseInt(item.originalPrice.replace(/[^0-9]/g, '')))) * 100)}% OFF
                    </div>
                  )}
                </div>
                
                <div className="p-4">
                  <h3 
                    className="font-medium text-gray-900 line-clamp-2 cursor-pointer hover:text-emerald-600"
                    onClick={() => openItemDetails(item)}
                  >
                    {item.title}
                  </h3>
                  
                  <div className="mt-2 flex items-center justify-between">
                    <div>
                      <p className="text-emerald-600 font-semibold">{item.price}</p>
                      {item.originalPrice && (
                        <p className="text-xs text-gray-500 line-through">{item.originalPrice}</p>
                      )}
                    </div>
                    
                    <div className="flex items-center text-sm text-gray-500">
                      <FiStar className="text-yellow-400 mr-1" />
                      {item.rating}
                    </div>
                  </div>
                  
                  <div className="mt-3 flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center">
                      <FiMapPin className="mr-1" />
                      <span>{item.location}</span>
                    </div>
                    <span>{item.posted}</span>
                  </div>
                  
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-xs px-2 py-1 bg-gray-100 rounded-full">{item.category}</span>
                    <motion.button 
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="text-sm font-medium text-emerald-600 hover:text-emerald-500"
                      onClick={(e) => {
                        e.stopPropagation();
                        openItemDetails(item);
                      }}
                    >
                      View Details
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm p-8 text-center border border-gray-100">
            <h3 className="text-lg font-medium text-gray-900">No items found</h3>
            <p className="mt-2 text-gray-500">Try adjusting your search or filters</p>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
                setPriceRange([0, 500000]);
              }}
              className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-emerald-600 hover:bg-emerald-700"
            >
              Reset Filters
            </motion.button>
          </div>
        )}
      </main>

      {/* Item Detail Modal */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-30 flex items-center justify-center p-4"
            onClick={closeItemDetails}
          >
            <motion.div 
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h2 className="text-2xl font-bold text-gray-900">{selectedItem.title}</h2>
                  <button 
                    onClick={closeItemDetails}
                    className="p-2 text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100"
                  >
                    <FiX className="h-5 w-5" />
                  </button>
                </div>
                
                <div className="relative h-64 md:h-80 rounded-lg overflow-hidden mb-4">
                  <img 
                    src={selectedItem.image} 
                    alt={selectedItem.title}
                    className="w-full h-full object-cover"
                  />
                  <button 
                    className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-white/80 backdrop-blur-sm rounded-full shadow-sm hover:bg-gray-100"
                    onClick={(e) => {
                      e.stopPropagation();
                      prevImage();
                    }}
                  >
                    <FiChevronLeft className="h-5 w-5" />
                  </button>
                  <button 
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-white/80 backdrop-blur-sm rounded-full shadow-sm hover:bg-gray-100"
                    onClick={(e) => {
                      e.stopPropagation();
                      nextImage();
                    }}
                  >
                    <FiChevronRight className="h-5 w-5" />
                  </button>
                  <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
                    {[0, 1, 2].map((index) => (
                      <button
                        key={index}
                        className={`w-2 h-2 rounded-full ${currentImageIndex === index ? 'bg-emerald-500' : 'bg-gray-300'}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          setCurrentImageIndex(index);
                        }}
                      />
                    ))}
                  </div>
                </div>
                
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="md:col-span-2">
                    <h3 className="text-lg font-medium mb-2">Description</h3>
                    <p className="text-gray-600 mb-4">{selectedItem.description}</p>
                    
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <h4 className="text-sm font-medium text-gray-500">Condition</h4>
                        <p className="text-gray-900">{selectedItem.condition}</p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-gray-500">Category</h4>
                        <p className="text-gray-900">{selectedItem.category}</p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-gray-500">Location</h4>
                        <p className="text-gray-900">{selectedItem.location}</p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-gray-500">Seller</h4>
                        <p className="text-gray-900">{selectedItem.seller}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="border border-gray-200 rounded-lg p-4 h-fit">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <p className="text-emerald-600 font-bold text-xl">{selectedItem.price}</p>
                        {selectedItem.originalPrice && (
                          <p className="text-sm text-gray-500 line-through">{selectedItem.originalPrice}</p>
                        )}
                      </div>
                      <div className="flex items-center">
                        <FiStar className="text-yellow-400 mr-1" />
                        <span>{selectedItem.rating}</span>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full bg-emerald-600 text-white py-2 rounded-lg font-medium"
                        onClick={() => {
                          addToCart(selectedItem);
                        }}
                      >
                        Add to Cart
                      </motion.button>
                      
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full border border-emerald-600 text-emerald-600 py-2 rounded-lg font-medium"
                        onClick={() => {
                          toggleLike(selectedItem.id);
                        }}
                      >
                        {likedItems.includes(selectedItem.id) ? 'Remove from Wishlist' : 'Add to Wishlist'}
                      </motion.button>
                      
                      <button className="w-full text-emerald-600 text-sm font-medium py-2">
                        Contact Seller
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}