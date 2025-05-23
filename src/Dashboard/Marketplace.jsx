import { useState, useEffect } from 'react';
import { 
  FiSearch, FiHeart, FiShoppingCart, FiMapPin, 
  FiStar, FiChevronDown, FiX, FiCheck,
  FiMessageSquare, FiUser, FiBell
} from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import { IoIosFlash } from 'react-icons/io';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '../lib/supabaseClient';

const Marketplace = () => {
  // State for products and UI
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [priceRange, setPriceRange] = useState([0, 500000]);
  const [sortBy, setSortBy] = useState('created_at');
  const [likedItems, setLikedItems] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showCart, setShowCart] = useState(false);
  const [viewMode, setViewMode] = useState('grid');
  const [loading, setLoading] = useState(true);
  const [notification, setNotification] = useState({
    show: false,
    message: ''
  });

  // Chat state
  const [activeChat, setActiveChat] = useState(null);
  const [chatMessages, setChatMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [conversations, setConversations] = useState([]);

  // Notification handler
  const displayNotification = (message) => {
    setNotification({ show: true, message });
    setTimeout(() => setNotification(prev => ({ ...prev, show: false })), 3000);
  };

  // Fetch products with image validation
  const fetchProducts = async () => {
    try {
      setLoading(true);
      let query = supabase
        .from('products_with_details')
        .select('*')
        .order(sortBy, { ascending: sortBy !== 'price_desc' });

      if (selectedCategory !== 'all') {
        query = query.eq('category_id', selectedCategory);
      }

      if (searchQuery) {
        query = query.ilike('title', `%${searchQuery}%`);
      }

      const { data, error } = await query.range(priceRange[0], priceRange[1]);

      if (error) throw error;
      
      // Validate and enhance product images
      const validatedProducts = data.map(product => ({
        ...product,
        images: product.images?.map(img => img || '/placeholder-image.jpg') || ['/placeholder-image.jpg'],
        seller: product.seller || {
          name: 'Unknown Seller',
          avatar_url: '/placeholder-profile.jpg',
          rating: 4.0
        },
        category: product.category || { name: 'General' }
      }));
      
      setProducts(validatedProducts || []);
    } catch (error) {
      console.error('Error fetching products:', error);
      displayNotification('Failed to load products');
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .order('name', { ascending: true });

    if (!error) setCategories(data);
  };

  // Chat functions
  const fetchConversations = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { data, error } = await supabase
      .from('chat_conversations')
      .select('*')
      .or(`sender_id.eq.${user.id},receiver_id.eq.${user.id}`)
      .order('created_at', { ascending: false });

    if (!error) {
      setConversations(data);
    }
  };

  const fetchChatMessages = async (productId, receiverId) => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    try {
      // First, check if conversation exists or create a new one
      let conversation = conversations.find(c => 
        c.product_id === productId && 
        (c.sender_id === user.id || c.receiver_id === user.id)
      );

      if (!conversation) {
        // Create new conversation if it doesn't exist
        const { data: newConversation, error } = await supabase
          .from('chat_conversations')
          .insert({
            product_id: productId,
            sender_id: user.id,
            receiver_id: receiverId,
            product_title: products.find(p => p.id === productId)?.title || 'Product'
          })
          .select()
          .single();

        if (error) throw error;
        
        conversation = newConversation;
        setConversations(prev => [conversation, ...prev]);
      }

      // Fetch messages for this conversation
      const { data: messages, error: messagesError } = await supabase
        .from('messages')
        .select('*')
        .eq('product_id', productId)
        .or(`and(sender_id.eq.${user.id},receiver_id.eq.${receiverId}),and(sender_id.eq.${receiverId},receiver_id.eq.${user.id})`)
        .order('created_at', { ascending: true });

      if (messagesError) throw messagesError;

      setChatMessages(messages || []);
      setActiveChat({ productId, receiverId });
    } catch (error) {
      console.error('Error setting up chat:', error);
      displayNotification('Failed to start chat');
    }
  };

  const sendMessage = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user || !activeChat || !newMessage.trim()) return;

    try {
      const { error } = await supabase
        .from('messages')
        .insert({
          sender_id: user.id,
          receiver_id: activeChat.receiverId,
          product_id: activeChat.productId,
          content: newMessage.trim()
        });

      if (error) throw error;

      setNewMessage('');
      // No need to fetch messages again - real-time subscription will handle it
    } catch (error) {
      console.error('Error sending message:', error);
      displayNotification('Failed to send message');
    }
  };

  // Cart and wishlist functions
  const toggleLike = (productId) => {
    setLikedItems(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId) 
        : [...prev, productId]
    );
    displayNotification(
      likedItems.includes(productId) 
        ? 'Removed from wishlist' 
        : 'Added to wishlist'
    );
  };

  const addToCart = (product) => {
    const alreadyInCart = cartItems.some(item => item.id === product.id);
    
    if (!alreadyInCart) {
      setCartItems(prev => [...prev, product]);
      displayNotification('Added to cart');
    } else {
      displayNotification('Item is already in your cart');
    }
  };

  const removeFromCart = (productId) => {
    setCartItems(prev => prev.filter(item => item.id !== productId));
    displayNotification('Removed from cart');
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price, 0);
  };

  // Filtered products
  const filteredProducts = products.filter(product => {
    const price = product.price;
    return price >= priceRange[0] && price <= priceRange[1];
  });

  // Real-time chat updates
  useEffect(() => {
    if (!activeChat) return;

    const channel = supabase
      .channel('chat_updates')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'messages',
          filter: `product_id=eq.${activeChat.productId}`
        },
        (payload) => {
          const { data: { user } } = supabase.auth.getUser();
          if (
            (payload.new.sender_id === activeChat.receiverId && payload.new.receiver_id === user?.id) ||
            (payload.new.sender_id === user?.id && payload.new.receiver_id === activeChat.receiverId)
          ) {
            setChatMessages(prev => [...prev, payload.new]);
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [activeChat]);

  // Initial data fetch
  useEffect(() => {
    fetchProducts();
    fetchCategories();
    fetchConversations();
  }, [searchQuery, selectedCategory, priceRange, sortBy]);

  // Product Card Component
  const ProductCard = ({ product, liked, onLike, onAddToCart, onView }) => {
    if (!product) return null;

    const safeImages = product.images?.length > 0 
      ? product.images 
      : ['/placeholder-image.jpg'];
    
    const seller = product.seller || {
      name: 'Unknown Seller',
      avatar_url: '/placeholder-profile.jpg',
      rating: 4.0
    };

    const category = product.category || { name: 'General' };

    return (
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ y: -5 }}
        className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 hover:shadow-md transition-all"
      >
        <div className="relative h-48 overflow-hidden group">
          <img 
            src={safeImages[0]} 
            alt={product.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 cursor-pointer"
            onClick={onView}
            onError={(e) => {
              e.target.src = '/placeholder-image.jpg';
              e.target.className = 'w-full h-full object-contain bg-gray-100 p-4';
            }}
          />
          
          <button 
            onClick={(e) => {
              e.stopPropagation();
              onLike(product.id);
            }}
            className="absolute top-3 right-3 p-2 bg-white/80 backdrop-blur-sm rounded-full shadow-sm hover:bg-red-100 transition-colors"
          >
            <FiHeart 
              className={`h-5 w-5 ${liked ? 'fill-red-500 text-red-500' : 'text-gray-400 hover:text-red-500'}`} 
            />
          </button>
          
          {product.original_price && product.original_price > product.price && (
            <div className="absolute top-3 left-3 bg-emerald-500 text-white text-xs font-bold px-2 py-1 rounded">
              {Math.round((1 - (product.price / product.original_price)) * 100)}% OFF
            </div>
          )}
        </div>
        
        <div className="p-4">
          <h3 
            className="font-medium text-gray-900 line-clamp-2 cursor-pointer hover:text-emerald-600"
            onClick={onView}
          >
            {product.title}
          </h3>
          
          <div className="mt-2 flex items-center justify-between">
            <div>
              <p className="text-emerald-600 font-semibold">₦{product.price.toLocaleString()}</p>
              {product.original_price && product.original_price > product.price && (
                <p className="text-xs text-gray-500 line-through">₦{product.original_price.toLocaleString()}</p>
              )}
            </div>
            
            <div className="flex items-center text-sm text-gray-500">
              <FiStar className="text-yellow-400 mr-1" />
              {seller.rating.toFixed(1)}
            </div>
          </div>
          
          <div className="mt-3 flex items-center justify-between text-sm text-gray-500">
            <div className="flex items-center">
              <FiMapPin className="mr-1" />
              <span>{product.location || 'Campus'}</span>
            </div>
          </div>
          
          <div className="mt-4 flex items-center justify-between">
            <span className="text-xs px-2 py-1 bg-gray-100 rounded-full">{category.name}</span>
            <button 
              className="text-sm font-medium text-emerald-600 hover:text-emerald-500"
              onClick={(e) => {
                e.stopPropagation();
                onAddToCart(product);
              }}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </motion.div>
    );
  };

  // Product Modal Component
  const ProductModal = ({ product, onClose, liked, onLike, onAddToCart }) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    if (!product) return null;

    const safeImages = product.images?.length > 0 
      ? product.images 
      : ['/placeholder-image.jpg'];

    const seller = product.seller || {
      name: 'Unknown Seller',
      avatar_url: '/placeholder-profile.jpg',
      rating: 4.0
    };

    const category = product.category || { name: 'General' };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 z-30 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          <div className="p-6">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-2xl font-bold text-gray-900">{product.title}</h2>
              <button 
                onClick={onClose}
                className="p-2 text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100"
              >
                <FiX className="h-5 w-5" />
              </button>
            </div>
            
            <div className="relative h-64 md:h-80 rounded-lg overflow-hidden mb-4">
              <img 
                src={safeImages[currentImageIndex]} 
                alt={product.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src = '/placeholder-image.jpg';
                  e.target.className = 'w-full h-full object-contain bg-gray-100 p-4';
                }}
              />
            </div>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div className="md:col-span-2">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-emerald-600 font-bold text-2xl">₦{product.price.toLocaleString()}</p>
                    {product.original_price && (
                      <p className="text-sm text-gray-500 line-through">₦{product.original_price.toLocaleString()}</p>
                    )}
                  </div>
                  <div className="flex items-center">
                    <FiStar className="text-yellow-400 mr-1" />
                    <span>{seller.rating.toFixed(1)}</span>
                  </div>
                </div>
                
                <h3 className="text-lg font-medium mb-2">Description</h3>
                <p className="text-gray-600 mb-4">{product.description}</p>
                
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Condition</h4>
                    <p className="text-gray-900">{product.condition || 'Good'}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Category</h4>
                    <p className="text-gray-900">{category.name}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Location</h4>
                    <p className="text-gray-900">{product.location || 'Campus'}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Seller</h4>
                    <p className="text-gray-900">{seller.name}</p>
                  </div>
                </div>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-4 h-fit sticky top-4">
                <div className="space-y-3">
                  <button
                    className="w-full bg-emerald-600 text-white py-3 rounded-lg font-medium"
                    onClick={() => {
                      onAddToCart(product);
                      onClose();
                    }}
                  >
                    Add to Cart
                  </button>
                  
                  <button
                    className="w-full border border-emerald-600 text-emerald-600 py-3 rounded-lg font-medium flex items-center justify-center"
                    onClick={() => onLike(product.id)}
                  >
                    <FiHeart 
                      className={`mr-2 h-5 w-5 ${liked ? 'fill-red-500 text-red-500' : 'text-emerald-600'}`} 
                    />
                    {liked ? 'Saved' : 'Save for Later'}
                  </button>
                  
                  <button 
                    className="w-full bg-blue-500 text-white py-3 rounded-lg font-medium"
                    onClick={() => {
                      fetchChatMessages(product.id, product.seller_id);
                      onClose();
                    }}
                  >
                    Chat with Seller
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Chat Interface Component
  const ChatInterface = ({ onClose }) => {
    const { data: { user } } = supabase.auth.getUser();
    
    // Find the current conversation
    const currentConversation = conversations.find(c => 
      c.product_id === activeChat?.productId && 
      (c.sender_id === activeChat?.receiverId || c.receiver_id === activeChat?.receiverId)
    );

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 z-40 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl w-full max-w-2xl max-h-[80vh] flex flex-col">
          <div className="p-4 border-b flex justify-between items-center">
            <div>
              <h3 className="font-semibold text-lg">
                {currentConversation?.product_title || 'Chat'}
              </h3>
              <p className="text-sm text-gray-500">
                {currentConversation?.sender_id === user?.id ? 
                 `With seller` : `With buyer`}
              </p>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
              <FiX />
            </button>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {chatMessages.length > 0 ? (
              chatMessages.map(message => (
                <div 
                  key={message.id} 
                  className={`flex ${message.sender_id === user?.id ? 'justify-end' : 'justify-start'}`}
                >
                  <div 
                    className={`max-w-xs md:max-w-md rounded-lg p-3 ${message.sender_id === user?.id ? 'bg-emerald-100' : 'bg-gray-100'}`}
                  >
                    <p>{message.content}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      {new Date(message.created_at).toLocaleTimeString()}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <div className="flex items-center justify-center h-full text-gray-500">
                No messages yet. Start the conversation!
              </div>
            )}
          </div>
          
          <div className="p-4 border-t flex">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 border rounded-l-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
            />
            <button
              onClick={sendMessage}
              className="bg-emerald-600 text-white px-4 py-2 rounded-r-lg hover:bg-emerald-700"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Footer Component
  const Footer = () => {
    return (
      <footer className="bg-gray-900 text-white py-12 px-4 mt-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Ladokart</h3>
            <p className="text-gray-400">The student marketplace for everything you need on campus.</p>
          </div>
          <div>
            <h4 className="font-medium mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-400">
              <li><button className="hover:text-white">Home</button></li>
              <li><button className="hover:text-white">About Us</button></li>
              <li><button className="hover:text-white">Contact</button></li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium mb-4">Help & Support</h4>
            <ul className="space-y-2 text-gray-400">
              <li><button className="hover:text-white">FAQs</button></li>
              <li><button className="hover:text-white">Shipping Policy</button></li>
              <li><button className="hover:text-white">Returns & Refunds</button></li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium mb-4">Stay Connected</h4>
            <div className="flex">
              <input 
                type="email" 
                placeholder="Your email" 
                className="px-4 py-2 rounded-l-lg bg-gray-800 text-white w-full focus:outline-none"
              />
              <button className="bg-emerald-600 px-4 py-2 rounded-r-lg hover:bg-emerald-700">
                Subscribe
              </button>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>© {new Date().getFullYear()} Ladokart. All rights reserved.</p>
        </div>
      </footer>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Notification */}
      <AnimatePresence>
        {notification.show && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="fixed top-4 right-4 bg-emerald-500 text-white px-4 py-2 rounded-lg shadow-lg z-40 flex items-center"
          >
            <FiCheck className="mr-2" />
            {notification.message}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat Interface */}
      {activeChat && (
        <ChatInterface 
          onClose={() => {
            setActiveChat(null);
            setChatMessages([]);
          }} 
        />
      )}

      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <h1 className="text-2xl font-bold text-emerald-600">Ladokart</h1>
          </div>
          
          <div className="flex items-center space-x-4">
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
                            src={item.images?.[0] || '/placeholder-image.jpg'} 
                            alt={item.title}
                            className="w-12 h-12 object-cover rounded"
                            onError={(e) => {
                              e.target.src = '/placeholder-image.jpg';
                              e.target.className = 'w-12 h-12 object-contain bg-gray-100 p-2 rounded';
                            }}
                          />
                          <div className="ml-3 flex-1">
                            <h4 className="text-sm font-medium line-clamp-1">{item.title}</h4>
                            <p className="text-emerald-600 text-sm">₦{item.price.toLocaleString()}</p>
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
            
            <div className="hidden md:flex items-center space-x-2">
              <img 
                className="w-8 h-8 rounded-full" 
                src="https://randomuser.me/api/portraits/women/44.jpg" 
                alt="User profile" 
                onError={(e) => {
                  e.target.src = '/placeholder-profile.jpg';
                }}
              />
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-emerald-500 to-teal-600 py-12 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Find Everything You Need on Campus</h2>
          <p className="text-white/90 mb-6">Textbooks, gadgets, furniture and more from fellow students</p>
          
          <div className="relative max-w-xl mx-auto">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg bg-white focus:ring-emerald-500 focus:border-emerald-500 shadow-lg"
              placeholder="Search for textbooks, electronics, etc..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Categories Section */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4">Shop by Category</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`flex flex-col items-center justify-center p-4 rounded-xl transition-all ${selectedCategory === 'all' ? 'bg-emerald-100 border-emerald-200' : 'bg-white border-gray-200'} border`}
            >
              <span className="text-2xl mb-2 text-emerald-600">🛍️</span>
              <span className="text-sm font-medium text-center">All Items</span>
            </button>
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex flex-col items-center justify-center p-4 rounded-xl transition-all ${selectedCategory === category.id ? 'bg-emerald-100 border-emerald-200' : 'bg-white border-gray-200'} border`}
              >
                <span className="text-2xl mb-2 text-emerald-600">{category.emoji || '📦'}</span>
                <span className="text-sm font-medium text-center">{category.name}</span>
              </button>
            ))}
          </div>
        </div>
        
        {/* Products Section */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
            <h3 className="text-xl font-semibold mb-4 md:mb-0">
              {selectedCategory === 'all' ? 'All Products' : 
               categories.find(c => c.id === selectedCategory)?.name || 'Products'}
            </h3>
            
            <div className="flex items-center space-x-4">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="block pl-3 pr-8 py-2 border border-gray-300 rounded-lg bg-white focus:ring-emerald-500 focus:border-emerald-500 text-sm"
              >
                <option value="created_at">Newest</option>
                <option value="price">Price: Low to High</option>
                <option value="price_desc">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>
          </div>
          
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="bg-gray-100 rounded-xl h-80 animate-pulse"></div>
              ))}
            </div>
          ) : filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map(product => (
                <ProductCard 
                  key={product.id}
                  product={product}
                  liked={likedItems.includes(product.id)}
                  onLike={toggleLike}
                  onAddToCart={addToCart}
                  onView={() => setSelectedProduct(product)}
                />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow-sm p-8 text-center border border-gray-100">
              <h3 className="text-lg font-medium text-gray-900">No products found</h3>
              <p className="mt-2 text-gray-500">Try adjusting your search or filters</p>
              <button 
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                  setPriceRange([0, 500000]);
                }}
                className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-emerald-600 hover:bg-emerald-700"
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>
      </main>

      {/* Product Detail Modal */}
      {selectedProduct && (
        <ProductModal 
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          liked={likedItems.includes(selectedProduct.id)}
          onLike={toggleLike}
          onAddToCart={addToCart}
        />
      )}

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Marketplace;