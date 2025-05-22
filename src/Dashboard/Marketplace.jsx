import { useState, useEffect } from 'react';
import { 
  FiSearch, FiFilter, FiHeart, FiShoppingCart, FiMapPin, 
  FiStar, FiChevronDown, FiBook, FiHome, 
  FiShoppingBag, FiMonitor, FiSmartphone, FiHeadphones,
  FiPrinter, FiCamera, FiWatch, FiCpu, FiHardDrive,
  FiPlus, FiX, FiChevronLeft, FiChevronRight, FiMessageSquare,
  FiShield, FiTruck, FiCreditCard, FiUser, FiBell
} from 'react-icons/fi';
import { FaLaptop, FaMemory, FaGamepad, FaTshirt, FaBicycle, FaWhatsapp } from 'react-icons/fa';
import { GiDesk, GiSofa, GiKitchenScale, GiElectric } from 'react-icons/gi';
import { IoIosFlash } from 'react-icons/io';
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
  { 
    id: 1,
    title: 'Chemistry Textbook 3rd Edition', 
    price: '₦3,500', 
    originalPrice: '₦5,000',
    location: 'Faculty of Science', 
    images: [
      'https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      'https://images.unsplash.com/photo-1589998059171-988d887df646?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      'https://images.unsplash.com/photo-1512820790803-83ca734da794?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
    ],
    seller: 'Adeola J.',
    sellerRating: 4.8,
    sellerReviews: 24,
    category: 'Textbooks',
    posted: '2 hours ago',
    description: 'Like new condition with minimal highlighting. Includes practice problems with solutions. Perfect for CHEM 101 and 102 courses. No torn pages or water damage.',
    condition: 'Excellent',
    delivery: true,
    warranty: false,
    negotiable: true,
    tags: ['Textbook', 'Chemistry', 'Science', 'University']
  },
  { 
    id: 2,
    title: 'MacBook Pro 2020 (16GB RAM, 512GB SSD)', 
    price: '₦250,000', 
    originalPrice: '₦350,000',
    location: 'Tech Park', 
    images: [
      'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
    ],
    seller: 'TechGuy',
    sellerRating: 4.9,
    sellerReviews: 56,
    category: 'Laptops',
    posted: '1 day ago',
    description: 'M1 Chip, 512GB SSD. Includes original box and charger. Battery health 92%. Perfect for students and professionals. Comes with 3 months warranty.',
    condition: 'Very Good',
    delivery: true,
    warranty: true,
    negotiable: false,
    tags: ['Apple', 'MacBook', 'Laptop', 'Premium']
  },
  { 
    id: 11,
    title: 'PlayStation 5 Digital Edition (1TB)', 
    price: '₦280,000', 
    originalPrice: '₦350,000',
    location: 'Games Hub', 
    images: [
      'https://images.unsplash.com/photo-1607853202273-797f1c22a38e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      'https://images.unsplash.com/photo-1607853202273-797f1c22a38e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      'https://images.unsplash.com/photo-1607853202273-797f1c22a38e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
    ],
    seller: 'GameMaster',
    sellerRating: 4.9,
    sellerReviews: 42,
    category: 'Gaming',
    posted: '3 days ago',
    description: 'Includes 2 controllers and 3 games (FIFA 23, God of War, Spider-Man). Barely used, like new condition. Original packaging included. 6 months warranty.',
    condition: 'Like New',
    delivery: true,
    warranty: true,
    negotiable: true,
    tags: ['Gaming', 'Console', 'PS5', 'Entertainment']
  },
  { 
    id: 13,
    title: 'Study Desk with Drawers (Wooden)', 
    price: '₦18,000', 
    originalPrice: '₦25,000',
    location: 'Hostel A Block', 
    images: [
      'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
    ],
    seller: 'FurniturePro',
    sellerRating: 4.5,
    sellerReviews: 18,
    category: 'Furniture',
    posted: '5 days ago',
    description: 'Compact wooden desk perfect for small spaces. 3 drawers for storage. Dimensions: 100cm x 60cm x 75cm. Some minor scratches but structurally sound.',
    condition: 'Good',
    delivery: false,
    warranty: false,
    negotiable: true,
    tags: ['Furniture', 'Desk', 'Study', 'Hostel']
  },
  { 
    id: 15,
    title: 'Mini Refrigerator 50L (Hisense)', 
    price: '₦35,000', 
    originalPrice: '₦45,000',
    location: 'Hostel B Block', 
    images: [
      'https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      'https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      'https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
    ],
    seller: 'ApplianceGuy',
    sellerRating: 4.6,
    sellerReviews: 31,
    category: 'Kitchen',
    posted: '1 week ago',
    description: 'Energy efficient, works perfectly. Includes small freezer compartment. Silent operation. Power: 100W. 1 year warranty remaining.',
    condition: 'Very Good',
    delivery: true,
    warranty: true,
    negotiable: true,
    tags: ['Fridge', 'Kitchen', 'Appliance', 'Hostel']
  },
  { 
    id: 17,
    title: 'LAUTECH Hoodie (Size L, Blue)', 
    price: '₦4,500', 
    originalPrice: '₦6,500',
    location: 'Student Union', 
    images: [
      'https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      'https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      'https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
    ],
    seller: 'CampusWear',
    sellerRating: 4.7,
    sellerReviews: 89,
    category: 'Clothing',
    posted: '4 days ago',
    description: 'Official LAUTECH hoodie, worn only a few times. No stains or damage. 80% cotton, 20% polyester. Machine washable. School logo embroidered.',
    condition: 'Like New',
    delivery: true,
    warranty: false,
    negotiable: true,
    tags: ['Clothing', 'Hoodie', 'School', 'Fashion']
  },
  { 
    id: 19,
    title: 'Football Boots Nike Mercurial (Size 42)', 
    price: '₦8,000', 
    originalPrice: '₦12,000',
    location: 'Sports Complex', 
    images: [
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
    ],
    seller: 'Sporty',
    sellerRating: 4.4,
    sellerReviews: 15,
    category: 'Sports',
    posted: '2 days ago',
    description: 'Nike Mercurial boots, used for one season only. Great traction. FG studs. Color: Black/Red. Includes original box and spare laces.',
    condition: 'Good',
    delivery: false,
    warranty: false,
    negotiable: true,
    tags: ['Sports', 'Football', 'Boots', 'Nike']
  },
  { 
    id: 20,
    title: 'Yoga Mat + Blocks (Premium Set)', 
    price: '₦6,500', 
    originalPrice: '₦9,000',
    location: 'Health Center', 
    images: [
      'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
    ],
    seller: 'YogaQueen',
    sellerRating: 4.8,
    sellerReviews: 37,
    category: 'Sports',
    posted: '5 days ago',
    description: 'Premium thick mat (6mm) with 2 foam blocks. Lightly used, excellent condition. Non-slip surface. Mat dimensions: 183cm x 61cm. Perfect for beginners.',
    condition: 'Excellent',
    delivery: true,
    warranty: false,
    negotiable: false,
    tags: ['Sports', 'Yoga', 'Fitness', 'Exercise']
  }
];

// Flash sale items
const flashSaleItems = [
  {
    id: 101,
    title: 'Wireless Earbuds',
    price: '₦8,500',
    originalPrice: '₦15,000',
    discount: 43,
    timeLeft: '04:32:15'
  },
  {
    id: 102,
    title: 'Scientific Calculator',
    price: '₦3,200',
    originalPrice: '₦5,500',
    discount: 42,
    timeLeft: '04:32:15'
  },
  {
    id: 103,
    title: 'Backpack',
    price: '₦6,000',
    originalPrice: '₦9,500',
    discount: 37,
    timeLeft: '04:32:15'
  },
  {
    id: 104,
    title: 'Power Bank 20,000mAh',
    price: '₦12,000',
    originalPrice: '₦18,000',
    discount: 33,
    timeLeft: '04:32:15'
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
  const [showCart, setShowCart] = useState(false);
  const [activeTab, setActiveTab] = useState('all');
  const [showNotification, setShowNotification] = useState(false);

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
                         item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
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
      return b.sellerRating - a.sellerRating;
    } else if (sortBy === 'Most Popular') {
      return b.sellerReviews - a.sellerReviews;
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
    
    // Show notification when adding to wishlist
    if (!likedItems.includes(itemId)) {
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 3000);
    }
  };

  const addToCart = (item) => {
    setCartItems(prev => [...prev, item]);
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
  };

  const removeFromCart = (itemId) => {
    setCartItems(prev => prev.filter(item => item.id !== itemId));
  };

  const openItemDetails = (item) => {
    setSelectedItem(item);
    setCurrentImageIndex(0);
    document.body.style.overflow = 'hidden';
  };

  const closeItemDetails = () => {
    setSelectedItem(null);
    document.body.style.overflow = 'auto';
  };

  const nextImage = () => {
    setCurrentImageIndex(prev => (prev + 1) % selectedItem.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex(prev => (prev - 1 + selectedItem.images.length) % selectedItem.images.length);
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => {
      return total + parseInt(item.price.replace(/[^0-9]/g, ''));
    }, 0);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Notification */}
      <AnimatePresence>
        {showNotification && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="fixed top-4 right-4 bg-emerald-500 text-white px-4 py-2 rounded-lg shadow-lg z-40 flex items-center"
          >
            <FiCheck className="mr-2" />
            Item added successfully!
          </motion.div>
        )}
      </AnimatePresence>

      {/* Top Navigation Bar */}
      <div className="bg-emerald-600 text-white py-2 px-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <FiTruck className="text-white" />
            <span className="text-sm">Free delivery on orders over ₦50,000</span>
          </div>
          <div className="flex items-center space-x-6">
            <button className="text-sm flex items-center">
              <FiUser className="mr-1" />
              <span>Account</span>
            </button>
            <button className="text-sm flex items-center">
              <FiBell className="mr-1" />
              <span>Notifications</span>
            </button>
            <button className="text-sm flex items-center">
              <FiMessageSquare className="mr-1" />
              <span>Support</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="bg-white shadow-sm sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold text-gray-900 flex items-center">
                <span className="text-emerald-600">Lado</span>kart
              </h1>
              <button className="md:hidden p-2 text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100 relative">
                <FiShoppingCart className="h-5 w-5" />
                {cartItems.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-emerald-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {cartItems.length}
                  </span>
                )}
              </button>
            </div>
            
            <div className="flex-1 max-w-2xl mx-4">
              <div className="relative">
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
                <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                  <button className="p-1 text-gray-400 hover:text-gray-500">
                    <FiX className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
            
            <div className="hidden md:flex items-center space-x-4">
              <button className="p-2 text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100 relative">
                <FiHeart className="h-5 w-5" />
                {likedItems.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-emerald-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {likedItems.length}
                  </span>
                )}
              </button>
              
              <div className="relative">
                <button 
                  className="p-2 text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100 relative"
                  onClick={() => setShowCart(!showCart)}
                >
                  <FiShoppingCart className="h-5 w-5" />
                  {cartItems.length > 0 && (
                    <span className="absolute -top-1 -right-1 bg-emerald-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {cartItems.length}
                    </span>
                  )}
                </button>
                
                {/* Cart Dropdown */}
                {showCart && (
                  <div className="absolute right-0 mt-2 w-72 bg-white rounded-lg shadow-xl border border-gray-200 z-30">
                    <div className="p-4 border-b border-gray-200">
                      <h3 className="font-medium">Your Cart ({cartItems.length})</h3>
                    </div>
                    <div className="max-h-96 overflow-y-auto">
                      {cartItems.length > 0 ? (
                        cartItems.map(item => (
                          <div key={item.id} className="p-4 border-b border-gray-100 flex items-center">
                            <img 
                              src={item.images[0]} 
                              alt={item.title}
                              className="w-12 h-12 object-cover rounded"
                            />
                            <div className="ml-3 flex-1">
                              <h4 className="text-sm font-medium line-clamp-1">{item.title}</h4>
                              <p className="text-emerald-600 text-sm">{item.price}</p>
                            </div>
                            <button 
                              onClick={() => removeFromCart(item.id)}
                              className="text-gray-400 hover:text-red-500"
                            >
                              <FiX />
                            </button>
                          </div>
                        ))
                      ) : (
                        <div className="p-4 text-center text-gray-500">
                          Your cart is empty
                        </div>
                      )}
                    </div>
                    {cartItems.length > 0 && (
                      <div className="p-4 border-t border-gray-200">
                        <div className="flex justify-between mb-4">
                          <span>Subtotal:</span>
                          <span className="font-medium">₦{calculateTotal().toLocaleString()}</span>
                        </div>
                        <button className="w-full bg-emerald-600 text-white py-2 rounded-lg font-medium">
                          Checkout
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
              
              <div className="relative">
                <button className="flex items-center space-x-2">
                  <img 
                    className="w-8 h-8 rounded-full" 
                    src="https://randomuser.me/api/portraits/women/44.jpg" 
                    alt="User profile" 
                  />
                  <span className="hidden md:inline text-sm font-medium">Hi, Sarah</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Flash Sale Banner */}
        <div className="bg-gradient-to-r from-red-500 to-orange-500 rounded-xl p-4 mb-6 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <IoIosFlash className="text-2xl mr-2" />
              <h2 className="font-bold text-lg">FLASH SALE</h2>
              <span className="ml-4 bg-black/20 px-2 py-1 rounded text-sm">Ends in: 04:32:15</span>
            </div>
            <button className="text-sm font-medium underline">View All</button>
          </div>
          
          <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
            {flashSaleItems.map(item => (
              <motion.div 
                key={item.id}
                whileHover={{ y: -5 }}
                className="bg-white/10 p-3 rounded-lg backdrop-blur-sm"
              >
                <div className="bg-white rounded-lg p-2 mb-2">
                  <img 
                    src="https://via.placeholder.com/150" 
                    alt={item.title}
                    className="w-full h-24 object-contain"
                  />
                </div>
                <h3 className="text-sm font-medium line-clamp-1">{item.title}</h3>
                <div className="flex items-center mt-1">
                  <p className="font-bold">{item.price}</p>
                  <p className="ml-2 text-xs line-through opacity-80">{item.originalPrice}</p>
                  <span className="ml-auto bg-white text-red-500 text-xs px-1 rounded">{item.discount}% OFF</span>
                </div>
                <button className="w-full mt-2 bg-white text-red-500 py-1 text-sm rounded font-medium">
                  Add to Cart
                </button>
              </motion.div>
            ))}
          </div>
        </div>
        
        {/* Category Tabs */}
        <div className="flex overflow-x-auto pb-4 mb-6 scrollbar-hide">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-4 py-2 rounded-full font-medium whitespace-nowrap mr-2 ${activeTab === 'all' ? 'bg-emerald-100 text-emerald-800' : 'bg-gray-100 text-gray-800'}`}
          >
            All Items
          </button>
          <button
            onClick={() => setActiveTab('trending')}
            className={`px-4 py-2 rounded-full font-medium whitespace-nowrap mr-2 ${activeTab === 'trending' ? 'bg-emerald-100 text-emerald-800' : 'bg-gray-100 text-gray-800'}`}
          >
            Trending
          </button>
          <button
            onClick={() => setActiveTab('textbooks')}
            className={`px-4 py-2 rounded-full font-medium whitespace-nowrap mr-2 ${activeTab === 'textbooks' ? 'bg-emerald-100 text-emerald-800' : 'bg-gray-100 text-gray-800'}`}
          >
            Textbooks
          </button>
          <button
            onClick={() => setActiveTab('electronics')}
            className={`px-4 py-2 rounded-full font-medium whitespace-nowrap mr-2 ${activeTab === 'electronics' ? 'bg-emerald-100 text-emerald-800' : 'bg-gray-100 text-gray-800'}`}
          >
            Electronics
          </button>
          <button
            onClick={() => setActiveTab('furniture')}
            className={`px-4 py-2 rounded-full font-medium whitespace-nowrap mr-2 ${activeTab === 'furniture' ? 'bg-emerald-100 text-emerald-800' : 'bg-gray-100 text-gray-800'}`}
          >
            Furniture
          </button>
          <button
            onClick={() => setActiveTab('clothing')}
            className={`px-4 py-2 rounded-full font-medium whitespace-nowrap mr-2 ${activeTab === 'clothing' ? 'bg-emerald-100 text-emerald-800' : 'bg-gray-100 text-gray-800'}`}
          >
            Clothing
          </button>
        </div>
        
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
                <option>Most Popular</option>
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
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
                  <div className="space-y-4">
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
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs text-gray-500 block mb-1">Min Price</label>
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">₦</span>
                          <input
                            type="number"
                            value={priceRange[0]}
                            onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])}
                            className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg bg-white"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="text-xs text-gray-500 block mb-1">Max Price</label>
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">₦</span>
                          <input
                            type="number"
                            value={priceRange[1]}
                            onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                            className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg bg-white"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-2">Other Filters</h3>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <input type="checkbox" id="delivery" className="mr-2 rounded text-emerald-500" />
                      <label htmlFor="delivery" className="text-sm">Free Delivery</label>
                    </div>
                    <div className="flex items-center">
                      <input type="checkbox" id="warranty" className="mr-2 rounded text-emerald-500" />
                      <label htmlFor="warranty" className="text-sm">With Warranty</label>
                    </div>
                    <div className="flex items-center">
                      <input type="checkbox" id="negotiable" className="mr-2 rounded text-emerald-500" />
                      <label htmlFor="negotiable" className="text-sm">Price Negotiable</label>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-4 flex justify-end gap-3">
                <button 
                  onClick={() => {
                    setSelectedCategory('All');
                    setPriceRange([0, 500000]);
                  }}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700"
                >
                  Reset
                </button>
                <button 
                  onClick={() => setShowFilters(false)}
                  className="px-4 py-2 bg-emerald-600 text-white rounded-lg"
                >
                  Apply Filters
                </button>
              </div>
            </motion.div>
          )}
        </div>
        
        {/* Category Quick Links */}
        <div className="mb-6">
          <h3 className="text-lg font-medium mb-3">Shop by Category</h3>
          <div className="flex overflow-x-auto pb-4 gap-3 scrollbar-hide">
            {categories.map(category => (
              <motion.button
                key={category.id}
                whileHover={{ y: -2 }}
                onClick={() => {
                  setSelectedCategory(category.name);
                  setActiveTab(category.name.toLowerCase());
                }}
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
                    src={item.images[0]} 
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
                  
                  {item.delivery && (
                    <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm text-xs font-medium px-2 py-1 rounded">
                      Free Delivery
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
                      {item.sellerRating}
                      <span className="text-xs text-gray-400 ml-1">({item.sellerReviews})</span>
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
                        addToCart(item);
                      }}
                    >
                      Add to Cart
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
                    src={selectedItem.images[currentImageIndex]} 
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
                    {selectedItem.images.map((_, index) => (
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
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <p className="text-emerald-600 font-bold text-2xl">{selectedItem.price}</p>
                        {selectedItem.originalPrice && (
                          <p className="text-sm text-gray-500 line-through">{selectedItem.originalPrice}</p>
                        )}
                      </div>
                      <div className="flex items-center">
                        <FiStar className="text-yellow-400 mr-1" />
                        <span>{selectedItem.sellerRating}</span>
                        <span className="text-xs text-gray-400 ml-1">({selectedItem.sellerReviews} reviews)</span>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {selectedItem.tags.map(tag => (
                        <span key={tag} className="text-xs px-2 py-1 bg-gray-100 rounded-full">{tag}</span>
                      ))}
                    </div>
                    
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
                      <div>
                        <h4 className="text-sm font-medium text-gray-500">Delivery</h4>
                        <p className="text-gray-900">{selectedItem.delivery ? 'Available' : 'Not Available'}</p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-gray-500">Warranty</h4>
                        <p className="text-gray-900">{selectedItem.warranty ? 'Yes' : 'No'}</p>
                      </div>
                    </div>
                    
                    <div className="mt-6">
                      <h3 className="text-lg font-medium mb-2">Seller Information</h3>
                      <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                        <img 
                          src="https://randomuser.me/api/portraits/women/44.jpg" 
                          alt="Seller" 
                          className="w-12 h-12 rounded-full mr-3"
                        />
                        <div>
                          <h4 className="font-medium">{selectedItem.seller}</h4>
                          <div className="flex items-center text-sm text-gray-500">
                            <FiStar className="text-yellow-400 mr-1" />
                            <span>{selectedItem.sellerRating} ({selectedItem.sellerReviews} reviews)</span>
                          </div>
                        </div>
                        <div className="ml-auto flex space-x-2">
                          <button className="p-2 bg-emerald-100 text-emerald-600 rounded-full">
                            <FaWhatsapp className="h-5 w-5" />
                          </button>
                          <button className="p-2 bg-blue-100 text-blue-600 rounded-full">
                            <FiMessageSquare className="h-5 w-5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="border border-gray-200 rounded-lg p-4 h-fit sticky top-4">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <p className="text-emerald-600 font-bold text-xl">{selectedItem.price}</p>
                        {selectedItem.originalPrice && (
                          <p className="text-sm text-gray-500 line-through">{selectedItem.originalPrice}</p>
                        )}
                      </div>
                      {selectedItem.negotiable && (
                        <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">Negotiable</span>
                      )}
                    </div>
                    
                    <div className="space-y-3">
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full bg-emerald-600 text-white py-3 rounded-lg font-medium"
                        onClick={() => {
                          addToCart(selectedItem);
                        }}
                      >
                        Add to Cart
                      </motion.button>
                      
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full border border-emerald-600 text-emerald-600 py-3 rounded-lg font-medium flex items-center justify-center"
                        onClick={() => {
                          toggleLike(selectedItem.id);
                        }}
                      >
                        <FiHeart 
                          className={`mr-2 h-5 w-5 ${likedItems.includes(selectedItem.id) ? 'fill-red-500 text-red-500' : 'text-emerald-600'}`} 
                        />
                        {likedItems.includes(selectedItem.id) ? 'Saved' : 'Save for Later'}
                      </motion.button>
                      
                      <div className="border-t border-gray-200 pt-3">
                        <div className="flex items-center text-sm text-gray-500 mb-2">
                          <FiShield className="mr-2 text-emerald-500" />
                          <span>Secure transaction</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-500">
                          <FiTruck className="mr-2 text-emerald-500" />
                          <span>{selectedItem.delivery ? 'Free delivery available' : 'Delivery not available'}</span>
                        </div>
                      </div>
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